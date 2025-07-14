import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';

const InfoRow = ({ icon, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
    <Icon name={icon} size={16} color="#888" />
    <Text style={{ marginLeft: 8, color: Color.textPrimary3, fontFamily: 'Roboto-Regular', fontSize: 14 }}>{text}</Text>
  </View>
);

export default InfoRow; 