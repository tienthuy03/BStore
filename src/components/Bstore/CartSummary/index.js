
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Color } from "../../../colors/colortv"
import React from "react"

const CartSummary = ({ total, quantityProd, handleOnCheckOut, cartItems }) => {


  return (
    <View style={styles.footerContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Tổng tiền</Text>
        <Text style={styles.value}>đ{total}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giảm giá</Text>
        <Text style={styles.value}>đ0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phí vận chuyển</Text>
        <Text style={[styles.value, { color: "#28a745" }]}>Miễn phí</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.totalMoneyRow}>
        <View style={styles.processButton}>
          <TouchableOpacity style={styles.buttonContent} onPress={handleOnCheckOut}>
            <Text style={styles.processText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  processButton: {
    flex: 1,
    borderRadius: 24,
    height: 44,
    backgroundColor: Color.white,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  processText: {
    color: Color.mainColor,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  footerContainer: {
    backgroundColor: Color.mainColor,
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: Color.white,
    fontSize: 14,
    fontFamily: "Roboto-Medium",
  },
  value: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: Color.white,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    marginVertical: 8,
  },
  totalMoneyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

export default CartSummary
