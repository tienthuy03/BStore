// GradientButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GradientButton = ({
  onPress,
  title = 'Button',
  icon = 'cart-outline',
  iconColor = '#fff',
  style,
  textStyle,
  iconSize = 20,
  gradientColors = ['#FF7A00', '#FF5E62'],
  ...props
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.buttonWrapper, style]} {...props}>
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.content}>
        {icon && <Icon name={icon} size={iconSize} color={iconColor} style={styles.icon} />}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
    width: '100%'
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Thêm dòng này
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GradientButton;