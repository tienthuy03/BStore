import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../../../../../colors/colortv';

const HistoryOrderCard = ({ item, onPress }) => {
  const statusColor = getStatusColor(item.status);
  const statusText = getStatusText(item.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Status-colored bar on the left */}
      <View style={[styles.blueBar, { backgroundColor: statusColor }]} />
      {/* Content */}
      <View style={styles.content}>
        <View style={{ width: '100%', gap: 8, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>🕓 {item.cus_dt}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateTime, { color: statusColor }]}>💵Tổng đơn hàng: {(item.cus_total_price).toLocaleString()} VNĐ</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>💳 Thanh toán: {item.cus_pay_method_type}</Text>
        </View>
        {/* <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>💳Phí vận chuyển: {item.cus_shipping_fee}</Text>
        </View> */}

        <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateTime]}>🏠 Địa chỉ giao hàng: {item.customer_address}</Text>
        </View>
        {/* <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateTime]}>📦 Tổng sản phẩm: {item.cus_qty}</Text>
        </View> */}

      </View>

    </TouchableOpacity>
  );
};

const getStatusText = (status) => {
  switch (status) {
    case 1:
      return 'Chờ xác nhận';
    case 2:
      return 'Đã xác nhận';
    case 3:
      return 'Đang vận chuyển';
    case 4:
      return 'Đã giao';
    case 5:
      return 'Đã huỷ';
    default:
      return 'Chờ xác nhận';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 1: // Chờ xác nhận
      return '#FF9800';
    case 2: // Đã xác nhận
      return Color.mainColor;
    case 3: // Đang vận chuyển
      return '#2196F3';
    case 4: // Đã giao
      return '#4CAF50';
    case 5: // Đã huỷ
      return Color.mainColor;
    default:
      return '#FF9800';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  blueBar: {
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Color.text,
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateTime: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginLeft: 6,
  },

});

export default HistoryOrderCard; 