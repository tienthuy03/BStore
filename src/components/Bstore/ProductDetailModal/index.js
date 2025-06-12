
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
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { Color } from '../../../colors/colortv';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CachedImage from '../../CachedImage';

// Thêm prop onAddToCart để nhận callback từ component cha
const ProductDetailModal = ({ visible, product, onClose, listCategory, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [manualQuantity, setManualQuantity] = useState('');
  console.log("product: ", product);

  // Kiểm tra xem có category hay không
  const hasCategories = Array.isArray(listCategory) && listCategory.length > 0;
  console.log("product: ", product);

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setManualQuantity('1');
      setAddedToCart(false);
      setSelectedSize(null);
    }
  }, [visible]);

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
        setQuantity(1);
      }
    } else {
      setQuantity(1);
    }
  };

  const handleQuantityBlur = () => {
    if (!manualQuantity || parseFloat(manualQuantity) <= 0 || isNaN(parseFloat(manualQuantity))) {
      setManualQuantity('1');
      setQuantity(1);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setManualQuantity(newQuantity.toString());
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    setManualQuantity(newQuantity.toString());
  };

  // Hiển thị thông báo thành công
  const showSuccessMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Thông báo', message);
    }
  };
  console.log("product: ", product);
  console.log("selected: ", selectedSize);


  const handleAddToCart = () => {
    if (hasCategories && !selectedSize) {
      return Alert.alert('Thông báo', 'Vui lòng chọn loại hàng trước khi thêm vào giỏ hàng');
    }

    const source = (hasCategories && selectedSize) ? selectedSize : product;
    const cartItem = {
      id: selectedSize ? `${product.tdp_production_pk}_${selectedSize.pk}` : product.tdp_production_pk,
      productId: product.tdp_production_pk,
      name: product.prod_nm,
      image: product.image_uri,
      price: source.price || product.prod_price,
      price_unit: source.unit_price || product.prod_unit_price,
      uom: source.price_type_uom || product.prod_uom,
      quantity,
      category: selectedSize,
      categoryName: source.price_type_mn || null,
      totalPrice: (source.unit_price || product.prod_unit_price) * quantity,
      selected: false
    };

    onAddToCart?.(cartItem);
    setAddedToCart(true);
    showSuccessMessage('Đã thêm sản phẩm vào giỏ hàng');
    setTimeout(onClose, 1000);
  };

  const handleCategorySelect = (category) => {
    setSelectedSize(category);
  };

  // Get current price and description based on selected category
  const getCurrentPrice = () => {
    if (selectedSize && selectedSize.price) {
      return `đ${selectedSize.price.toLocaleString()}`;
    }
    // Hiển thị giá từ product gốc
    if (product && product.prod_price) {
      return `đ${product.prod_price.toLocaleString()}`;
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
    // Hiển thị mô tả từ product gốc
    if (product && product.prod_desc) {
      return product.prod_desc;
    }
    return 'Không có mô tả sản phẩm.';
  };

  // Kiểm tra xem button có nên được disable hay không
  const isAddButtonDisabled = hasCategories && !selectedSize;

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

          {/* Chỉ hiển thị phần category nếu có categories */}
          {hasCategories && (
            <View style={styles.sizeRow}>
              <Text style={styles.sizeLabel}>
                Loại hàng {!selectedSize && <Text style={styles.requiredText}>*</Text>}
              </Text>
              <View style={styles.sizeOptions}>
                {listCategory.map((item) => (
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
              {!selectedSize && (
                <Text style={styles.warningText}>Vui lòng chọn loại hàng</Text>
              )}
            </View>
          )}

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
                maxLength={6}
                onSubmitEditing={Keyboard.dismiss}
                selectTextOnFocus={true}
              />
              <TouchableOpacity onPress={increaseQuantity} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={handleAddToCart} style={{ flex: 1 }}>
              <LinearGradient
                colors={isAddButtonDisabled ? ['#ccc', '#999'] : [Color.mainColor, Color.mainColor3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.addButton, isAddButtonDisabled && styles.disabledButton]}
              >
                <Text style={[styles.addButtonText, isAddButtonDisabled && styles.disabledButtonText]}>
                  {addedToCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}
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
  requiredText: {
    color: 'red',
    fontSize: 16,
  },
  warningText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
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
  disabledButton: {
    opacity: 0.6,
  },
  disabledButtonText: {
    color: '#fff',
  },
});

export default ProductDetailModal;