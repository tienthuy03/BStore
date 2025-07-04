import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';

const ButtonGradient = ({
  onPress,
  style,
  textStyle,
  children,
  icon,
  iconColor = Color.white,
  iconSize = 18,
  colors = [Color.mainColor, Color.mainColor3],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      style={[styles.touchable, style, disabled && styles.disabled]}
      disabled={disabled}
      {...rest}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[styles.gradient, disabled && styles.disabledGradient]}
      >
        {icon && (
          <Icon name={icon} size={iconSize} color={iconColor} style={{ marginRight: 8 }} />
        )}
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  text: {
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledGradient: {
    // Optional: custom style for disabled gradient
  },
});

export default ButtonGradient; 