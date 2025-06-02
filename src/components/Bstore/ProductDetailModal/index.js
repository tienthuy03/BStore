import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Color } from '../../../colors/colortv';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CachedImage from '../../CachedImage';

const ProductDetailModal = ({ visible, product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Loại 1');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setAddedToCart(false);
      setSelectedSize('Loại 1');
    }
  }, [visible]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    setAddedToCart(true);
    // Gọi API hoặc xử lý thêm vào giỏ hàng tại đây
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.contentRow}>
            {/* <Image
              source={{ uri: product.image_uri }}
              style={styles.productImage}
              resizeMode="cover"
            /> */}
            <CachedImage image_uri={product.image_uri} style={styles.productImage} />

            <View style={styles.infoColumn}>
              <View style={styles.product_nm}>
                <Text style={styles.productName}>{product.prod_nm}</Text>
                <Text style={styles.productPrice}>đ{product.price?.toLocaleString()}</Text>
              </View>

              <Text style={styles.productDescription}>
                {product.description || 'Không có mô tả sản phẩm.'}
              </Text>

              <View style={styles.sizeRow}>
                <Text style={styles.sizeLabel}>Loại</Text>
                <View style={styles.sizeOptions}>
                  {['Loại 1', 'Loại 2'].map(size => (
                    <TouchableOpacity
                      key={size}
                      onPress={() => setSelectedSize(size)}
                      style={[
                        styles.sizeButton,
                        selectedSize === size && styles.sizeButtonSelected,
                      ]}
                    >
                      <Text
                        style={{
                          color: selectedSize === size ? '#fff' : '#000',
                          fontWeight: '500',
                        }}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.counterButton}>
                <Text style={styles.counterText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleAddToCart} style={{ flex: 1 }}>
              <LinearGradient
                colors={['#FA812F', '#FF9C49']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.addButton]}
              >
                <Text style={styles.addButtonText}>
                  {'Thêm vào giỏ'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  product_nm: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 40,
    maxHeight: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  productImage: {
    width: 110,
    height: 150,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  productPrice: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Medium',
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  sizeRow: {
    marginTop: 12,
  },
  sizeLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sizeButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  counterButton: {
    padding: 6,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetailModal;
