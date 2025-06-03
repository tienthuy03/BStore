// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { Color } from '../../../colors/colortv';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import CachedImage from '../../CachedImage';

// const ProductDetailModal = ({ visible, product, onClose }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('Loại 1');
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     if (visible) {
//       setQuantity(1);
//       setAddedToCart(false);
//       setSelectedSize('Loại 1');
//     }
//   }, [visible]);

//   const increaseQuantity = () => setQuantity(prev => prev + 1);
//   const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     // Gọi API hoặc xử lý thêm vào giỏ hàng tại đây
//   };

//   if (!product) return null;

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.modal}>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Icon name="close" size={24} color="#333" />
//           </TouchableOpacity>

//           <View style={styles.contentRow}>
//             <CachedImage image_uri={product.image_uri} style={styles.productImage} />
//             <View style={styles.infoColumn}>
//               <View style={styles.product_nm}>
//                 <Text style={styles.productName}>{product.prod_nm}</Text>
//                 <Text style={styles.productPrice}>đ{product.price?.toLocaleString()}</Text>
//               </View>

//               <Text style={styles.productDescription}>
//                 {product.description || 'Không có mô tả sản phẩm.'}
//               </Text>

//               <View style={styles.sizeRow}>
//                 <Text style={styles.sizeLabel}>Loại</Text>
//                 <View style={styles.sizeOptions}>
//                   {['Loại 1', 'Loại 2'].map(size => (
//                     <TouchableOpacity
//                       key={size}
//                       onPress={() => setSelectedSize(size)}
//                       style={[
//                         styles.sizeButton,
//                         selectedSize === size && styles.sizeButtonSelected,
//                       ]}
//                     >
//                       <Text
//                         style={{
//                           color: selectedSize === size ? Color.white : Color.textPrimary2,
//                           fontFamily: 'Roboto-Medium',
//                         }}
//                       >
//                         {size}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={styles.bottomRow}>
//             <View style={styles.counterContainer}>
//               <TouchableOpacity onPress={decreaseQuantity} style={styles.counterButton}>
//                 <Text style={styles.counterText}>−</Text>
//               </TouchableOpacity>
//               <Text style={styles.quantityText}>{quantity}</Text>
//               <TouchableOpacity onPress={increaseQuantity} style={styles.counterButton}>
//                 <Text style={styles.counterText}>+</Text>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity onPress={handleAddToCart} style={{ flex: 1 }}>
//               <LinearGradient
//                 colors={[Color.mainColor, Color.mainColor3]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={[styles.addButton]}
//               >
//                 <Text style={styles.addButtonText}>
//                   {'Thêm vào giỏ hàng'}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   product_nm: {
//     flexDirection: 'row',
//     gap: 4,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   modal: {
//     backgroundColor: Color.white,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     paddingTop: 40,
//     maxHeight: '90%',
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     zIndex: 10,
//   },
//   contentRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   productImage: {
//     width: 110,
//     height: 150,
//     borderRadius: 16,
//     backgroundColor: '#eee',
//   },
//   infoColumn: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   productName: {
//     fontFamily: 'Roboto-Bold',
//     fontSize: 16,
//   },
//   productPrice: {
//     color: Color.mainColor,
//     fontFamily: 'Roboto-Medium',
//   },
//   productDescription: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 4,
//   },
//   sizeRow: {
//     marginTop: 12,
//   },
//   sizeLabel: {
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   sizeOptions: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   sizeButton: {
//     paddingVertical: 4,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: Color.gray,
//   },
//   sizeButtonSelected: {
//     backgroundColor: Color.mainColor2,
//     borderColor: Color.mainColor2,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 14,
//     gap: 10,
//   },
//   counterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f1f1f1',
//     paddingHorizontal: 10,
//     borderRadius: 20,
//   },
//   counterButton: {
//     padding: 6,
//   },
//   counterText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   quantityText: {
//     marginHorizontal: 8,
//     fontSize: 16,
//   },
//   addButton: {
//     borderRadius: 20,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ProductDetailModal;
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

const ProductDetailModal = ({ visible, product, onClose, category }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Loại 1');
  const [addedToCart, setAddedToCart] = useState(false);
  const [manualQuantity, setManualQuantity] = useState('1');

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setManualQuantity('1');
      setAddedToCart(false);
      setSelectedSize('Loại 1');
    }
  }, [visible]);

  const handleQuantityChange = (text) => {
    // Chỉ cho phép nhập số
    const numericValue = text.replace(/[^0-9]/g, '');
    setManualQuantity(numericValue);

    if (numericValue) {
      const num = parseInt(numericValue, 10);
      setQuantity(num > 0 ? num : 1);
    } else {
      setQuantity(1);
    }
  };

  const handleQuantityBlur = () => {
    if (!manualQuantity || parseInt(manualQuantity, 10) < 1) {
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
            <CachedImage image_uri={product.image_uri} style={styles.productImage} />
            <View style={styles.infoColumn}>
              <View style={styles.product_nm}>
                <Text style={styles.productName}>{product.prod_nm}</Text>
                <Text style={styles.productPrice}>đ{product.price?.toLocaleString()}</Text>
              </View>
              <Text style={styles.productDescription}>
                {product.description || 'Không có mô tả sản phẩm.'}
              </Text>
            </View>
          </View>
          <View style={styles.sizeRow}>
            <Text style={styles.sizeLabel}>Loại hàng</Text>
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
                      color: selectedSize === size ? Color.white : Color.textPrimary2,
                      fontFamily: 'Roboto-Medium',
                    }}
                  >
                    {size}
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
                keyboardType="numeric"
                maxLength={3}
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
                  {'Thêm vào giỏ hàng'}
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
    // justifyContent: 'space-between',
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
    // marginTop: 4,
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