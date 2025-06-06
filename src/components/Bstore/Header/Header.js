import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
// import Icon_back from '../../icons/Back';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ({ children, goBack = null }) => {
  const Color = useSelector(s => s.SystemReducer.theme);
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '10%',
        justifyContentL: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 40,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        zIndex: 10,

      }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: '5%',
          flex: 0,
        }}
        onPress={async () => await goBack()}>
        <Icon
          name="arrow-left"
          size={24}
          color={Color.textPrimary2}
        />
        {/* <Icon_back color={null} /> */}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            flex: 1,
            fontSize: 16,
            color: Color.textPrimary2,
            textAlign: 'center',
          }}>
          {children}
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 0,
          }}>
          {/* <Icon_back color={null} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
