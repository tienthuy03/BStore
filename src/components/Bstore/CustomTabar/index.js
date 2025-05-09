import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const height = 62;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const middleIndex = Math.floor(state.routes.length / 2);

  return (
    <View style={styles.container}>
      {/* SVG với lõm giữa */}
      <Svg width={width} height={height} style={styles.svg}>
        <Defs>
          <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FA812F" />
            <Stop offset="100%" stopColor="#FF5E62" />
          </SvgGradient>
        </Defs>
        <Path
          fill="url(#grad)"
          d={`
            M0 0 
            H${width / 2 - 45} 
            C${width / 2 - 30} 0, ${width / 2 - 30} 30, ${width / 2} 30 
            C${width / 2 + 30} 30, ${width / 2 + 30} 0, ${width / 2 + 45} 0 
            H${width} V${height} H0 Z
          `}
        />
      </Svg>

      {/* Icon giữa nổi lên */}
      <TouchableOpacity
        onPress={() => navigation.navigate(state.routes[middleIndex].name)}
        style={styles.middleButton}
        activeOpacity={0.9}
      >
        <LinearGradient colors={['#FA812F', '#FF5E62']} style={styles.middleInner}>
          <Icon name="magnify" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Các tab còn lại */}
      <View style={styles.tabWrapper}>
        {state.routes.map((route, index) => {
          if (index === middleIndex) return <View key={route.key} style={{ width: 70 }} />;

          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconName = {
            Home: 'home-outline',
            Dashboard: 'calendar-month-outline',
            Noti: 'bell',
            System: 'cog-outline',
          }[route.name];

          const color = isFocused ? '#fff' : 'rgba(255,255,255,0.6)';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabButton}
            >
              <Icon name={iconName} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    // marginTop: 4,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width,
    height,
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    paddingHorizontal: 8,
    alignItems: 'center',
    height: 70,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  middleButton: {
    position: 'absolute',
    bottom: 55,
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  middleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
