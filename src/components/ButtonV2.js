import React from 'react';
import { TouchableOpacity } from 'react-native';
import { default as Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import Text from './Text';

const ButtonV2 = ({
    title,
    icon,
    backgroundColor = 'white',
    borderColor,
    onPress,
    status_val,
    borderRadius = 8,
    textColor = 'white',
    padding = 8,
    size = 16,
    fontFamily = 'Roboto-Medium',
    fontWeight = '700',
    sizeIcon = 18,
    disabled = false, // Thêm prop disabled
}) => {
    const Color = useSelector((state) => state.SystemReducer.theme);

    // Conditionally change the title based on status_val
    const buttonText = status_val === '2' ? 'Xem hợp đồng' : title;

    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : null} // Ngăn chặn click nếu disabled
            style={{
                flex: 1,
                backgroundColor: backgroundColor, // Màu nền xám khi bị disabled
                flexDirection: "row",
                alignItems: "center",
                padding: padding,
                borderRadius: borderRadius,
                justifyContent: 'center',
                borderWidth: borderColor ? 1 : 0,
                borderColor: (borderColor || 'transparent'), // Viền nhạt khi disabled
                opacity: disabled ? 0.6 : 1, // Làm mờ button khi disabled
            }}
            disabled={disabled} // Disable tương tác
        >
            {icon && (
                <Icon
                    name={icon}
                    size={sizeIcon}
                    color={textColor} // Màu icon mờ khi disabled
                    style={{ marginRight: 4 }}
                />
            )}

            <Text
                size={size}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                color={textColor} // Màu chữ mờ khi disabled
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonV2;
