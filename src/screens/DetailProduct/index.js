"use client"

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native"
import { useEffect, useState, useRef } from "react"
import Header from "../../components/Bstore/Header/Header"
import { Color } from "../../colors/colortv"
import CachedImage from "../../components/CachedImage"
import useAppConfig from "../../utils/useAppConfig"
import sysFetch from "../../services/fetch_crypt"
import { useRoute } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ProductDetailModal from "../../components/Bstore/ProductDetailModal"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const DetailProduct = ({ navigation }) => {
  const route = useRoute()
  const { tdp_production_pk, prod_nm, prod_price, prod_desc, prod_uom } = route.params
  const { Api, tokenLogin, userPk, crt_by, APP_VERSION } = useAppConfig()

  // States
  const [modalVisible, setModalVisible] = useState(false)
  const [detailProduct, setDetailProduct] = useState([])
  const [detailCategory, setDetailCategory] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  // Refs
  const scrollX = useRef(new Animated.Value(0)).current

  // API Functions
  const getDetailProduct = async () => {
    if (!tdp_production_pk) {
      console.log("Product PK is missing")
      return
    }

    setLoading(true)
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: tdp_production_pk,
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

  // Event Handlers
  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width
    const index = event.nativeEvent.contentOffset.x / slideSize
    const roundIndex = Math.round(index)
    setCurrentImageIndex(roundIndex)
  }

  const handleAddToCart = () => {
    console.log("Thêm vào giỏ hàng")
    setModalVisible(true)
  }

  const handleBuyNow = () => {
    console.log("Mua ngay")
    // Implement buy now logic here
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  // Get current product image
  const getCurrentProductImage = () => {
    if (detailProduct && detailProduct.length > 0) {
      return detailProduct[currentImageIndex]?.image_uri || detailProduct[0]?.image_uri
    }
    // Fallback image nếu không có ảnh từ API
    return "https://i.pinimg.com/736x/4f/7a/f1/4f7af1a4320430ed976593fd0fea02b4.jpg"
  }

  // Prepare product data for modal
  const getProductDataForModal = () => {
    return {
      tdp_production_pk,
      prod_nm, // Lấy từ route params
      prod_price, // Lấy từ route params
      prod_desc, // Lấy từ route params
      prod_uom, // Lấy từ route params
      image_uri: getCurrentProductImage(), // Chỉ hình ảnh lấy từ slider
      quantity: 100, // Default quantity
    }
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
      <Text style={styles.productName}>{prod_nm}</Text>

      <View style={styles.priceQuantityRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>đ</Text>
          <Text style={styles.productPrice}>{prod_price}/</Text>
          <Text style={styles.currencySymbol}>{prod_uom}</Text>
        </View>
        <Text style={styles.quantityText}>Số lượng: 100</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả mặt hàng</Text>
        <Text style={styles.descriptionText}>{prod_desc}</Text>
      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={handleAddToCart} activeOpacity={0.8}>
        <LinearGradient
          colors={[Color.mainColor, Color.mainColor3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.footerButton, styles.buyNowButton]}
        >
          <Icon name="cart-arrow-down" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buyNowText}>Thêm vào giỏ hàng</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )

  // Effects
  useEffect(() => {
    getDetailProduct()
  }, [tdp_production_pk])

  return (
    <SafeAreaView style={styles.container}>
      <Header
        goBack={navigation.goBack}
        rightIconVisible={true}
        rightIconName="cart-outline"
        onRightPress={() => console.log("Icon bên phải được bấm")}
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

      <ProductDetailModal
        visible={modalVisible}
        product={getProductDataForModal()}
        listCategory={detailCategory}
        onClose={closeModal}
        onAddToCart={(productData) => {
          console.log("Adding to cart:", productData)
          // Implement actual add to cart logic here
          closeModal()
        }}
      />
    </SafeAreaView>
  )
}

export default DetailProduct

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: Color.mainColor,
  },
  quantityText: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: Color.textPrimary3,
  },
  descriptionContainer: {
    gap: 8,
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
    lineHeight: 20,
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
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
})
