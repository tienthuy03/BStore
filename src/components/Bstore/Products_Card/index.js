// components/Products.js
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
      onPress={() => onPress(item)} // ✅ Truyền item khi nhấn
      style={styles.productItem}
    >
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
          <Text style={styles.productPrice}>đ{item.price}</Text>
<<<<<<< HEAD
          <Text style={styles.productQuantity}>Số lượng: {item.qty}{item.uom}</Text>
=======
          <Text style={styles.productQuantity}>Số lượng: {item.qty}</Text>
>>>>>>> TienDev_V1
        </View>
      </View>
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
});

export default Products_Card;
