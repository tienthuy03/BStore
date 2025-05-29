import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from '../../../colors/colortv';
import Categories_Card from '../../../components/Bstore/Categories_Card';
import Products_Card from '../../../components/Bstore/Products_Card';
import SearchBar from '../../../components/Bstore/SearchBar';
import Modal_Product from '../../../components/Bstore/ProductDetailModal';
import ProductDetailModal from '../../../components/Bstore/ProductDetailModal';

const Menu_Production = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };
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
        return <Products_Card products={products} onPress={(product) => openModal(product)} />;
      default:
        return null;
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.headerTopRow}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={Color.mainColor} />
        </TouchableOpacity>
        <View
          style={styles.storeInfoHeader}
        >
          <Text
            style={{}}
            numberOfLines={1}
          >
            Nhà hàng hải sản số 1
          </Text>

        </View>
        <View />
      </View>
      <SearchBar />
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent} />

      <ProductDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={closeModal}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: Color.mainColor,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  storeInfoHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfoDetail: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContent: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTopRow: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: StatusBar.currentHeight || 0,
  },

});

export default Menu_Production;