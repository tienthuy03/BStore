import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';

const AddressBox = ({ address, onPress, placeholder = "Chọn địa chỉ giao hàng" }) => {
  if (!address) {
    return (
      <TouchableOpacity style={styles.emptyBox} onPress={onPress}>
        <Icon name="map-marker-plus" size={20} color={Color.textPrimary3} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
        <Icon name="chevron-right" size={20} color={Color.textPrimary3} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.addressBox} onPress={onPress}>
      <View style={styles.addressHeader}>
        <Icon name="map-marker" size={20} color={Color.mainColor} />
        <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
        <Icon name="pencil" size={16} color={Color.mainColor} />
      </View>

      <View style={styles.addressContent}>
        <Text style={styles.streetAddress}>{address.streetAddress}</Text>
        <Text style={styles.fullAddress}>
          {address.ward?.name}, {address.district?.name}, {address.province?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emptyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 16,
    marginTop: 6,
    backgroundColor: '#f8f9fa',
  },
  placeholderText: {
    flex: 1,
    marginLeft: 12,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  addressBox: {
    borderWidth: 1.5,
    borderColor: Color.mainColor,
    borderRadius: 10,
    padding: 16,
    marginTop: 6,
    backgroundColor: '#FFF7F0',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTitle: {
    flex: 1,
    marginLeft: 8,
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  addressContent: {
    marginLeft: 28,
  },
  streetAddress: {
    color: Color.textPrimary2,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    marginBottom: 2,
  },
  fullAddress: {
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
  },
});

export default AddressBox;
