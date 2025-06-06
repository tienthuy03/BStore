import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({
  children,
  goBack = null,
  rightIconVisible = false,
  onRightPress = () => { },
  rightIconName = 'dots-vertical',
  color
}) => {
  const Color = useSelector(s => s.SystemReducer.theme);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
      }}>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={{ paddingRight: 12 }}
        onPress={async () => await goBack()}>
        <Icon name="arrow-left" size={24} color={Color.textPrimary2} />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            color: Color.textPrimary2,
            textAlign: 'center',
          }}>
          {children}
        </Text>
      </View>

      {/* Icon bên phải (nếu có) */}
      {rightIconVisible ? (
        <TouchableOpacity
          style={{ paddingLeft: 12 }}
          onPress={onRightPress}>
          <Icon name={rightIconName} size={22} color={Color.textPrimary2} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 22 }} /> // giữ layout cân đối khi icon ẩn
      )}
    </View>
  );
};

export default Header;
