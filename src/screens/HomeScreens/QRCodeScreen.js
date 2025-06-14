import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
// import Clipboard from "@react-native-community/clipboard";
const QRCode = ({ navigation }) => {
  const Color = useSelector((s) => s.SystemReducer.theme);
  const cameraRef = useRef(null);
  const tooltipRef = useRef(null);

  const [isScanning, setIsScanning] = useState(true);
  const [isShowValue, setIsShowValue] = useState(false);
  const [qrValue, setQrValue] = useState(null);

  const onSuccess = (e) => {
    setIsScanning(false);
    try {
      // console.log(e.data);
      // console.log(e.data.split("|"));
      let originData = e.data;
      setQrValue(originData);
      setIsShowValue(true);
      // if (originData.split("|").length > 0) {
      //   if (originData.split("|")[0] == "TVS") {
      //     console.log(e.data.split("|")[0]);
      //     console.log(e.data.split("|")[1]);
      //   } else {
      //   }
      // } else {
      // }

      //   navigation.navigate(e.data.split("|")[1]);
      //   checkApi(e.data.split("*|*")[0], e.data.split("*|*")[1]);
      //   setIsShow(false);
    } catch (error) {
      Alert.alert("Thông báo", "Quét mã thất bại. Xin thử lại.");
      //   setIsShow(false);
    }
    setTimeout(() => {
      setIsScanning(true);
    }, 2000);
  };
  // const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [showFocusFrame, setShowFocusFrame] = useState(false);

  const focusFrameSize = 200;
  useEffect(() => {
    if (isScanning) {
      startAnimation();
    } else {
      resetAnimation();
    }
  }, [isScanning]);
  const startAnimation = () => {
    setShowFocusFrame(true);
  };
  const resetAnimation = () => {
    setShowFocusFrame(false);
  };

  // const handleCopyPress = () => {
  //   console.log("copy");
  //   Clipboard.setString(qrValue);
  //   if (Platform.OS == "ios") {
  //     setIsShowTooltip(true);
  //     showTooltip();
  //   }
  // };
  // const showTooltip = () => {
  //   tooltipRef.current?.fadeInUp(1000);
  //   setTimeout(() => {
  //     tooltipRef.current?.fadeOutDown(1000);
  //   }, 2000);
  // };
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      {!isShowValue ? (

        <RNCamera
          ref={cameraRef}
          style={{ flex: 1 }}
          zoom={0}
          onBarCodeRead={isScanning ? onSuccess : undefined}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >

        </RNCamera>
      ) : null}
      {isShowValue ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              // backgroundColor: "#323232",
              backgroundColor: "#EBEBEB",
              marginHorizontal: 10,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#2D67F5", marginBottom: 5 }}>Văn bản</Text>
            <TextInput
              style={{ color: "black" }}
              value={qrValue}
              editable={false}
              multiline
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                // setIsShowTooltip(false);
                setIsShowValue(false);
              }}
              style={{
                backgroundColor: "#EBEBEB",
                marginLeft: 10,
                padding: 10,
                marginVertical: 10,
                borderTopStartRadius: 30,
                borderBottomStartRadius: 30,
                paddingVertical: 15,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
                //
                marginRight: 10,
                borderTopEndRadius: 30,
                borderBottomEndRadius: 30,
              }}
            >
              <Icon size={20} name={"chevron-double-down"} />

              <Text style={{ fontSize: 16, fontWeight: "700" }}>Thu gọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {!isShowValue && showFocusFrame && (
        <>
          <Animated.View
            style={[
              {
                width: focusFrameSize,
                height: focusFrameSize,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -focusFrameSize / 2,
                marginTop: -focusFrameSize / 2,
              },
              {
                // transform: [{ scaleX: scaleValue }, { scaleY: scaleValue }],
              },
              { flexDirection: "column" },
            ]}
          >
            <View style={{ flexDirection: "column", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderTopColor: "lightgray",
                    borderTopLeftRadius: 10,
                    borderTopWidth: 5,
                    borderLeftColor: "lightgray",
                    borderLeftWidth: 5,
                  }}
                ></View>
                <View
                  style={{
                    flex: 2,
                    borderTopColor: "transparent",
                    borderTopWidth: 5,
                  }}
                ></View>
                <View
                  style={{
                    flex: 1,
                    borderTopColor: "lightgray",
                    borderTopRightRadius: 10,
                    borderTopWidth: 5,
                    borderRightColor: "lightgray",
                    borderRightWidth: 5,
                  }}
                ></View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}></View>
                <View
                  style={{
                    flex: 2,
                  }}
                ></View>
                <View style={{ flex: 1 }}></View>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: "lightgray",
                    borderBottomLeftRadius: 10,
                    borderBottomWidth: 5,
                    borderLeftColor: "lightgray",
                    borderLeftWidth: 5,
                  }}
                ></View>
                <View
                  style={{
                    flex: 2,
                    borderTopColor: "transparent",
                    borderTopWidth: 5,
                  }}
                ></View>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: "lightgray",
                    borderBottomRightRadius: 10,
                    borderBottomWidth: 5,
                    borderRightColor: "lightgray",
                    borderRightWidth: 5,
                  }}
                ></View>
              </View>
            </View>
          </Animated.View>
          <View
            style={[
              {
                width: focusFrameSize,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -focusFrameSize / 2,
                marginTop: -focusFrameSize / 1.3,
                alignItems: "center",
              },
              {
                // transform: [{ scaleX: scaleValue }, { scaleY: scaleValue }],
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                padding: 16,
              }}
            >
              Hướng camera về phía QR
            </Text>
          </View>
        </>
      )}
    </>
  );
};
export default QRCode;
