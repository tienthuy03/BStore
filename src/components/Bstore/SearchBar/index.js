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
import { Color } from '../../../colors/colortv';

const SearchBar = ({ value, onChange }) => {
    const Color = useSelector((s) => s.SystemReducer.theme);
    return (
        <View style={[styles.container,]}>

            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={"Tìm kiếm"}
                placeholderTextColor={Color.textPrimary2}
                style={[styles.input, { backgroundColor: Color.gray }]}
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
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: 24,
        top: '55%',
        transform: [{ translateY: -10 }],
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        padding: Platform.OS === 'ios' ? 10 : 6,
        marginTop: 5,
        borderRadius: 100,
        height: 42,
        paddingLeft: 40,
        fontFamily: 'Roboto-Regular',
        color: Color.textPrimary2,
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
});

export default SearchBar;
