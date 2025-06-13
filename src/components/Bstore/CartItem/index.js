// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Keyboard } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Color } from '../../../colors/colortv';
// import CachedImage from '../../CachedImage';

// const CartItem = ({ item, onRemove, onToggleSelect, onUpdateQuantity }) => {
//   console.log("item cart item: ", item);

//   const [manualQuantity, setManualQuantity] = useState(item.quantity.toString());

//   // Cập nhật manualQuantity khi item.quantity thay đổi từ bên ngoài
//   useEffect(() => {
//     if (!isNaN(item.quantity)) {
//       setManualQuantity(item.quantity.toString());
//     }
//   }, [item.quantity]);

//   // Tăng số lượng
//   const handleIncrease = () => {
//     const current = parseFloat(manualQuantity);
//     const newQuantity = isNaN(current) ? 1 : Math.floor(current) + 1;
//     setManualQuantity(newQuantity.toString());
//     onUpdateQuantity(item.id, newQuantity);
//   };

//   // Giảm số lượng
//   const handleDecrease = () => {
//     const current = parseFloat(manualQuantity);
//     const safeCurrent = isNaN(current) ? 1 : Math.ceil(current);
//     const newQuantity = Math.max(1, safeCurrent - 1);
//     setManualQuantity(newQuantity.toString());
//     onUpdateQuantity(item.id, newQuantity);
//   };

//   // Khi thay đổi thủ công
//   const handleQuantityChange = (text) => {
//     const numericValue = text.replace(/[^0-9.]/g, '');
//     const parts = numericValue.split('.');
//     let formattedValue = parts[0];
//     if (parts.length > 1) {
//       formattedValue += '.' + parts[1];
//     }
//     setManualQuantity(formattedValue);

//     const num = parseFloat(formattedValue);
//     if (!isNaN(num) && num > 0) {
//       onUpdateQuantity(item.id, num);
//     }
//   };

//   // Khi rời ô nhập hoặc submit
//   const handleQuantityBlur = () => {
//     const num = parseFloat(manualQuantity);
//     if (isNaN(num) || num <= 0) {
//       setManualQuantity('1');
//       onUpdateQuantity(item.id, 1);
//     }
//   };

//   const handleQuantitySubmit = () => {
//     Keyboard.dismiss();
//     handleQuantityBlur();
//   };


//   return (
//     <View style={styles.card}>
//       {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
//       <CachedImage image_uri={item.image} style={styles.image} />
//       <View style={styles.info}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>{item.name}</Text>
//           <TouchableOpacity onPress={() => onRemove(item.id)}>
//             <Icon name="delete-forever" size={24} color={Color.mainColor3} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.subText}>đ{item.price}/{item.uom}</Text>
//         <View style={styles.bottomRow}>
//           <Text style={styles.total}>đ{((item.price_unit * item.quantity)).toLocaleString()}</Text>
//           <View style={styles.quantityControl}>
//             <TouchableOpacity
//               onPress={handleDecrease}
//               style={styles.roundButton}
//             >
//               <Icon name="minus" size={18} color="#555" />
//             </TouchableOpacity>
//             <TextInput
//               style={styles.quantityInput}
//               value={manualQuantity}
//               onChangeText={handleQuantityChange}
//               onBlur={handleQuantityBlur}
//               onSubmitEditing={handleQuantitySubmit}
//               keyboardType="decimal-pad" // Thay đổi từ "numeric" thành "decimal-pad"
//               maxLength={6} // Tăng maxLength để cho phép số thập phân
//               selectTextOnFocus={true} // Chọn toàn bộ text khi focus
//             />
//             <TouchableOpacity
//               onPress={handleIncrease}
//               style={styles.roundButton}
//             >
//               <Icon name="plus" size={18} color="#555" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: Color.white,
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 14,
//     shadowColor: Color.gray,
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   image: {
//     width: 75,
//     height: 75,
//     marginRight: 12,
//     borderRadius: 8,
//     backgroundColor: Color.gray,
//   },
//   info: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     flex: 1,
//     paddingRight: 10,
//   },
//   subText: {
//     fontSize: 13,
//     color: '#888',
//     marginTop: 2,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   total: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Color.gray,
//     borderRadius: 100,
//   },
//   quantityInput: {
//     width: 50, // Tăng width để hiển thị số thập phân tốt hơn
//     height: 28,
//     textAlign: 'center',
//     fontSize: 15,
//     fontWeight: '500',
//     padding: 0,
//     marginHorizontal: 4,
//   },
//   roundButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CartItem;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';
import CachedImage from '../../CachedImage';

const CartItem = ({
  item,
  onRemove,
  onToggleSelect = () => { }, // Thêm default function
  onUpdateQuantity
}) => {
  console.log("item cart item: ", item);

  const [manualQuantity, setManualQuantity] = useState(item.quantity.toString());

  // Cập nhật manualQuantity khi item.quantity thay đổi từ bên ngoài
  useEffect(() => {
    if (!isNaN(item.quantity)) {
      setManualQuantity(item.quantity.toString());
    }
  }, [item.quantity]);

  // Tăng số lượng
  const handleIncrease = () => {
    const current = parseFloat(manualQuantity);
    const newQuantity = isNaN(current) ? 1 : Math.floor(current) + 1;
    setManualQuantity(newQuantity.toString());
    onUpdateQuantity(item.id, newQuantity);
  };

  // Giảm số lượng
  const handleDecrease = () => {
    const current = parseFloat(manualQuantity);
    const safeCurrent = isNaN(current) ? 1 : Math.ceil(current);
    const newQuantity = Math.max(1, safeCurrent - 1);
    setManualQuantity(newQuantity.toString());
    onUpdateQuantity(item.id, newQuantity);
  };

  // Khi thay đổi thủ công
  const handleQuantityChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    let formattedValue = parts[0];
    if (parts.length > 1) {
      formattedValue += '.' + parts[1];
    }
    setManualQuantity(formattedValue);

    const num = parseFloat(formattedValue);
    if (!isNaN(num) && num > 0) {
      onUpdateQuantity(item.id, num);
    }
  };

  // Khi rời ô nhập hoặc submit
  const handleQuantityBlur = () => {
    const num = parseFloat(manualQuantity);
    if (isNaN(num) || num <= 0) {
      setManualQuantity('1');
      onUpdateQuantity(item.id, 1);
    }
  };

  const handleQuantitySubmit = () => {
    Keyboard.dismiss();
    handleQuantityBlur();
  };

  // Xử lý toggle checkbox với kiểm tra an toàn
  const handleToggleSelect = () => {
    if (typeof onToggleSelect === 'function') {
      onToggleSelect(item.id);
    }
  };

  return (
    <View style={styles.card}>
      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggleSelect}
      >
        <View style={[
          styles.checkbox,
          item.selected && styles.checkboxSelected
        ]}>
          {item.selected && (
            <Icon
              name="check"
              size={14}
              color={Color.white}
            />
          )}
        </View>
      </TouchableOpacity>

      <CachedImage image_uri={item.image} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Icon name="delete-forever" size={24} color={Color.mainColor3} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>đ{item.price}/{item.uom}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.total}>đ{((item.price_unit * item.quantity)).toLocaleString()}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={handleDecrease}
              style={styles.roundButton}
            >
              <Icon name="minus" size={18} color="#555" />
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={manualQuantity}
              onChangeText={handleQuantityChange}
              onBlur={handleQuantityBlur}
              onSubmitEditing={handleQuantitySubmit}
              keyboardType="decimal-pad"
              maxLength={6}
              selectTextOnFocus={true}
            />
            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.roundButton}
            >
              <Icon name="plus" size={18} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: Color.gray,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Color.mainColor3,
    borderColor: Color.mainColor3,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: Color.gray,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    paddingRight: 10,
  },
  subText: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.gray,
    borderRadius: 100,
  },
  quantityInput: {
    width: 50,
    height: 28,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    padding: 0,
    marginHorizontal: 4,
  },
  roundButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartItem;