import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Color } from "../../../colors/colortv"
import Header from "../../../components/Bstore/Header/Header"

import AsyncStorage from "@react-native-community/async-storage"
import LottieView from "lottie-react-native"
import CartSummary from "./components/CartSummary"
import CartItem from "./components/CartItem"
const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedItemsCount, setSelectedItemsCount] = useState(0)

  // Lấy giỏ hàng từ AsyncStorage
  const getCartItems = async () => {
    try {
      setLoading(true)
      const cartData = await AsyncStorage.getItem("cartItems")
      if (cartData) {
        const parsedCart = JSON.parse(cartData)
        setCartItems(parsedCart)
        calculateTotal(parsedCart)
      }
    } catch (error) {
      console.log("Error getting cart items:", error)
    } finally {
      setLoading(false)
    }
  }

  // Lưu giỏ hàng vào AsyncStorage
  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(items))
    } catch (error) {
      console.log("Error saving cart items:", error)
    }
  }

  // Tính tổng tiền chỉ cho các sản phẩm được chọn
  const calculateTotal = (items) => {
    console.log(items)
    const selectedItems = items.filter((item) => item.selected)
    const total = selectedItems.reduce((sum, item) => sum + (item.unit_price || item.price) * item.quantity, 0)
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)

    setTotalPrice(total)
    setSelectedItemsCount(selectedCount)
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  const handleClearCart = () => {
    if (cartItems.length === 0) return

    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa tất cả",
        style: "destructive",
        onPress: () => {
          setCartItems([])
          saveCartItems([])
          setTotalPrice(0)
          setSelectedItemsCount(0)
        },
      },
    ])
  }

  // Hàm tạo key cho item trong giỏ hàng
  const getItemId = (item) => {
    // Nếu có price_type thì dùng cả 2, nếu không chỉ dùng tdp_production_pk
    return item.price_type ? `${item.tdp_production_pk}_${item.price_type}` : `${item.tdp_production_pk}`;
  }

  // Check chọn sản phẩm trong giỏ hàng
  const handleToggleSelect = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      const currentItemId = getItemId(item)
      if (currentItemId === itemId) {
        return { ...item, selected: !item.selected }
      }
      return item
    })
    setCartItems(newCartItems)
    saveCartItems(newCartItems)
    calculateTotal(newCartItems)
  }

  // Cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const newCartItems = cartItems.map((item) => {
      const currentItemId = getItemId(item)
      if (currentItemId === itemId) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCartItems(newCartItems)
    saveCartItems(newCartItems)
    calculateTotal(newCartItems)
  }

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (itemId) => {
    const newCartItems = cartItems.filter((item) => {
      const currentItemId = getItemId(item)
      return currentItemId !== itemId
    })
    setCartItems(newCartItems)
    saveCartItems(newCartItems)
    calculateTotal(newCartItems)
  }

  // Chọn tất cả sản phẩm
  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected)
    const updatedItems = cartItems.map((item) => ({
      ...item,
      selected: !allSelected,
    }))

    setCartItems(updatedItems)
    saveCartItems(updatedItems)
    calculateTotal(updatedItems)
  }

  // Sửa lại hàm chuyển sang CheckoutScreen để truyền thêm tco_depot_pk
  const handleCheckoutPress = () => {
    const depotPk = cartItems && cartItems.length > 0 ? cartItems[0].tco_depot_pk : '';
    if (navigation) {
      navigation.navigate("CheckoutScreen", {
        total: totalPrice,
        quantityProd: selectedItemsCount,
        cartItems,
        tco_depot_pk: depotPk,
      })
    }
  }

  // Cập nhật ghi chú cho sản phẩm
  const handleUpdateNote = (itemId, newNote) => {
    const newCartItems = cartItems.map((item) => {
      const currentItemId = getItemId(item)
      if (currentItemId === itemId) {
        return { ...item, note: newNote }
      }
      return item
    })
    setCartItems(newCartItems)
    saveCartItems(newCartItems)
  }

  // Render item cho FlatList
  const renderItem = ({ item }) => {
    const key = getItemId(item)
    return (
      <CartItem
        item={item}
        onRemove={handleRemoveItem}
        onToggleSelect={handleToggleSelect}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNote={handleUpdateNote}
      />
    )
  }

  // Render khi giỏ hàng trống
  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <LottieView
        source={require("../../../assets/animations/shopping_cart.json")}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
      <Text style={styles.emptyText}>Giỏ hàng chưa có sản phẩm</Text>
    </View>
  )

  // NOTE: Debug các vấn đề liên quan đến key và dữ liệu cartItems
  useEffect(() => {
    console.log('Current cartItems:', cartItems)
  }, [cartItems])

  useEffect(() => {
    getCartItems()
    const unsubscribe = navigation.addListener("focus", () => {
      getCartItems()
    })
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Header
        goBack={navigation.goBack}
        rightIconVisible={cartItems.length > 0}
        rightIconName="trash-can-outline"
        onRightPress={handleClearCart}
      >
        Giỏ hàng
      </Header>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.mainColor} />
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          {/* Danh sách giỏ hàng */}
          <View style={styles.listSection}>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => getItemId(item)}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={() => (
                <View>
                  {cartItems.length > 0 && (
                    <View style={styles.selectAllContainer}>
                      <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
                        <Icon
                          name={
                            cartItems.every((item) => item.selected)
                              ? "checkbox-marked"
                              : "checkbox-blank-outline"
                          }
                          size={20}
                          color={Color.mainColor3}
                        />
                        <Text style={styles.selectAllText}>
                          {cartItems.every((item) => item.selected)
                            ? "Bỏ chọn tất cả"
                            : "Chọn tất cả"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              ListEmptyComponent={renderEmptyCart}
            />
          </View>

          {/* Tổng tiền cố định phía dưới */}
          {cartItems.length > 0 && (
            <View style={styles.footerSection}>
              <CartSummary
                total={totalPrice.toLocaleString()}
                quantityProd={selectedItemsCount}
                handleOnCheckOut={handleCheckoutPress}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },

  listSection: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: Color.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectAllContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  txtGoShop: {
    fontSize: 16,
    color: Color.mainColor,
    fontFamily: 'Roboto-Medium',
    textDecorationLine: "underline"
  },
  emptyText: {
    fontSize: 14,
    color: Color.textPrimary3,
    marginTop: 16,
    marginBottom: 8,
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Color.mainColor,
    borderRadius: 100,
  },
  continueButtonText: {
    color: Color.white,
    fontWeight: "bold",
  },
})

export default CartScreen
