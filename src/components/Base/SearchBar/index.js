import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({ value, onChange }) => {
    const Color = useSelector((s) => s.SystemReducer.theme);

    return (
        <View style={styles.container}>

            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={"Tìm kiếm"}
                placeholderTextColor={Color.textPrimary2}
                style={[styles.input, { backgroundColor: Color.white }]}
                keyboardType="default"
            />
            <Icon name={"magnify"} size={24} color={Color.textPrimary3} style={styles.searchIcon} />
            {value?.length > 0 && (
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => onChange("")}
                >
                    <Icon name="close" size={20} color={Color.textPrimary3} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: '55%',
        transform: [{ translateY: -10 }],
    },
    input: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 10 : 6,
        marginTop: 5,
        borderRadius: 8,
        height: 48,
        paddingLeft: 40, // Để dành không gian cho icon search
        paddingRight: 40, // Để dành không gian cho nút clear
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
});

export default SearchBar;
