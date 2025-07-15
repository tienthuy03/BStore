import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const height = 62;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <LinearGradient
      colors={['#FA812F', '#FF5E62']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.tabWrapper}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconName = {
            Dashboard: 'view-grid-outline',
            Noti: 'bell',
            Home: 'store',
            System: 'account',
            Envoice: 'receipt',
          }[route.name];

          const label = {
            Dashboard: 'Tổng hợp',
            Noti: 'Thông báo',
            Home: 'Cửa hàng',
            System: 'Tài khoản',
            Envoice: 'Hoá đơn',
          }[route.name] || route.name;

          const color = isFocused ? '#fff' : 'rgba(255,255,255,0.6)';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Icon name={iconName} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    marginTop: 2,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width,
    height,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
