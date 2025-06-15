"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import CachedImage from "../../../CachedImage"
import { Color } from "../../../../colors/colortv"

const CartItem = ({ item, onRemove, onToggleSelect = () => { }, onUpdateQuantity }) => {
  const [manualQuantity, setManualQuantity] = useState(item.quantity.toString())

  const getItemId = () => {
    return `${item.tdp_production_PK}_${item.price_type || "01"}`
  }

  // Cập nhật manualQuantity khi item.quantity thay đổi từ bên ngoài
  useEffect(() => {
    if (!isNaN(item.quantity)) {
      setManualQuantity(item.quantity.toString())
    }
  }, [item.quantity])

  // Tăng số lượng
  const handleIncrease = () => {
    const current = Number.parseFloat(manualQuantity)
    const newQuantity = isNaN(current) ? 1 : Math.floor(current) + 1
    setManualQuantity(newQuantity.toString())
    const itemId = getItemId()
    onUpdateQuantity(itemId, newQuantity)
  }

  // Giảm số lượng
  const handleDecrease = () => {
    const current = Number.parseFloat(manualQuantity)
    const safeCurrent = isNaN(current) ? 1 : Math.ceil(current)
    const newQuantity = Math.max(1, safeCurrent - 1)
    setManualQuantity(newQuantity.toString())
    const itemId = getItemId()
    onUpdateQuantity(itemId, newQuantity)
  }

  // Khi thay đổi thủ công
  const handleQuantityChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "")
    const parts = numericValue.split(".")
    let formattedValue = parts[0]
    if (parts.length > 1) {
      formattedValue += "." + parts[1]
    }
    setManualQuantity(formattedValue)

    const num = Number.parseFloat(formattedValue)
    if (!isNaN(num) && num > 0) {
      const itemId = getItemId()
      onUpdateQuantity(itemId, num)
    }
  }

  // Khi rời ô nhập hoặc submit
  const handleQuantityBlur = () => {
    const num = Number.parseFloat(manualQuantity)
    if (isNaN(num) || num <= 0) {
      setManualQuantity("1")
      const itemId = getItemId()
      onUpdateQuantity(itemId, 1)
    }
  }

  const handleQuantitySubmit = () => {
    Keyboard.dismiss()
    handleQuantityBlur()
  }

  // Xử lý toggle checkbox
  const handleToggleSelect = () => {
    const itemId = getItemId()
    if (typeof onToggleSelect === "function") {
      onToggleSelect(itemId)
    }
  }

  // Xử lý remove item với validation
  const handleRemove = () => {
    const itemId = getItemId()
    if (typeof onRemove === "function") {
      onRemove(itemId)
    }
  }


  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggleSelect}>
          <View style={[styles.checkbox, item.selected && styles.checkboxSelected]}>
            {item.selected && <Icon name="check" size={14} color={Color.white} />}
          </View>
        </TouchableOpacity>
        <CachedImage image_uri={item.image} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>
              {item.name}
              {item.price_type && item.price_type !== "01" && (
                <Text style={styles.priceType}> - Loại {item.price_type}</Text>
              )}
            </Text>
            <TouchableOpacity onPress={handleRemove}>
              <Icon name="delete-forever" size={24} color={Color.mainColor3} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            đ{item.price.toLocaleString()}/{item.uom}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.total}>đ{(item.price * item.quantity).toLocaleString()}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={handleDecrease} style={styles.roundButton}>
                <Icon name="minus" size={18} color="#555" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={manualQuantity}
                onChangeText={handleQuantityChange}
                onBlur={handleQuantityBlur}
                onSubmitEditing={handleQuantitySubmit}
                keyboardType="decimal-pad"
                maxLength={6}
                selectTextOnFocus={true}
              />
              <TouchableOpacity onPress={handleIncrease} style={styles.roundButton}>
                <Icon name="plus" size={18} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {item.note && item.note.trim() !== "" && (
        <View style={styles.note}>
          <Icon name="file-document-edit-outline" size={16} color={Color.mainColor3} />
          <Text style={styles.txtNote}>{item.note}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  txtNote: {
    fontSize: 12,
    color: Color.textPrimary3,
    flex: 1,
    marginLeft: 4,
  },
  note: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
  },
  cardContainer: {
    backgroundColor: Color.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: Color.gray,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  card: {
    flexDirection: "row",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Color.mainColor3,
    borderColor: Color.mainColor3,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Color.gray,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
    paddingRight: 10,
  },
  priceType: {
    fontWeight: "normal",
    color: Color.mainColor3,
    fontSize: 13,
  },
  subText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.gray,
    borderRadius: 100,
  },
  quantityInput: {
    width: 50,
    height: 28,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    padding: 0,
    marginHorizontal: 4,
  },
  roundButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CartItem
