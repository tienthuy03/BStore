import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../../colors/colortv';
import Header from '../../../../../components/Bstore/Header/Header';
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
  console.log(tdp_product_order_pk);


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

  console.log("60: ", dataDetailHistory);
  console.log("61: ", order);


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
              <Text style={styles.statusText}>{order.status}</Text>
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
            <Text style={styles.detailLabel}>Phương thức thanh toán:</Text>
            <Text style={styles.detailValue}>{order.cus_pay_method_type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Địa chỉ giao hàng:</Text>
            <Text style={styles.detailValue}>{order.customer_address}</Text>
          </View>
          {/* <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số lượng sản phẩm:</Text>
            <Text style={styles.detailValue}>10 sản phẩm</Text>
          </View> */}
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

              // Hàm format tiền tệ
              const formatCurrency = (value) => {
                if (!value) return '0';
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              };

              return products.map((product, index) => (
                <View key={product.id || index} style={styles.productItem}>
                  {/* Thông tin khách hàng */}
                  {product.customer && (
                    <Text style={styles.customerInfo}>
                      Khách hàng: {product.customer}
                    </Text>
                  )}

                  {/* Tên sản phẩm */}
                  {product['Sản phẩm'] && (
                    <View style={styles.productHeader}>
                      <Text style={[styles.productName, product['Sản phẩm_style']]}>
                        {product['Sản phẩm']}
                      </Text>
                      {product['Đơn giá'] && product['Số lượng'] && (
                        <Text style={styles.productPrice}>
                          {formatCurrency(product['Đơn giá'])} x {product['Số lượng']}
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Thông tin chi tiết */}
                  <View style={styles.productDetails}>
                    {product['Số lượng'] && (
                      <Text style={[styles.productType, product['Số lượng_style']]}>
                        Số lượng: {product['Số lượng']} {product['Đơn vị tính'] || ''}
                      </Text>
                    )}

                    {product['Thành tiền'] && (
                      <Text style={[styles.productPrice, product['Thành tiền_style']]}>
                        Thành tiền: {formatCurrency(product['Thành tiền'])} VNĐ
                      </Text>
                    )}

                    {product['Loại'] && (
                      <Text style={[styles.productType, product['Loại_style']]}>
                        Loại: {product['Loại']}
                      </Text>
                    )}

                    {product['Ghi chú'] && (
                      <Text style={[styles.productType, product['Ghi chú_style']]}>
                        Ghi chú: {product['Ghi chú']}
                      </Text>
                    )}
                  </View>
                </View>
              ));
            })()
          ) : (
            <View style={styles.productItem}>
              <Text style={styles.productName}>Không có dữ liệu sản phẩm</Text>
            </View>
          )}
        </View>

        {/* Total Amount */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalAmount}>230,000 VNĐ</Text>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Phí giao hàng:</Text>
            <Text style={styles.deliveryValue}>10,000 VNĐ</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Tổng cộng:</Text>
            <Text style={styles.deliveryValue}>240,000 VNĐ</Text>
          </View>
        </View>

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
      return Color.mainColor;
    case 'completed':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'cancelled':
      return '#F44336';
    default:
      return Color.mainColor;
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
  detailRow: {
    marginBottom: 8,
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
  productItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  productPrice: {
    fontSize: 13,
    color: Color.mainColor,
    fontWeight: 'bold',
  },
  productType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  productUnit: {
    fontSize: 13,
    color: '#666',
  },
  productDetails: {
    marginTop: 8,
  },
  customerInfo: {
    fontSize: 12,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
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