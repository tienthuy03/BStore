import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../../colors/colortv';
import Header from '../../../../../components/Bstore/Header/Header';
import DataTable from '../../../../../components/Base/DataTable';
import useAppConfig from '../../../../../utils/useAppConfig';
import sysFetch from '../../../../../services/fetch_crypt';

const Detail_His_Order = ({ route, navigation }) => {
  // Get data from navigation params
  const { tdp_product_order_pk, order } = route.params || {};
  const { full_Name } = useAppConfig()
  // If no data passed, show empty state
  if (!tdp_product_order_pk) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu đơn hàng</Text>
      </View>
    );
  }
  console.log("22: ", tdp_product_order_pk);

  const { userPk, APP_VERSION, Api, crt_by, tokenLogin } = useAppConfig();
  const [dataDetailHistory, setDataDetailHistory] = useState([]);

  const handleGetDetailHistory = async () => {
    const in_par = {
      p1_varchar2: tdp_product_order_pk,
      p2_varchar2: APP_VERSION,
      p3_varchar2: crt_by,
    };

    try {
      const rs = await sysFetch(
        Api,
        {
          pro: 'STV_HR_SEL_MBI_HRDP00100_4',
          in_par: in_par,
          out_par: {
            p1_sys: 'list_detail_history',
          },
        },
        tokenLogin
      );

      if (rs.data.list_detail_history) {
        setDataDetailHistory(rs.data.list_detail_history);
      } else {
        // setDataHistoryOrder([]);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  useEffect(() => {
    handleGetDetailHistory();
  }, []);

  console.log("60: ", order);


  return (
    <>
      <Header goBack={navigation.goBack}>Chi tiết hoá đơn</Header>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.invoiceTitle}>Chi tiết đơn hàng</Text>
          <Text style={styles.invoiceNumber}>#{dataDetailHistory.id}</Text>
        </View>
        <Text style={styles.serviceType}>{dataDetailHistory.title}</Text>
      </View> */}

        {/* Order Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trạng thái:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={styles.statusText}>{getStatusName(order.status)}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày đặt:</Text>
            <Text style={styles.infoValue}>{order.cus_dt}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Khách hàng:</Text>
            <Text style={styles.infoValue}>{full_Name}</Text>
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>

          {/* Mock order details - replace with real data */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tổng tiền:</Text>
            <Text style={styles.detailValue}>{(order.cus_total_price).toLocaleString()} VNĐ</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ngày giao hàng:</Text>
            <Text style={styles.detailValue}>{order.cus_delivery}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phương thức thanh toán:</Text>
            <Text style={styles.detailValue}>{order.cus_pay_method_type}</Text>
          </View>
          <View style={styles.detailRow2}>
            <Text style={styles.detailLabel}>Địa chỉ giao hàng:</Text>
            <Text style={styles.detailValue}>{order.customer_address}</Text>
          </View>
        </View>

        {/* Product List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          {dataDetailHistory && dataDetailHistory.length > 0 ? (
            (() => {
              // Hàm parse style từ string
              const parseStyle = (styleString) => {
                if (!styleString) return {};
                const styles = {};
                const styleParts = styleString.split(',');
                styleParts.forEach(part => {
                  const [property, value] = part.split(':');
                  if (property && value) {
                    switch (property.trim()) {
                      case 'fontWeight':
                        styles.fontWeight = value.trim();
                        break;
                      case 'color':
                        styles.color = value.trim();
                        break;
                      default:
                        break;
                    }
                  }
                });
                return styles;
              };

              // Nhóm dữ liệu theo sản phẩm
              const groupProducts = (data) => {
                const products = [];
                let currentProduct = {};
                let currentIndex = 0;

                data.forEach((item) => {
                  if (item.kind === 'CUSTOMER' && item.title === 'Khách hàng') {
                    // Bắt đầu sản phẩm mới
                    if (Object.keys(currentProduct).length > 0) {
                      products.push(currentProduct);
                    }
                    currentProduct = {
                      id: currentIndex++,
                      customer: item.data,
                      items: []
                    };
                  } else if (item.kind === 'CUSTOMER') {
                    // Thêm thông tin sản phẩm
                    currentProduct[item.title] = item.data;
                    currentProduct[`${item.title}_style`] = parseStyle(item.style_title);
                  }
                });

                // Thêm sản phẩm cuối cùng
                if (Object.keys(currentProduct).length > 0) {
                  products.push(currentProduct);
                }

                return products;
              };

              const products = groupProducts(dataDetailHistory);
              // console.log("178: ", products);
              // console.log("179: Raw dataDetailHistory: ", dataDetailHistory);

              // // Debug: Kiểm tra keys có sẵn trong products
              // if (products.length > 0) {
              //   console.log("180: Available keys in first product: ", Object.keys(products[0]));
              //   console.log("181: First product data: ", products[0]);
              // }

              // Hàm format tiền tệ
              const formatCurrency = (value) => {
                if (!value) return '0';
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              };

              // Sử dụng dữ liệu gốc từ API, không tính toán thêm
              const productsWithUnitPrice = products;

              // Định nghĩa cấu hình cột cho table
              const columns = [
                {
                  key: 'customer',
                  title: 'Người dùng',
                  width: 100,
                  cellStyle: { textAlign: 'center', fontWeight: '500' }
                },
                {
                  key: 'Sản phẩm: ',
                  title: 'Tên sản phẩm',
                  width: 120,
                  cellStyle: { textAlign: 'center', fontWeight: '500' }
                },
                {
                  key: 'Loại',
                  title: 'Loại',
                  width: 80
                },
                {
                  key: 'Đơn giá',
                  title: 'Đơn giá',
                  width: 120,
                  type: 'currency',
                  cellStyle: { color: Color.mainColor, fontWeight: 'bold' }
                },
                {
                  key: 'Số lượng',
                  title: 'Số lượng',
                  width: 80
                },
                {
                  key: 'Thành tiền',
                  title: 'Thành tiền',
                  width: 150,
                  type: 'currency',
                  cellStyle: { color: Color.mainColor, fontWeight: 'bold' }
                },
              ];

              return (
                <DataTable
                  data={productsWithUnitPrice}
                  columns={columns}
                  emptyMessage="Không có dữ liệu sản phẩm"
                  formatCurrency={formatCurrency}
                  showHorizontalScroll={true}
                // minTableWidth={730} // 120+150+120+120+100+120 = 730
                // cellWidth={120}
                />
              );
            })()
          ) : null}
        </View>

        {/* Total Amount */}
        {/* <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalAmount}>230,000 VNĐ</Text>
        </View> */}

        {/* Delivery Info */}
        {/* <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Phí giao hàng:</Text>
            <Text style={styles.deliveryValue}>10,000 VNĐ</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Tổng cộng:</Text>
            <Text style={styles.deliveryValue}>240,000 VNĐ</Text>
          </View>
        </View> */}

        {/* Notes Section */}
        <View style={styles.notesSection}>
          <Text style={styles.notesText}>
            Đơn hàng đã được xác nhận và đang trong quá trình xử lý.
            Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
          </Text>
        </View>

        {/* Payment Information */}
        {/* <View style={styles.paymentInfo}>
        <View style={styles.paymentIcon}>
          <Icon name="alert-circle" size={20} color="#FF9800" />
        </View>
        <Text style={styles.paymentText}>
          Đơn hàng đã được thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </Text>
      </View> */}
      </ScrollView>
    </>

  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'inprogress':
    case '1':
      return Color.mainColor;
    case 'completed':
    case '2':
      return '#4CAF50';
    case 'pending':
    case '0':
      return '#FF9800';
    case 'cancelled':
    case '3':
      return '#F44336';
    default:
      return Color.mainColor;
  }
};

const getStatusName = (status) => {
  switch (status?.toString()) {
    case '1':
      return 'Chờ xác nhận';
    case '2':
      return 'Đang xác nhận';
    case '3':
      return 'Đang vận chuyển';
    case '4':
      return 'Đã giao hàng';
    case '5':
      return 'Đã hủy';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FF',
  },
  emptyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.mainColor,
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  detailRow2: {
    marginBottom: 8,
  },
  detailRow: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  totalSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.mainColor,
  },
  deliverySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#666',
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  notesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notesText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  paymentInfo: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  paymentIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  paymentText: {
    fontSize: 13,
    color: '#856404',
    flex: 1,
    lineHeight: 18,
  },
});

export default Detail_His_Order;