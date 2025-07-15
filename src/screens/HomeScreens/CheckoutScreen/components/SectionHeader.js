import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';

const SectionHeader = ({ icon, title, onEdit, editLabel = "Chỉnh sửa", style, textStyle }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }, style]}>
    <Icon name={icon} size={20} color={Color.mainColor} />
    <Text style={[{ fontFamily: 'Roboto-Bold', fontSize: 14, marginLeft: 8, flex: 1, color: Color.textPrimary2 }, textStyle]}>{title}</Text>
    {onEdit && (
      <TouchableOpacity onPress={onEdit} style={{ paddingHorizontal: 8, paddingVertical: 2 }}>
        <Text style={{ color: Color.mainColor, fontFamily: 'Roboto-Bold', fontSize: 13 }}>{editLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default SectionHeader; 