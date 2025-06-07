import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import { Color } from '../../../colors/colortv';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CachedImage from '../../CachedImage';

const ProductDetailModal = ({ visible, product, onClose, listCategory }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [manualQuantity, setManualQuantity] = useState('1');

  useEffect(() => {
    if (visible) {
      setQuantity(0.5);
      setManualQuantity('0.5');
      setAddedToCart(false);
      setSelectedSize('');
    }
  }, [visible]);

  // Set default selected category when modal opens
  useEffect(() => {
    if (visible && Array.isArray(listCategory) && listCategory.length > 0 && !selectedSize) {
      setSelectedSize(listCategory[0]);
    }
  }, [visible, listCategory]);

  const handleQuantityChange = (text) => {
    // Cho phép nhập số và dấu thập phân
    const numericValue = text.replace(/[^0-9.]/g, '');

    // Đảm bảo chỉ có một dấu thập phân
    const parts = numericValue.split('.');
    let formattedValue = parts[0];
    if (parts.length > 1) {
      formattedValue += '.' + parts[1];
    }

    setManualQuantity(formattedValue);

    if (formattedValue) {
      const num = parseFloat(formattedValue);
      if (!isNaN(num) && num > 0) {
        setQuantity(num);
      } else {
        setQuantity(0.5); // Giá trị mặc định tối thiểu
      }
    } else {
      setQuantity(0.5);
    }
  };

  const handleQuantityBlur = () => {
    if (!manualQuantity || parseFloat(manualQuantity) < 0.5 || isNaN(parseFloat(manualQuantity))) {
      setManualQuantity('0.5');
      setQuantity(0.5);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 0.5;
    setQuantity(newQuantity);
    setManualQuantity(newQuantity.toString());
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 0.5 ? quantity - 0.5 : 0.5;
    setQuantity(newQuantity);
    setManualQuantity(newQuantity.toString());
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    // Gọi API hoặc xử lý thêm vào giỏ hàng tại đây
    console.log('Added to cart:', {
      product: product,
      selectedCategory: selectedSize,
      quantity: quantity,
      totalPrice: selectedSize?.price * quantity
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedSize(category);
  };

  // Get current price and description based on selected category
  const getCurrentPrice = () => {
    if (selectedSize && selectedSize.price) {
      return `đ${selectedSize.price.toLocaleString()}`;
    }
    return 'đ0';
  };

  const getCurrentDescription = () => {
    if (selectedSize && selectedSize.description) {
      return selectedSize.description;
    }
    if (selectedSize && selectedSize.price_type_description) {
      return selectedSize.price_type_description;
    }
    return 'Không có mô tả sản phẩm.';
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
            <CachedImage image_uri={product.image_uri} style={styles.productImage} />
            <View style={styles.infoColumn}>
              <View style={styles.product_nm}>
                <Text style={styles.productName}>{product.prod_nm}</Text>
                <Text style={styles.productPrice}>{getCurrentPrice()}</Text>
              </View>
              <Text style={styles.productDescription}>
                {getCurrentDescription()}
              </Text>
            </View>
          </View>

          <View style={styles.sizeRow}>
            <Text style={styles.sizeLabel}>Loại hàng</Text>
            <View style={styles.sizeOptions}>
              {Array.isArray(listCategory) && listCategory.map((item) => (
                <TouchableOpacity
                  key={item.pk}
                  onPress={() => handleCategorySelect(item)}
                  style={[
                    styles.sizeButton,
                    selectedSize?.pk === item.pk && styles.sizeButtonSelected,
                  ]}
                >
                  <Text
                    style={{
                      color: selectedSize?.pk === item.pk ? Color.white : Color.textPrimary2,
                      fontFamily: 'Roboto-Medium',
                    }}
                  >
                    {item.price_type_mn}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <View>
              <Text style={styles.txtNote}>Số lượng hàng có thể nhập tay</Text>
            </View>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.counterButton}>
                <Text style={styles.counterText}>−</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={manualQuantity}
                onChangeText={handleQuantityChange}
                onBlur={handleQuantityBlur}
                keyboardType="decimal-pad"
                maxLength={5}
                onSubmitEditing={Keyboard.dismiss}
              />
              <TouchableOpacity onPress={increaseQuantity} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={handleAddToCart} style={{ flex: 1 }}>
              <LinearGradient
                colors={[Color.mainColor, Color.mainColor3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.addButton]}
              >
                <Text style={styles.addButtonText}>
                  Thêm vào giỏ hàng
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
  txtNote: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: Color.mainColor3
  },
  product_nm: {
    flexDirection: 'row',
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
    gap: 8,
  },
  productImage: {
    width: 130,
    height: 150,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  infoColumn: {
    flex: 1,
    gap: 8,
  },
  productName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14
  },
  productPrice: {
    fontSize: 18,
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
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
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.gray,
  },
  sizeButtonSelected: {
    backgroundColor: Color.mainColor2,
    borderColor: Color.mainColor2,
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
    padding: 4,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityInput: {
    marginHorizontal: 8,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 40,
    padding: 0,
  },
  addButton: {
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