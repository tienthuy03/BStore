// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Color } from '../../../colors/colortv';

// const CartItem = ({ item, onRemove, onToggleSelect, onUpdateQuantity }) => (
//   <View style={styles.card}>
//     <Image source={{ uri: item.image }} style={styles.image} />
//     <View style={styles.info}>
//       <View style={styles.headerRow}>
//         <Text style={styles.title}>{item.name}</Text>
//         <TouchableOpacity onPress={() => onRemove(item.id)}>
//           <Icon name="delete-forever" size={24} color={Color.mainColor3} />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.subText}>${item.price}/item</Text>
//       <View style={styles.bottomRow}>
//         <Text style={styles.total}>${(item.price * item.quantity).toFixed(2)}</Text>
//         <View style={styles.quantityControl}>
//           <TouchableOpacity onPress={() => onUpdateQuantity(item.id, -1)} style={styles.roundButton}>
//             <Icon name="minus" size={18} color="#555" />
//           </TouchableOpacity>
//           <Text style={styles.quantity}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => onUpdateQuantity(item.id, 1)} style={styles.roundButton}>
//             <Icon name="plus" size={18} color="#555" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   </View>
// );
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
//   },
//   quantity: {
//     marginHorizontal: 10,
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   roundButton: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#F2F2F2',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// export default CartItem;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';

const CartItem = ({ item, onRemove, onToggleSelect, onUpdateQuantity }) => {
  const [manualQuantity, setManualQuantity] = useState(item.quantity.toString());

  const handleQuantityChange = (text) => {
    // Chỉ cho phép nhập số
    const numericValue = text.replace(/[^0-9]/g, '');
    setManualQuantity(numericValue);

    if (numericValue && numericValue !== '0') {
      const num = parseInt(numericValue, 10);
      onUpdateQuantity(item.id, num - item.quantity); // Tính toán chênh lệch
    }
  };

  const handleQuantityBlur = () => {
    if (!manualQuantity || parseInt(manualQuantity, 10) < 1) {
      setManualQuantity('1');
      onUpdateQuantity(item.id, 1 - item.quantity); // Reset về 1 nếu giá trị không hợp lệ
    }
  };

  const handleQuantitySubmit = () => {
    Keyboard.dismiss();
    if (!manualQuantity || parseInt(manualQuantity, 10) < 1) {
      setManualQuantity('1');
      onUpdateQuantity(item.id, 1 - item.quantity);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Icon name="delete-forever" size={24} color={Color.mainColor3} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>${item.price}/item</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.total}>${(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, -1)}
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
              keyboardType="numeric"
              maxLength={3}
            />
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, 1)}
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
    borderRadius: 100

  },
  quantityInput: {
    width: 40,
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