
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../../../components/Bstore/Header/Header';
import { Color } from '../../../colors/colortv';
import BSTab from '../../../components/Bstore/Tab';
import Pending_Order from './Components/Pending_Order';
import Confirmed_Order from './Components/Confirmed_Order';
import Delivered_Order from './Components/Delivered_Order';
import Cancelled_Order from './Components/Cancelled_Order';
import In_Transit_Order from './Components/In_Transit_Order';
import sysFetch from '../../../services/fetch_crypt';
import useAppConfig from '../../../utils/useAppConfig';

const EnvoiceScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { userPk, APP_VERSION, Api, crt_by, tokenLogin } = useAppConfig();

  // State riêng cho từng tab
  const [tabStates, setTabStates] = useState({
    0: { currentPage: 0, isLoading: false, hasMoreData: true, data: [] }, // Chờ xác nhận
    1: { currentPage: 0, isLoading: false, hasMoreData: true, data: [] }, // Đã xác nhận
    2: { currentPage: 0, isLoading: false, hasMoreData: true, data: [] }, // Đang vận chuyển
    3: { currentPage: 0, isLoading: false, hasMoreData: true, data: [] }, // Đã giao hàng
    4: { currentPage: 0, isLoading: false, hasMoreData: true, data: [] }, // Đã huỷ
  });

  const handleGetHistoryEnvoice = async (tabIndex, page = 0, isLoadMore = false) => {
    console.log("29 page: ", page);

    const currentTabState = tabStates[tabIndex];

    console.log(`Loading tab ${tabIndex}, page ${page}, isLoadMore: ${isLoadMore}`);
    console.log('Current tab state:', currentTabState);

    if (currentTabState.isLoading || (!isLoadMore && !currentTabState.hasMoreData)) {
      console.log('Skipping load - isLoading:', currentTabState.isLoading, 'hasMoreData:', currentTabState.hasMoreData);
      return;
    }

    // Cập nhật loading state cho tab hiện tại
    setTabStates(prev => ({
      ...prev,
      [tabIndex]: { ...prev[tabIndex], isLoading: true }
    }));

    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: '', // truyền rỗng để lấy tất cả đơn hàng
      p3_varchar2: page, // trang hiện tại
      p4_varchar2: APP_VERSION,
      p5_varchar2: crt_by,
    };

    try {
      const rs = await sysFetch(
        Api,
        {
          pro: 'STV_HR_SEL_MBI_HRDP00100_3',
          in_par: in_par,
          out_par: {
            p1_sys: 'list_history_order',
          },
        },
        tokenLogin
      );

      if (rs.data.list_history_order) {
        const newData = rs.data.list_history_order;
        const statusFilter = tabIndex + 1; // 1, 2, 3, 4, 5 tương ứng với các tab
        const filteredData = newData.filter(order => Number(order.status) === statusFilter);

        console.log(`API response - Total items: ${newData.length}, Filtered items: ${filteredData.length}, Status filter: ${statusFilter}`);
        console.log('Filtered data:', filteredData);

        setTabStates(prev => {
          const currentData = prev[tabIndex].data;
          let updatedData;

          if (isLoadMore) {
            // Nếu là load more, thêm vào cuối danh sách
            updatedData = [...currentData, ...filteredData];
          } else {
            // Nếu là load mới, thay thế danh sách
            updatedData = filteredData;
          }

          const hasMore = newData.length === 10;
          console.log(`Updated tab ${tabIndex} - New data length: ${updatedData.length}, Has more: ${hasMore}`);

          return {
            ...prev,
            [tabIndex]: {
              ...prev[tabIndex],
              data: updatedData,
              currentPage: page,
              hasMoreData: hasMore, // Kiểm tra xem còn dữ liệu không
              isLoading: false
            }
          };
        });
      } else {
        setTabStates(prev => ({
          ...prev,
          [tabIndex]: {
            ...prev[tabIndex],
            data: isLoadMore ? prev[tabIndex].data : [],
            hasMoreData: false,
            isLoading: false
          }
        }));
      }
    } catch (error) {
      console.log('Fetch error:', error);
      setTabStates(prev => ({
        ...prev,
        [tabIndex]: { ...prev[tabIndex], isLoading: false }
      }));
    }
  };

  useEffect(() => {
    // Load dữ liệu cho tab đầu tiên khi component mount
    handleGetHistoryEnvoice(0, 0, false);
  }, []);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);

    // Kiểm tra xem tab này đã có dữ liệu chưa
    const currentTabState = tabStates[tabIndex];
    if (currentTabState.data.length === 0) {
      // Nếu chưa có dữ liệu, load lần đầu
      handleGetHistoryEnvoice(tabIndex, 0, false);
    }
  };

  const handleLoadMore = (tabIndex) => {
    const currentTabState = tabStates[tabIndex];
    console.log(`handleLoadMore called for tab ${tabIndex}`);
    console.log('Current tab state:', currentTabState);

    if (!currentTabState.isLoading && currentTabState.hasMoreData) {
      const nextPage = currentTabState.currentPage + 1;
      console.log(`Loading next page: ${nextPage}`);
      handleGetHistoryEnvoice(tabIndex, nextPage, true);
    } else {
      console.log('Cannot load more - isLoading:', currentTabState.isLoading, 'hasMoreData:', currentTabState.hasMoreData);
    }
  };

  console.log("59: ", tabStates);

  return (
    <View style={styles.container}>
      {/* <Header>Đơn hàng của bạn</Header> */}
      <View style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 16, fontSize: 16, fontFamily: 'Roboto-Medium' }}>Đơn hàng của bạn</Text>
      </View>

      <BSTab
        tab={activeTab}
        onChangeTab={handleTabChange}
        scrollEnabled={true}
        fullTab={false}
        data={[
          {
            id: 0,
            name: 'Chờ xác nhận',
            screen: (
              <Pending_Order
                data={tabStates[0].data}
                onLoadMore={() => handleLoadMore(0)}
                isLoading={tabStates[0].isLoading}
                hasMoreData={tabStates[0].hasMoreData}
              />
            ),
          },
          {
            id: 1,
            name: 'Đã xác nhận',
            screen: (
              <Confirmed_Order
                data={tabStates[1].data}
                onLoadMore={() => handleLoadMore(1)}
                isLoading={tabStates[1].isLoading}
                hasMoreData={tabStates[1].hasMoreData}
              />
            ),
          },
          {
            id: 2,
            name: 'Đang vận chuyển',
            screen: (
              <In_Transit_Order
                data={tabStates[2].data}
                onLoadMore={() => handleLoadMore(2)}
                isLoading={tabStates[2].isLoading}
                hasMoreData={tabStates[2].hasMoreData}
              />
            ),
          },
          {
            id: 3,
            name: 'Đã giao hàng',
            screen: (
              <Delivered_Order
                data={tabStates[3].data}
                onLoadMore={() => handleLoadMore(3)}
                isLoading={tabStates[3].isLoading}
                hasMoreData={tabStates[3].hasMoreData}
              />
            ),
          },
          {
            id: 4,
            name: 'Đã huỷ',
            screen: (
              <Cancelled_Order
                data={tabStates[4].data}
                onLoadMore={() => handleLoadMore(4)}
                isLoading={tabStates[4].isLoading}
                hasMoreData={tabStates[4].hasMoreData}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f7fb',
    flex: 1,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 18,
    padding: 6,
    // marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 22,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  tabItemActive: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  tabText: {
    color: Color.textPrimary2,
    fontSize: 16,
    fontFamily: 'Roboto-Regular'
  },
  tabTextActive: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Medium'
  },
  content: {
    // padding: 16,
    flex: 1,
  },
});

export default EnvoiceScreen;