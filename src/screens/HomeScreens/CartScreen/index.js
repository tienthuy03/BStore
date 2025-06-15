// import { useState, useEffect, useCallback } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
//   Alert,
// } from "react-native"
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import Header from "../../../components/Bstore/Header/Header"
// import CartItem from "../../../components/Bstore/Categories_Card/CartItem"
// import { Color } from "../../../colors/colortv"
// import CartSummary from "../../../components/Bstore/CartSummary"
// import AsyncStorage from "@react-native-community/async-storage"
// import useAppConfig from "../../../utils/useAppConfig"
// import sysFetch from "../../../services/fetch_crypt"
// import CustomerInfo from "../../../components/Bstore/CustomerInfo"
// import { useSelector } from "react-redux"

// const CartScreen = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [totalPrice, setTotalPrice] = useState(0)
//   const [selectedItemsCount, setSelectedItemsCount] = useState(0)
//   const { APP_VERSION, crt_by, tokenLogin, Api, thr_emp_pk } = useAppConfig()
//   const [shippingFree, setShippingFree] = useState(0)
//   const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng")
//   const [customerNote, setCustomerNote] = useState("")
//   // Add customer data state in your CartScreen component
//   const [customerData, setCustomerData] = useState({
//     name: "Nguyễn Văn An",
//     phone: "0971761090",
//     address: "Đường C1, Tân bình",
//   })

//   const [checkoutData, setCheckoutData] = useState({})
//   const handleCartSummaryDataChange = useCallback((data) => {
//     console.log("Checkout Data Updated:", data)
//   }, [])

//   console.log("checkoutData,: ", checkoutData);

//   const handleEditCustomerInfo = () => {

//     Alert.alert("Thông báo", "Chức năng chỉnh sửa thông tin khách hàng")
//   }
//   // Lấy giỏ hàng từ AsyncStorage
//   const getCartItems = async () => {
//     try {
//       setLoading(true)
//       const cartData = await AsyncStorage.getItem("cartItems")
//       if (cartData) {
//         const parsedCart = JSON.parse(cartData)
//         setCartItems(parsedCart)
//         calculateTotal(parsedCart)
//       }
//     } catch (error) {
//       console.log("Error getting cart items:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Lưu giỏ hàng vào AsyncStorage
//   const saveCartItems = async (items) => {
//     try {
//       await AsyncStorage.setItem("cartItems", JSON.stringify(items))
//     } catch (error) {
//       console.log("Error saving cart items:", error)
//     }
//   }
//   // Tính tổng tiền chỉ cho các sản phẩm được chọn
//   const calculateTotal = (items) => {
//     console.log(items)

//     // Chỉ tính tổng cho các item được selected
//     const selectedItems = items.filter((item) => item.selected)
//     const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)

//     setTotalPrice(total)
//     setSelectedItemsCount(selectedCount)
//   }

//   // Xử lý thanh toán
//   const handleCheckout = async () => {
//     console.log("Đã gọi handleCheckout")
//     const selectedItems = cartItems.filter((item) => item.selected)
//     if (selectedItems.length === 0) {
//       Alert.alert("Thông báo", "Vui lòng chọn ít nhất một sản phẩm để thanh toán")
//       return
//     }

//     const in_par = {
//       p1_varchar2: "INSERT", // action
//       p2_varchar2: cartItems[0].tco_depot_pk, // tco_depot_pk - pk của vựa
//       p3_varchar2: JSON.stringify(cartItems), // ds sản phẩm
//       p4_varchar2: checkoutData.total.toString(), //tổng tiền
//       p5_varchar2: checkoutData.shippingFree, //phí shipp
//       p6_varchar2: paymentMethod, //pp thanh toán
//       p7_varchar2: thr_emp_pk, // mã khách hàng
//       p8_varchar2: customerData.name, //Tên khách hàng
//       p9_varchar2: customerData.phone, // sđt khách hàng
//       p10_varchar2: customerData.address, // đc khách hàng
//       p11_varchar2: checkoutData.customerNote, // ghi chú của khách hàng
//       p12_varchar2: checkoutData.deliveryDate, // ngày vận chuyển
//       p13_varchar2: checkoutData.deliveryTime, // thời gian vận chuyển
//       p14_varchar2: APP_VERSION, // app_v
//       p15_varchar2: crt_by,
//     }

//     console.log("inpar: ", in_par)

//     try {
//       const response = await sysFetch(
//         Api,
//         {
//           pro: "STV_HR_UPD_MBI_HRDP00100_0",
//           in_par: in_par,
//           out_par: {
//             p1_varchar2: "result",
//           },
//         },
//         tokenLogin,
//       )
//       console.log("payment: ", response)
//     } catch (error) {
//       console.log("Error:", error)
//     }

//     Alert.alert("Thông báo", "Payment method")
//   }
//   // Xóa tất cả sản phẩm trong giỏ hàng
//   const handleClearCart = () => {
//     if (cartItems.length === 0) return

//     Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?", [
//       { text: "Hủy", style: "cancel" },
//       {
//         text: "Xóa tất cả",
//         style: "destructive",
//         onPress: () => {
//           setCartItems([])
//           saveCartItems([])
//           setTotalPrice(0)
//           setSelectedItemsCount(0)
//         },
//       },
//     ])
//   }

//   // // Check chọn sản phẩm trong giỏ hàng
//   const handleToggleSelect = (itemId) => {
//     const newCartItems = cartItems.map((item) => {
//       const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
//       if (currentItemId === itemId) {
//         return { ...item, selected: !item.selected }
//       }
//       return item
//     })
//     setCartItems(newCartItems)
//     saveCartItems(newCartItems)
//     calculateTotal(newCartItems)
//   }
//   // Cập nhật số lượng sản phẩm
//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     const newCartItems = cartItems.map((item) => {
//       const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
//       if (currentItemId === itemId) {
//         return { ...item, quantity: newQuantity }
//       }
//       return item
//     })
//     setCartItems(newCartItems)
//     saveCartItems(newCartItems)
//     calculateTotal(newCartItems)
//   }
//   // Xóa sản phẩm khỏi giỏ hàng
//   const handleRemoveItem = (itemId) => {
//     const newCartItems = cartItems.filter((item) => {
//       const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
//       return currentItemId !== itemId
//     })
//     setCartItems(newCartItems)
//     saveCartItems(newCartItems)
//     calculateTotal(newCartItems)
//   }

//   // Chọn tất cả sản phẩm
//   const handleSelectAll = () => {
//     const allSelected = cartItems.every((item) => item.selected)
//     const updatedItems = cartItems.map((item) => ({
//       ...item,
//       selected: !allSelected,
//     }))

//     setCartItems(updatedItems)
//     saveCartItems(updatedItems)
//     calculateTotal(updatedItems)
//   }

//   // Render item cho FlatList
//   const renderItem = ({ item }) => (
//     <CartItem
//       item={item}
//       onRemove={handleRemoveItem}
//       onToggleSelect={handleToggleSelect}
//       onUpdateQuantity={handleUpdateQuantity}
//     />
//   )

//   // Render khi giỏ hàng trống
//   const renderEmptyCart = () => (
//     <View style={styles.emptyContainer}>
//       <Icon name="cart-outline" size={80} color={Color.gray} />
//       <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
//       <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate("HomeScreen")}>
//         <Text style={styles.continueButtonText}>Tiếp tục mua sắm</Text>
//       </TouchableOpacity>
//     </View>
//   )

//   useEffect(() => {
//     getCartItems()
//     // Lắng nghe sự kiện focus để cập nhật giỏ hàng khi quay lại màn hình
//     const unsubscribe = navigation.addListener("focus", () => {
//       getCartItems()
//     })

//     return unsubscribe
//   }, [navigation])

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         goBack={navigation.goBack}
//         rightIconVisible={cartItems.length > 0}
//         rightIconName="trash-can-outline"
//         onRightPress={handleClearCart}
//       >
//         Giỏ hàng
//       </Header>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color={Color.mainColor} />
//         </View>
//       ) : (
//         <FlatList
//           data={cartItems}
//           renderItem={renderItem}
//           keyExtractor={(item) => `${item.tdp_production_PK}_${item.price_type}`}
//           contentContainerStyle={styles.listContainer}
//           ListHeaderComponent={() => (
//             <View>
//               {/* Customer Info */}
//               <CustomerInfo customerData={customerData} onEdit={handleEditCustomerInfo} />

//               {/* Select All Button - chỉ hiển thị khi có sản phẩm */}
//               {cartItems.length > 0 && (
//                 <View style={styles.selectAllContainer}>
//                   <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
//                     <Icon
//                       name={cartItems.every((item) => item.selected) ? "checkbox-marked" : "checkbox-blank-outline"}
//                       size={20}
//                       color={Color.mainColor3}
//                     />
//                     <Text style={styles.selectAllText}>
//                       {cartItems.every((item) => item.selected) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           )}
//           ListEmptyComponent={renderEmptyCart}
//           ListFooterComponent={() =>
//             cartItems.length > 0 ? (
//               <CartSummary
//                 total={totalPrice.toLocaleString()}
//                 quantityProd={selectedItemsCount}
//                 handleCheckout={handleCheckout}
//                 onDataChange={handleCartSummaryDataChange}
//               />
//             ) : null
//           }
//         />
//       )}
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.gray,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   selectAllContainer: {
//     paddingHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 8,
//   },
//   selectAllButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   selectAllText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   listContainer: {
//     padding: 8,
//     paddingBottom: 20, // Thêm padding bottom để tạo khoảng cách
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: Color.textPrimary3,
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   continueButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     backgroundColor: Color.mainColor,
//     borderRadius: 100,
//   },
//   continueButtonText: {
//     color: Color.white,
//     fontWeight: "bold",
//   },
// })

// export default CartScreen
"use client"

import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Header from "../../../components/Bstore/Header/Header"
import CartItem from "../../../components/Bstore/Categories_Card/CartItem"
import { Color } from "../../../colors/colortv"
import CartSummary from "../../../components/Bstore/CartSummary"
import AsyncStorage from "@react-native-community/async-storage"
import useAppConfig from "../../../utils/useAppConfig"
import sysFetch from "../../../services/fetch_crypt"
import CustomerInfo from "../../../components/Bstore/CustomerInfo"

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedItemsCount, setSelectedItemsCount] = useState(0)
  const { APP_VERSION, crt_by, tokenLogin, Api, thr_emp_pk } = useAppConfig()
  const [shippingFree, setShippingFree] = useState(0)

  // Customer data state
  const [customerData, setCustomerData] = useState({
    name: "Nguyễn Văn An",
    phone: "0971761090",
    address: "Đường C1, Tân bình",
  })

  // State để lưu checkout data từ CartSummary
  const [checkoutData, setCheckoutData] = useState({
    paymentMethod: "Cod",
    deliveryDate: "",
    deliveryTime: "",
    customerNote: "",
    total: 0,
    quantityProd: 0,
  })

  // Callback để nhận data từ CartSummary - QUAN TRỌNG: Cập nhật state
  const handleCartSummaryDataChange = useCallback((data) => {
    console.log("Checkout Data Updated:", data)
    setCheckoutData(data) // Lưu data vào state
  }, [])

  console.log("checkoutData: ", checkoutData)

  const handleEditCustomerInfo = () => {
    Alert.alert("Thông báo", "Chức năng chỉnh sửa thông tin khách hàng")
  }

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
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)

    setTotalPrice(total)
    setSelectedItemsCount(selectedCount)
  }

  // Xử lý thanh toán - SỬ DỤNG checkoutData từ state
  const handleCheckout = async (checkoutDataFromSummary) => {
    console.log("Đã gọi handleCheckout")
    console.log("Checkout data từ CartSummary:", checkoutDataFromSummary)
    console.log("Checkout data từ state:", checkoutData)

    const selectedItems = cartItems.filter((item) => item.selected)
    if (selectedItems.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất một sản phẩm để thanh toán")
      return
    }

    // Sử dụng data từ parameter hoặc từ state
    const finalCheckoutData = checkoutDataFromSummary || checkoutData
    console.log(finalCheckoutData);

    const totalAmount = typeof finalCheckoutData.total === 'string'
      ? parseFloat(finalCheckoutData.total.replace(/,/g, ''))
      : finalCheckoutData.total
    const in_par = {

      p1_varchar2: "INSERT", // action
      p2_varchar2: cartItems[0].tco_depot_pk, // tco_depot_pk - pk của vựa
      p3_varchar2: JSON.stringify(selectedItems), // ds sản phẩm được chọn
      p4_varchar2: totalAmount, // tổng tiền
      p5_varchar2: shippingFree.toString(), // phí ship
      p6_varchar2: finalCheckoutData.paymentMethod, // pp thanh toán
      p7_varchar2: thr_emp_pk, // mã khách hàng
      p8_varchar2: customerData.name, // Tên khách hàng
      p9_varchar2: customerData.phone, // sđt khách hàng
      p10_varchar2: customerData.address, // địa chỉ khách hàng
      p11_varchar2: finalCheckoutData.customerNote, // ghi chú của khách hàng
      p12_varchar2: "20250629", // ngày vận chuyển
      p13_varchar2: "", // thời gian vận chuyển
      p14_varchar2: APP_VERSION, // app_v
      p15_varchar2: crt_by,
    }

    console.log("Final in_par: ", in_par)

    try {
      const response = await sysFetch(
        Api,
        {
          pro: "STV_HR_UPD_MBI_HRDP00100_0",
          in_par: in_par,
          out_par: {
            p1_varchar2: "result",
          },
        },
        tokenLogin,
      )
      console.log("Payment response: ", response)

      if (response && response.success) {
        // Xóa giỏ hàng sau khi thanh toán thành công
        setCartItems([])
        saveCartItems([])
        setTotalPrice(0)
        setSelectedItemsCount(0)

        Alert.alert("Thành công", "Đơn hàng đã được tạo thành công!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("HomeScreen"),
          },
        ])
      } else {
        Alert.alert("Lỗi", "Không thể tạo đơn hàng. Vui lòng thử lại.")
      }
    } catch (error) {
      console.log("Error:", error)
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo đơn hàng.")
    }
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

  // Check chọn sản phẩm trong giỏ hàng
  const handleToggleSelect = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
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
      const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
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
      const currentItemId = `${item.tdp_production_PK}_${item.price_type}`
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

  // Render item cho FlatList
  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      onRemove={handleRemoveItem}
      onToggleSelect={handleToggleSelect}
      onUpdateQuantity={handleUpdateQuantity}
    />
  )

  // Render khi giỏ hàng trống
  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color={Color.gray} />
      <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.continueButtonText}>Tiếp tục mua sắm</Text>
      </TouchableOpacity>
    </View>
  )

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
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.tdp_production_PK}_${item.price_type}`}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <View>
              <CustomerInfo customerData={customerData} onEdit={handleEditCustomerInfo} />
              {cartItems.length > 0 && (
                <View style={styles.selectAllContainer}>
                  <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
                    <Icon
                      name={cartItems.every((item) => item.selected) ? "checkbox-marked" : "checkbox-blank-outline"}
                      size={20}
                      color={Color.mainColor3}
                    />
                    <Text style={styles.selectAllText}>
                      {cartItems.every((item) => item.selected) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={renderEmptyCart}
          ListFooterComponent={() =>
            cartItems.length > 0 ? (
              <CartSummary
                total={totalPrice.toLocaleString()}
                quantityProd={selectedItemsCount}
                handleCheckout={handleCheckout}
                onDataChange={handleCartSummaryDataChange}
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  emptyText: {
    fontSize: 16,
    color: Color.textPrimary3,
    marginTop: 16,
    marginBottom: 24,
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
