<<<<<<< HEAD
// components/Products.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { Color } from '../../../colors/colortv';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 36) / 2; // 36 = padding (16*2) + gap between items (4)

const Products_Card = () => {
  const products = [
    {
      id: '1',
      name: 'Organic Bananas',
      price: '1.00',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'bunch'
    },
    {
      id: '2',
      name: 'Peach',
      price: '1.99',
      image: 'https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'kg'
    },
    {
      id: '3',
      name: 'Kiwi',
      price: '2.49',
      image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: '4 pcs'
    },
    {
      id: '4',
      name: 'Oranges',
      price: '3.99',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'bag'
    },
    {
      id: '5',
      name: 'Apples',
      price: '2.49',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'kg'
    },
    {
      id: '6',
      name: 'Strawberries',
      price: '4.99',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'box'
    },
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productUnit}>{item.unit}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.productsWrapper}>
      <Text style={styles.products}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
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
    paddingBottom: 8
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
    backgroundColor: '#fff',
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
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

=======
// components/Products.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { Color } from '../../../colors/colortv';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 36) / 2; // 36 = padding (16*2) + gap between items (4)

const Products_Card = () => {
  const products = [
    {
      id: '1',
      name: 'Organic Bananas',
      price: '1.00',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'bunch'
    },
    {
      id: '2',
      name: 'Peach',
      price: '1.99',
      image: 'https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'kg'
    },
    {
      id: '3',
      name: 'Kiwi',
      price: '2.49',
      image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: '4 pcs'
    },
    {
      id: '4',
      name: 'Oranges',
      price: '3.99',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'bag'
    },
    {
      id: '5',
      name: 'Apples',
      price: '2.49',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'kg'
    },
    {
      id: '6',
      name: 'Strawberries',
      price: '4.99',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      unit: 'box'
    },
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productUnit}>{item.unit}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.productsWrapper}>
      <Text style={styles.products}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
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
    paddingBottom: 8
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
    backgroundColor: '#fff',
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
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

>>>>>>> TienDev_V1
export default Products_Card;