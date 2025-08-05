
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
  const [dataHistoryOrder, setDataHistoryOrder] = useState([]);

  const handleGetHistoryEnvoice = async () => {
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: 1, // truyền rỗng để lấy tất cả đơn hàng
      p3_varchar2: 2,
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
        setDataHistoryOrder(rs.data.list_history_order);
      } else {
        // setDataHistoryOrder([]);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  useEffect(() => {
    handleGetHistoryEnvoice();
  }, []);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  console.log("59: ", dataHistoryOrder);

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
            count: dataHistoryOrder.length,
            screen: (
              <Pending_Order
                data={dataHistoryOrder}
              // data={dataHistoryOrder.filter(order => Number(order.status) === 1)}

              />
            ),
          },
          {
            id: 1,
            name: 'Đã xác nhận',
            screen: (
              <Confirmed_Order
                data={dataHistoryOrder.filter(order => Number(order.status) === 2)}
              />
            ),
          },
          {
            id: 2,
            name: 'Đang vận chuyển',
            screen: (
              <In_Transit_Order
                data={dataHistoryOrder.filter(order => Number(order.status) === 3)}
              />
            ),
          },
          {
            id: 3,
            name: 'Đã giao hàng',
            screen: (
              <Delivered_Order
                data={dataHistoryOrder.filter(order => Number(order.status) === 4)}
              />
            ),
          },
          {
            id: 4,
            name: 'Đã huỷ',
            screen: (
              <Cancelled_Order
                data={dataHistoryOrder.filter(order => Number(order.status) === 5)}
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