// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   ImageBackground,
//   Dimensions
// } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Color } from '../../../colors/colortv';
// import { FlatList } from 'react-native-gesture-handler';
// import Categories_Card from '../../../components/Bstore/Categories_Card';
// import Products_Card from '../../../components/Bstore/Products_Card';


// const { width, height } = Dimensions.get('window');

// const Menu_Production = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

//       {/* Full Screen Product Image with Store Info */}
//       <ImageBackground
//         source={{ uri: 'https://menuonline.vn/images/upload/news/789438234-Nha-hang-Hai-san.jpg' }}
//         style={styles.fullImage}
//         resizeMode="cover"
//       >
//         {/* Header overlay on image */}
//         <SafeAreaView style={styles.safeArea}>
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton}>
//               <Icon name="chevron-left" size={24} color={Color.mainColor} />
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>

//         {/* Store Info Overlay */}
//         <View style={styles.storeInfoContainer}>
//           <View style={styles.storeInfoBadge}>
//             <Text style={styles.storeInfoName}>Nhà hàng hải sản số 1</Text>
//             <View style={styles.storeInfoDetails}>
//               <View style={styles.storeInfoDetail}>
//                 <Icon name="map-marker-radius-outline" size={20} color={Color.white} />
//                 <Text style={styles.storeInfoText}>135/05/23 Trần Hưng Đạo, TP Hồ Chí Minh</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>

//       {/* Product Details */}
//       <View style={styles.detailsContainer}>
//         <Categories_Card />
//         <View style={styles.quantityContainer}>
//           <Products_Card />
//         </View>

//       </View>

//       {/* Add to Cart Button */}
//       <TouchableOpacity style={styles.addToCartButton}>
//         <Text style={styles.addToCartText}>Add to cart</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   safeArea: {
//     paddingTop: StatusBar.currentHeight || 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     zIndex: 10,
//   },
//   backButton: {
//     padding: 5,
//     backgroundColor: Color.white,
//     borderRadius: 8,
//     width: 34,
//     height: 34,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.8)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   locationText: {
//     marginLeft: 5,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//   },
//   favoriteButton: {
//     padding: 5,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullImage: {
//     width: width,
//     height: height * 0.35, // Adjust height as needed
//   },
//   storeInfoContainer: {
//     padding: 15,
//     marginTop: 'auto', // Push to bottom of image
//   },
//   storeInfoBadge: {
//     backgroundColor: 'rgba(97, 97, 96, 0.7)',
//     borderRadius: 10,
//     padding: 12,
//     width: '80%',
//   },
//   storeInfoName: {
//     color: Color.white,
//     fontSize: 16,
//     fontFamily: 'Roboto-Bold',
//     marginBottom: 5,
//   },
//   storeInfoDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   storeInfoDetail: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   storeInfoText: {
//     color: Color.white,
//     fontFamily: 'Roboto-Medium',
//     fontSize: 12,
//     marginLeft: 4,
//   },
//   decorationDot: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     position: 'absolute',
//   },
//   yellowDot: {
//     backgroundColor: '#FFD700',
//     left: 30,
//     top: '50%',
//   },
//   orangeDot: {
//     backgroundColor: '#FF8C00',
//     right: 30,
//     top: '50%',
//   },
//   detailsContainer: {
//     backgroundColor: '#fff',
//   },
//   itemLabel: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 5,
//   },
//   categogy: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Medium',
//     color: Color.textPrimary3,
//     marginBottom: 8,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   quantityText: {
//     fontSize: 16,
//     marginHorizontal: 15,
//   },
//   priceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FF8C00',
//     marginBottom: 15,
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//     marginBottom: 10,
//   },
//   addToCartButton: {
//     backgroundColor: '#FF8C00',
//     borderRadius: 25,
//     padding: 15,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 'auto',
//     marginBottom: 20,
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Menu_Production;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from '../../../colors/colortv';
import Categories_Card from '../../../components/Bstore/Categories_Card';
import Products_Card from '../../../components/Bstore/Products_Card';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.35; // Chiều cao tối đa của header (hình ảnh)
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 80; // Chiều cao tối thiểu của header sau khi scroll
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Menu_Production = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Tính toán các giá trị animation dựa trên scrollY
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp',
  });

  // Sửa lại các giá trị animation cho tên cửa hàng
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.9, 1],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 3, -HEADER_SCROLL_DISTANCE / 1.5],
    extrapolate: 'clamp',
  });

  // Sửa lại giá trị để tên cửa hàng di chuyển đến vị trí phù hợp
  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, width / 3 - 50], // Điều chỉnh để tên nằm ở giữa
    extrapolate: 'clamp',
  });

  // Đảm bảo tên cửa hàng luôn hiển thị
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 4, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0.5, 1],
    extrapolate: 'clamp',
  });

  const titleColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [Color.white, Color.mainColor],
    extrapolate: 'clamp',
  });

  const addressColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [Color.white, '#888'],
    extrapolate: 'clamp',
  });

  const addressOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1], // luôn hiện
    extrapolate: 'clamp',
  });

  // Animation cho nút back
  const backButtonBgColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [Color.white, Color.white], // Giữ nguyên màu nền
    extrapolate: 'clamp',
  });

  // Sections cho FlatList chính
  const sections = [
    { id: 'categories', type: 'categories' },
    { id: 'products', type: 'products' }
  ];

  // Render function cho FlatList chính
  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'categories':
        return <Categories_Card />;
      case 'products':
        return <Products_Card />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Header Animado */}
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: headerBackgroundColor,
          },
        ]}
      >
        {/* Background Image */}
        <Animated.View
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
        >
          <ImageBackground
            source={{ uri: 'https://menuonline.vn/images/upload/news/789438234-Nha-hang-Hai-san.jpg' }}
            style={styles.fullImage}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </Animated.View>

        {/* Header Content */}
        <SafeAreaView style={styles.headerContent}>
          <View style={styles.headerTopRow}>
            {/* Nút back với animation */}
            <Animated.View
              style={[
                styles.backButtonContainer,
                {
                  backgroundColor: backButtonBgColor,
                }
              ]}
            >
              <TouchableOpacity style={styles.backButton}>
                <Icon name="chevron-left" size={24} color={Color.mainColor} />
              </TouchableOpacity>
            </Animated.View>

            {/* Tên cửa hàng khi scroll lên (chỉ hiển thị khi scroll) */}
            {/* Placeholder để cân bằng header */}
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Title and Address that will animate */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                transform: [
                  { translateY: titleTranslateY },
                  { translateX: titleTranslateX },
                  { scale: titleScale }
                ],
                opacity: titleOpacity,
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.storeInfoName,
                {
                  color: titleColor,
                },
              ]}
              numberOfLines={1}
            >
              Nhà hàng hải sản số 1
            </Animated.Text>

            <Animated.View
              style={[
                styles.storeInfoDetail,
                {
                  opacity: addressOpacity,
                },
              ]}
            >
              <Icon name="map-marker-radius-outline" size={18} color={Color.mainColor} />
              <Animated.Text
                style={[
                  styles.storeInfoText,
                  {
                    color: addressColor,
                  },
                ]}
                numberOfLines={1}
              >
                135/05/23 Trần Hưng Đạo, TP Hồ Chí Minh
              </Animated.Text>
            </Animated.View>
          </Animated.View>

        </SafeAreaView>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  backButtonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  backButton: {
    padding: 5,
    backgroundColor: 'transparent',
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 34,
  },
  titleContainer: {
    marginTop: 'auto',
    marginBottom: 6,
    width: '80%',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(94, 92, 92, 0.6)'
  },
  storeInfoName: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  storeInfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    justifyContent: 'center',
  },
  storeInfoText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: Color.mainColor,
  },

  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingBottom: 20, // Giảm padding dưới vì không còn nút Add to Cart
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
});

export default Menu_Production;