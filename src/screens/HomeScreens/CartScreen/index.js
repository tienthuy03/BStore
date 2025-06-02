import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../../../components/Bstore/Header/Header';
import CartItem from '../../../components/Bstore/CartItem';
import CartSummary from '../../../components/Bstore/CartSummary';
import { Color } from '../../../colors/colortv';

const mockData = [
  {
    id: '1',
    name: 'Cua biển cà mau',
    price: 1.79,
    image: "https://i.pinimg.com/736x/84/da/31/84da31033631cfe3e0a78fde65b77e27.jpg",
    quantity: 1,
    selected: true,
  },
  {
    id: '2',
    name: 'Cá nục',
    price: 2.33,
    image: "https://i.pinimg.com/736x/fb/b7/fa/fbb7fa06d581ebd844a2999489bd40cd.jpg",
    quantity: 1,
    selected: false,
  },
  {
    id: '3',
    name: 'Tôm sú',
    price: 3.81,
    image: "https://i.pinimg.com/736x/7a/4f/65/7a4f65e44b8b8720896471119de947b9.jpg",
    quantity: 2,
    selected: true,
  },
  {
    id: '4',
    name: 'Ghẹ sống',
    price: 2.79,
    image: "https://i.pinimg.com/736x/8e/f4/64/8ef464526079937e3b34afe9fc0fd67c.jpg",
    quantity: 1,
    selected: false,
  },
];

const CartScreen = ({ navigation: { goBack } }) => {
  const [items, setItems] = useState(mockData);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return items
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Header goBack={goBack}>Giỏ hàng của bạn</Header>
      <View style={styles.body}>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          )}
          contentContainerStyle={{ padding: 12 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <CartSummary total={getTotal()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.gray },
  body: { flex: 1 },
});
export default CartScreen;
