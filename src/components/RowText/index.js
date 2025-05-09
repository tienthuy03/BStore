import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RowText = ({ text, iconName, iconSize = 20, iconColor = '#000', textStyle = {}, containerStyle = {} }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {iconName && (
                <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
            )}
            <Text numberOfLines={1} style={[styles.text, textStyle]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    icon: {
        marginRight: 4, // Khoảng cách giữa icon và text
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
});

export default RowText;
