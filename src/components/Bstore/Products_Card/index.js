// // components/Products.js
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Dimensions
// } from 'react-native';
// import { Color } from '../../../colors/colortv';
// import CachedImage from '../../CachedImage';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = (width - 36) / 2; // 36 = padding (16*2) + gap between items (4)

// const Products_Card = ({ products, onPress }) => {
//   const renderProductItem = ({ item }) => (
//     <TouchableOpacity
//       activeOpacity={0.7}
//       onPress={() => onPress(item)} // ✅ Truyền item khi nhấn
//       style={styles.productItem}
//     >
//       <View style={styles.productImageContainer}>
//         <CachedImage
//           image_uri={item.image_uri}
//           style={{ width: '100%', height: '100%' }}

//         />
//       </View>
//       <View style={styles.productInfo}>
//         <Text style={styles.productUnit}>{item.uom}</Text>
//         <Text style={styles.productName}>{item.prod_nm}</Text>
//         <View style={styles.productPriceRow}>
//           <Text style={styles.productPrice}>đ{item.price}</Text>
//           <Text style={styles.productQuantity}>Số lượng: {item.qty}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.productsWrapper}>
//       <Text style={styles.products}>Products</Text>
//       <FlatList
//         data={products}
//         renderItem={renderProductItem}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.productRow}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.productsContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   products: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular',
//     color: Color.textPrimary3,
//     paddingBottom: 8,
//   },
//   productsWrapper: {
//     flex: 1,
//     paddingHorizontal: 12,
//   },
//   productsContainer: {
//     padding: 12,
//   },
//   productRow: {
//     justifyContent: 'space-between',
//   },
//   productItem: {
//     backgroundColor: Color.white,
//     borderRadius: 12,
//     width: ITEM_WIDTH,
//     marginBottom: 12,
//     overflow: 'hidden',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   productImageContainer: {
//     backgroundColor: '#f5f5f5',
//     height: 140,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productInfo: {
//     padding: 12,
//   },
//   productUnit: {
//     fontSize: 11,
//     color: '#888',
//     marginBottom: 2,
//   },
//   productName: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Medium',
//     color: '#333',
//     marginBottom: 4,
//   },
//   productPriceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   productPrice: {
//     fontSize: 16,
//     fontFamily: 'Roboto-Bold',
//     color: Color.mainColor,
//   },
//   productQuantity: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Regular',
//     color: Color.textPrimary3,
//   },
// });

// export default Products_Card;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { Color } from '../../../colors/colortv';
import CachedImage from '../../CachedImage';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 36) / 2; // 36 = padding (16*2) + gap between items (4)

const Products_Card = ({ products, onPress }) => {
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      style={styles.productItem}
    >
      {/* Discount Badge */}
      {item.save_off && item.save_off > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{item.save_off}%</Text>
        </View>
      )}

      <View style={styles.productImageContainer}>
        <CachedImage
          image_uri={item.image_uri}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productUnit}>{item.uom}</Text>
        <Text style={styles.productName}>{item.prod_nm}</Text>
        <View style={styles.productPriceRow}>
          {/* Hiển thị giá gốc và giá giảm nếu có discount */}
          {item.discount_percent && item.discount_percent > 0 ? (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>đ{item.original_price || item.price}</Text>
              <Text style={styles.productPrice}>đ{item.price}</Text>
            </View>
          ) : (
            <Text style={styles.productPrice}>đ{item.price}</Text>
          )}
          <Text style={styles.productQuantity}>Số lượng: {item.qty}</Text>
        </View>
      </View>

      {/* Out of Stock Overlay */}
      {item.use_yn === "N" && (
        <View style={styles.outOfStockOverlay}>
          <View style={styles.outOfStockContainer}>
            <Text style={styles.outOfStockText}>Hết hàng</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.productsWrapper}>
      <Text style={styles.products}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  products: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.textPrimary3,
    paddingBottom: 8,
  },
  productsWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  productsContainer: {
    padding: 12,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productItem: {
    backgroundColor: Color.white,
    borderRadius: 12,
    width: ITEM_WIDTH,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative', // Để có thể đặt absolute elements
  },
  productImageContainer: {
    backgroundColor: '#f5f5f5',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productUnit: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#333',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#888',
    textDecorationLine: 'line-through',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: Color.mainColor,
  },
  productQuantity: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Color.textPrimary3,
  },
  // Discount Badge Styles
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  discountText: {
    fontSize: 10,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  // Out of Stock Overlay Styles
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(208, 202, 202, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  outOfStockContainer: {
    backgroundColor: Color.mainColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  outOfStockText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Products_Card;