import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../../colors/colortv';
import Header from '../../../../../components/Bstore/Header/Header';
import useAppConfig from '../../../../../utils/useAppConfig';

const Detail_His_Order = ({ route, navigation }) => {
  // Get data from navigation params
  const { orderData } = route.params || {};
  const { full_Name } = useAppConfig()
  // If no data passed, show empty state
  if (!orderData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu đơn hàng</Text>
      </View>
    );
  }

  return (
    <>
      <Header goBack={navigation.goBack}>Chi tiết hoá đơn</Header>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.invoiceTitle}>Chi tiết đơn hàng</Text>
          <Text style={styles.invoiceNumber}>#{orderData.id}</Text>
        </View>
        <Text style={styles.serviceType}>{orderData.title}</Text>
      </View> */}

        {/* Order Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trạng thái:</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(orderData.status) }]}>
              <Text style={styles.statusText}>{orderData.status}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày đặt:</Text>
            <Text style={styles.infoValue}>{orderData.dateTime}</Text>
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
            <Text style={styles.detailValue}>100.000 VNĐ</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phương thức thanh toán:</Text>
            <Text style={styles.detailValue}>Tiền mặt</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Địa chỉ giao hàng:</Text>
            <Text style={styles.detailValue}>123 Đường ABC, Quận XYZ, TP. HCM</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số lượng sản phẩm:</Text>
            <Text style={styles.detailValue}>10 sản phẩm</Text>
          </View>
        </View>

        {/* Product List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>

          {/* Mock product items - replace with real data */}
          <View style={styles.productItem}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>[ẢNH] Sản phẩm A</Text>
              <Text style={styles.productPrice}>Giá: 50,000 x 2 = 100,000</Text>
            </View>
            <Text style={styles.productType}>Loại: Loại 1 (Ghi chú: ...)</Text>
            <Text style={styles.productUnit}>Đơn vị: kg</Text>
          </View>

          <View style={styles.productItem}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>[ẢNH] Sản phẩm B</Text>
              <Text style={styles.productPrice}>Giá: 65,000 x 2 = 130,000</Text>
            </View>
            <Text style={styles.productType}>Loại: Loại 2 (Ghi chú: ...)</Text>
            <Text style={styles.productUnit}>Đơn vị: hộp</Text>
          </View>
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