import AsyncStorage from "@react-native-community/async-storage"
import { useRoute } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native"

import { Color } from "../../../colors/colortv"
import Header from "../../../components/Bstore/Header/Header"
import CachedImage from "../../../components/CachedImage"
import sysFetch from "../../../services/fetch_crypt"
import useAppConfig from "../../../utils/useAppConfig"
import ButtonGradient from "../../../components/Bstore/ButtonGradient"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const DetailProduct = ({ navigation }) => {
  const route = useRoute()
  const { item, item_Payment_Method, item_Area } = route.params
  const { Api, tokenLogin, userPk, crt_by, APP_VERSION } = useAppConfig()


  // States
  const [detailProduct, setDetailProduct] = useState([])
  const [detailCategory, setDetailCategory] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [note, setNote] = useState("")
  // Refs
  const scrollX = useRef(new Animated.Value(0)).current

  const handleCategorySelect = (category) => {
    setSelectedSize(category)
  }

  // API Functions
  const getDetailProduct = async () => {
    if (!item.tdp_production_pk) {
      console.log("Product PK is missing")
      return
    }

    setLoading(true)
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: item.tdp_production_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }

    try {
      const response = await sysFetch(
        Api,
        {
          pro: "STV_HR_SEL_MBI_HRDP00100_1",
          in_par: in_par,
          out_par: {
            p1_sys: "list_detail_product",
            p2_sys: "list_category_product",
          },
        },
        tokenLogin,
      )

      if (response?.data) {
        setDetailProduct(response.data.list_detail_product || [])
        setDetailCategory(response.data.list_category_product || [])
      }
    } catch (error) {
      console.log("Error getting product details:", error)
    } finally {
      setLoading(false)
    }
  }

  // Lấy giỏ hàng từ AsyncStorage
  const getCartItems = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cartItems');
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        setCartItems(parsedCart);
        setCartCount(parsedCart.length);
      }
    } catch (error) {
      console.log('Error getting cart items:', error);
    }
  };

  // Lưu giỏ hàng vào AsyncStorage
  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.log('Error saving cart items:', error);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    if (detailCategory.length > 0 && !selectedSize) {
      alert("Vui lòng chọn loại sản phẩm trước khi thêm vào giỏ hàng");
      return;
    }

    const newItem = {
      tdp_production_pk: item.tdp_production_pk,
      tco_depot_pk: item.tco_depot_pk,
      image_uri: getCurrentProductImage(),
      prod_nm: item.prod_nm,
      quantity: 1,
      unit_price: selectedSize ? selectedSize?.unit_price : item.unit_price,
      price: selectedSize ? selectedSize?.unit_price : item.unit_price,
      price_type: selectedSize ? selectedSize?.price_type : (item.price_type || "01"),
      uom: selectedSize ? selectedSize?.price_type_uom : item.uom,
      note: note,
      selected: false,
    };

    const newCartItems = [...cartItems];
    const existingItemIndex = newCartItems.findIndex(cartItem =>
      cartItem.tdp_production_pk === newItem.tdp_production_pk &&
      cartItem.price_type === newItem.price_type
    );

    if (existingItemIndex !== -1) {
      newCartItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      newCartItems.push(newItem);
    }

    setCartItems(newCartItems);
    setCartCount(newCartItems.length);
    saveCartItems(newCartItems);

    ToastAndroid.show("Sản phẩm đã được thêm vào giỏ hàng", ToastAndroid.SHORT);
    navigation.goBack();
  };


  // Event Handlers
  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width
    const index = event.nativeEvent.contentOffset.x / slideSize
    const roundIndex = Math.round(index)
    setCurrentImageIndex(roundIndex)
  }

  // Chuyển đến màn hình giỏ hàng
  const goToCart = () => {
    navigation.navigate('CartScreen');
  };

  // Get current product image
  const getCurrentProductImage = () => {
    if (detailProduct && detailProduct.length > 0) {
      return detailProduct[currentImageIndex]?.image_uri || detailProduct[0]?.image_uri
    }
    // Fallback image nếu không có ảnh từ API
    return "https://i.pinimg.com/736x/4f/7a/f1/4f7af1a4320430ed976593fd0fea02b4.jpg"
  }

  // Component Functions
  const renderImageSlider = () => {
    if (!detailProduct || detailProduct.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/4f/7a/f1/4f7af1a4320430ed976593fd0fea02b4.jpg",
            }}
            style={styles.img_Product}
          />
        </View>
      )
    }

    return (
      <View style={styles.sliderContainer}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
            listener: handleScroll,
          })}
          scrollEventThrottle={16}
          style={styles.imageSlider}
        >
          {detailProduct.map((item, index) => (
            <View key={item.pk || index} style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <CachedImage image_uri={item.image_uri} style={styles.img_Product} />
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {renderPaginationDots()}
      </View>
    )
  }

  const renderPaginationDots = () => {
    if (detailProduct.length <= 1) return null

    return (
      <View style={styles.paginationContainer}>
        {detailProduct.map((_, index) => {
          const inputRange = [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth]

          const width = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: "clamp",
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          })

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [Color.white, Color.mainColor, Color.white],
            extrapolate: "clamp",
          })

          return <Animated.View key={index} style={[styles.paginationDot, { width, opacity, backgroundColor }]} />
        })}
      </View>
    )
  }

  const renderProductInfo = () => (
    <View style={styles.productInfoContainer}>
      <View style={styles.priceQuantityRow}>
        <Text style={styles.productName}>{item.prod_nm}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>đ</Text>
          <Text style={styles.productPrice}>{item.price}/</Text>
          <Text style={styles.currencySymbol}>{item.uom}</Text>
        </View>

      </View>
      <Text style={styles.quantityText}>Số lượng: {item.qty}</Text>
      {detailProduct.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      )}

      {detailCategory.length > 0 && (
        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>
            Loại sản phẩm {!selectedSize && <Text style={styles.requiredText}>*</Text>}
          </Text>
          <View style={styles.sizeOptions}>
            {detailCategory.map((item) => (
              <TouchableOpacity
                key={item.pk}
                onPress={() => handleCategorySelect(item)}
                style={[styles.sizeButton, selectedSize?.pk === item.pk && styles.sizeButtonSelected]}
              >
                <Text
                  style={{
                    color: selectedSize?.pk === item.pk ? Color.white : Color.textPrimary2,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  {item.price_type_mn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {!selectedSize && <Text style={styles.warningText}>Vui lòng chọn loại hàng</Text>}
        </View>
      )}

      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Ghi chú (tùy chọn)</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="Nhập ghi chú cho sản phẩm..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={3}
          maxLength={200}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>{note.length}/200</Text>
      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <ButtonGradient
        onPress={handleAddToCart}
        icon="cart-arrow-down"
        style={[styles.footerButton, styles.buyNowButton]}
        textStyle={styles.buyNowText}
      >
        Thêm vào giỏ hàng
      </ButtonGradient>
    </View>
  )
  // Effects
  useEffect(() => {
    getDetailProduct();
    getCartItems();
  }, [item.tdp_production_pk]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        goBack={navigation.goBack}
        rightIconVisible={true}
        rightIconName="cart-outline"
        onRightPress={goToCart}
        badgeCount={cartCount}
      >
        Chi tiết sản phẩm
      </Header>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderImageSlider()}
        {renderProductInfo()}
      </ScrollView>
      {renderFooter()}
    </SafeAreaView>
  )
}

export default DetailProduct

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 40,
    maxHeight: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  contentRow: {
    flexDirection: "row",
    gap: 8,
  },
  productImage: {
    width: 130,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#eee",
  },
  infoColumn: {
    flex: 1,
    gap: 8,
  },
  productName: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
  },
  productPrice: {
    fontSize: 18,
    color: Color.mainColor,
    fontFamily: "Roboto-Bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
  sizeRow: {
    // marginTop: 8,
  },
  sizeLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  requiredText: {
    color: "red",
    fontSize: 16,
  },
  warningText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 10,
  },
  sizeButton: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  sizeButtonSelected: {
    backgroundColor: Color.mainColor2,
    borderColor: Color.mainColor2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  counterButton: {
    padding: 4,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    marginHorizontal: 8,
    fontSize: 16,
    textAlign: "center",
    minWidth: 40,
    padding: 0,
  },
  addButton: {
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledButtonText: {
    color: "#fff",
  },
  noteContainer: {
    marginTop: 12,
  },
  noteLabel: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: Color.textPrimary2,
    marginBottom: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    backgroundColor: Color.white,
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },

  ///
  container: {
    flex: 1,
    backgroundColor: Color.gray,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Image Slider Styles
  sliderContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageSlider: {
    flex: 1,
  },
  imageContainer: {
    width: screenWidth,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: screenWidth,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  img_Product: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  placeholderContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
    marginHorizontal: 10,
    borderRadius: 8,
  },

  // Pagination Styles
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Product Info Styles
  productInfoContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 4,
  },
  productName: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: Color.textPrimary2,
    lineHeight: 24,
  },
  priceQuantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currencySymbol: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: Color.mainColor,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: Color.mainColor,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Color.textPrimary3,
  },
  descriptionContainer: {
    // gap: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: Color.textPrimary2,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Color.textPrimary3,
    lineHeight: 20

  },

  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  buyNowButton: {
    width: "100%",
  },
  buyNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    width: '100%'
  },
})