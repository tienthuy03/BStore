import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';
import CachedImage from '../../CachedImage';
import LinearGradient from 'react-native-linear-gradient';

const CardShop = ({ onPress, image_uri, shop_name, shop_address, shop_owner, shop_phone }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <CachedImage
        image_uri={image_uri}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.shopName}>{shop_name}</Text>
        <Text style={styles.detail}>Địa chỉ: {shop_address}</Text>
        <Text style={styles.detail}>Chủ cửa hàng: {shop_owner}</Text>
        <Text style={styles.detail}>SĐT: {shop_phone}</Text>

        <TouchableOpacity style={styles.enterButton}>
          <Icon name="arrow-right-bold-circle" size={28} color={Color.mainColor} />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    backgroundColor: 'green'
  },
  infoContainer: {
    padding: 12,
    position: 'relative',
  },
  shopName: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontFamily: 'Roboto-Regular'
  },
  enterButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
});

export default CardShop;
