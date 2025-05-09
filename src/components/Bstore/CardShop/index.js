import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';

const CardShop = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://statics.vincom.com.vn/xu-huong/anh-revamp/image_2022-11-11_140104961.png' }} // đổi URL hình ảnh thật
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.shopName}>Shop Cá Tươi Biển</Text>
        <Text style={styles.detail}>Địa chỉ: 123 Đường Biển, TP. Nha Trang</Text>
        <Text style={styles.detail}>Chủ cửa hàng: Nguyễn Văn A</Text>
        <Text style={styles.detail}>SĐT: 0909 123 456</Text>

        <TouchableOpacity style={styles.enterButton}>
          <Icon name="arrow-right-bold-circle" size={28} color="#FA812F" />
        </TouchableOpacity>
      </View>
    </View>
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
