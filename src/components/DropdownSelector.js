// import React from "react";
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     StyleSheet,
// } from "react-native";
// import Button from "./Button";
// import { useSelector } from "react-redux";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const DropdownSelector = ({
//     label,
//     data,
//     currentSelected,
//     onChangeSelected,
//     isShow,
//     setIsShow,
//     excludeItemName = null,
// }) => {
//     const Color = useSelector((state) => state.SystemReducer.theme);
//     return (
//         <View style={{ zIndex: 100, gap: 6, position: "relative", paddingBottom: 8 }}>
//             <View style={{ justifyContent: "center", paddingHorizontal: 5 }}>
//                 <Text>{label}</Text>
//             </View>
//             <View>
//                 <View
//                     style={{
//                         backgroundColor: Color.gray,
//                         borderRadius: 5,
//                         paddingHorizontal: 5,
//                         paddingVertical: 10,
//                         marginHorizontal: 5,
//                     }}
//                 >
//                     <Button
//                         style={{
//                             alignItems: "center",
//                             flexDirection: "row",
//                         }}
//                         nextScreen={() => setIsShow(!isShow)}
//                     >
//                         <View style={{ flex: 1, backgroundColor: Color.gray, }}>
//                             <Text
//                                 style={{
//                                     color:
//                                         currentSelected?.code_nm === "Chọn giới hạn OT"
//                                             ? "#B2B2B2"
//                                             : null,
//                                 }}
//                             >
//                                 {currentSelected?.code_nm ?? "Chọn giá trị"}
//                             </Text>
//                         </View>
//                         <Icon name={"chevron-down"} color={Color.mainColor} size={24} />
//                     </Button>

//                     {isShow && (
//                         <View
//                             style={{
//                                 position: "absolute",
//                                 top: "100%",
//                                 left: 0,
//                                 right: 0,
//                                 zIndex: 1000,
//                                 marginTop: 5,
//                                 backgroundColor: Color.gray,
//                                 borderRadius: 6,
//                                 padding: 8,
//                             }}
//                         >
//                             <ScrollView style={{ maxHeight: 150 }}>
//                                 {data
//                                     .filter((item) =>
//                                         excludeItemName ? item.code_nm !== excludeItemName : true
//                                     )
//                                     .map((item, index) => (
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 setIsShow(false);
//                                                 onChangeSelected(item);
//                                             }}
//                                             key={index.toString()}
//                                             style={{
//                                                 flexDirection: "row",
//                                                 justifyContent: "center",
//                                                 alignItems: "center",
//                                                 padding: 10,
//                                                 backgroundColor: "white",
//                                                 borderRadius: 6,
//                                                 marginBottom: 5,
//                                             }}
//                                         >
//                                             <Text
//                                                 style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}
//                                                 numberOfLines={1}
//                                             >
//                                                 {item.code_nm}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     ))}
//                             </ScrollView>
//                         </View>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default DropdownSelector;
import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Button from "./Button";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DropdownSelector = ({
    label,
    data,
    currentSelected = { code_nm: "Chọn giá trị", code: "" },
    onChangeSelected = () => { },
    isShow = false,
    setIsShow = () => { },
    excludeItemName = null,
}) => {
    const Color = useSelector((state) => state.SystemReducer.theme);

    return (
        <View style={{ zIndex: 100, gap: 6, position: "relative", paddingBottom: 8 }}>
            <View style={{ justifyContent: "center", paddingHorizontal: 5 }}>
                <Text>{label}</Text>
            </View>

            <View>
                <View
                    style={{
                        backgroundColor: Color.gray,
                        borderRadius: 6,
                        paddingHorizontal: 5,
                        paddingVertical: 8,
                        marginHorizontal: 3,
                    }}
                >
                    <Button
                        style={{
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                        nextScreen={() => setIsShow(!isShow)}
                    >
                        <View style={{ flex: 1, backgroundColor: Color.gray }}>
                            <Text
                                style={{
                                    color:
                                        currentSelected?.code_nm === "Chọn giới hạn OT"
                                            ? "#B2B2B2"
                                            : null,
                                }}
                            >
                                {currentSelected?.code_nm ?? "Chọn giá trị"}
                            </Text>
                        </View>
                        <Icon name={"chevron-down"} color={Color.mainColor} size={24} />
                    </Button>

                    {isShow && (
                        <View
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 1000,
                                marginTop: 5,
                                backgroundColor: Color.gray,
                                borderRadius: 6,
                                padding: 8,
                            }}
                        >
                            <ScrollView style={{ maxHeight: 150 }}>
                                {data
                                    .filter((item) =>
                                        excludeItemName ? item.code_nm !== excludeItemName : true
                                    )
                                    .map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsShow(false);
                                                onChangeSelected(item);
                                            }}
                                            key={index.toString()}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 10,
                                                backgroundColor: "white",
                                                borderRadius: 6,
                                                marginBottom: 5,
                                            }}
                                        >
                                            <Text
                                                style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}
                                                numberOfLines={1}
                                            >
                                                {item.code_nm}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default DropdownSelector;
