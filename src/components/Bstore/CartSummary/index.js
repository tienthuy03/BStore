import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../../../colors/colortv';
import LinearGradient from 'react-native-linear-gradient';

const CartSummary = ({ total }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.summaryTitle}>Chi tiết đơn hàng</Text>
    <View style={styles.row}>
      <Text style={styles.label}>Tổng số mặt hàng</Text>
      <Text style={styles.value}>đ{total}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Giảm giá</Text>
      <Text style={styles.value}>đ-</Text>
    </View>
    <View style={styles.row}>
      <Text style={[styles.value, { color: '#28a745' }]}>Free</Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.totalMoneyRow}>
      <View style={styles.totalPay}>
        <Text style={styles.totalLabel}>Tổng tiền</Text>
        <Text style={styles.totalValue}>đ{total}</Text>
      </View>
      <LinearGradient
        colors={[Color.mainColor, Color.mainColor3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.processButton}
      >
        <TouchableOpacity style={styles.buttonContent}>
          <Text style={styles.processText}>Xác nhận</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </View>
);
const styles = StyleSheet.create({
  processButton: {
    flex: 1,
    marginTop: 16,
    borderRadius: 24,
    height: 44,
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processText: {
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  footerContainer: {
    backgroundColor: Color.white,
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#888',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  totalMoneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPay: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  totalLabel: {
    fontFamily: 'Roboto-Medium',
    color: Color.textPrimary3,
    fontSize: 16,
  },
  totalValue: {
    fontFamily: 'Roboto-Bold',
    color: Color.mainColor,
    fontSize: 16,
  },
});
export default CartSummary;
