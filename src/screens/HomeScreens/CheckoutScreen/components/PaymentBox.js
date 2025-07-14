import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';

const PaymentBox = ({ icon, text, onPress, style }) => (
  <TouchableOpacity style={[{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.mainColor,
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
    // backgroundColor: '#FFF7F0',
  }, style]} onPress={onPress}>
    <Icon name={icon} size={18} color={Color.mainColor} style={{ marginRight: 8 }} />
    <Text style={{ color: Color.textPrimary2, fontFamily: 'Roboto-Bold', fontSize: 14 }}>{text}</Text>
  </TouchableOpacity>
);

export default PaymentBox; 