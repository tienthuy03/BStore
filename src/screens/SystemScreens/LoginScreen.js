
import messaging from "@react-native-firebase/messaging";
import md5 from "md5";
import React, { useEffect, useState, useRef } from "react";
import {
  Alert, StatusBar, StyleSheet, View, Platform, Image, Dimensions, Animated,
  Keyboard, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity,
} from "react-native";
import DefaultPreference from "react-native-default-preference";
import RNRestart from "react-native-restart";
import TouchID from "react-native-touch-id";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginAction } from "../../actions";
import { CLEAR_USER } from "../../actions/actionType";
import Block from "../../components/Block.js";
import Button from "../../components/Button.js";
import Text from "../../components/Text.js";
import TextInput from "../../components/TextInput.js";
import TVSButton from "../../components/Tvs/Button";
import { APP_VERSION, buildFor } from "../../config/Pro";
import { deviceId } from "../../constants/index";
import EyeClose from "../../icons/EyeClose";
import EyeOpen from "../../icons/EyeOpen";
import Icon_face from "../../icons/Face";
import Icon_finger from "../../icons/Finger";
import Icon_pass from "../../icons/Password";
import Icon_user from "../../icons/User";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { updateUserAction } from "../../actions";
import sysFetch from "../../services/fetch_crypt";
import TVSControlPopup from "../../components/Tvs/ControlPopup2";
import Swiper from "react-native-swiper";
import { Linking } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NetInfo from "@react-native-community/netinfo";
import ShowError from "../../services/errors";
import AsyncStorage from "@react-native-community/async-storage";
import ButtonV2 from "../../components/ButtonV2.js";

const LoginScreen = ({ navigation, reloadConfig }) => {
  //get infor ClientId from AsyncStorage
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const savedClientId = await AsyncStorage.getItem('CLIENT_ID');
      setClientId(savedClientId);
    };
    fetchData();
  }, []);

  const [banner, setBanner] = useState(10);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [checkUpdateVersion, setCheckUpdateVersion] = useState("N");
  const Color = useSelector((s) => s.SystemReducer.theme);
  const state = useSelector((s) => s.loginReducers);
  const API = useSelector((state) => state.SysConfigReducer.API_URL);

  const dispatch = useDispatch();
  let thr_emp_pk;
  let tokenLogin;
  let device_id;
  let results;
  let errorData;
  let loadings;
  let login_status;
  let fullnames;
  let userPk;
  let refreshToken;
  let crt_by;
  try {
    loadings = state.isLoading;
    results = state.data.results;
    errorData = state.data.errorData;
    tokenLogin = state.data.data.tokenLogin;
    thr_emp_pk = state.data.data.thr_emp_pk;
    fullnames = state.data.data.full_name;
    device_id = state.data.data.device_id;
    login_status = state.data.data.login_status;
    userPk = state.data.data.tes_user_pk;
    refreshToken = state.data.data.refreshToken;
    crt_by = state.data.data.crt_by;
    // console.log("LoginScreen", state.data.data);
  } catch (error) {
    console.log(error);
  }
  //create state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullName] = useState("");
  const [valueAuthen, setValueAuthen] = useState("");
  const [modalPass, setModalPass] = useState(false);
  const [passwords, setPasswords] = useState("");

  //Khởi tạo biến để lưu yêu cầu đăng nhập nhanh
  const [temp, setTemp] = useState("");
  const [finger, setFinger] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [typeAuthen, setTypeAuthen] = useState("");
  const [eye, setEye] = useState(true);
  //REF
  const passwordRef = useRef(null);
  const [modalVisibleHelping, setModalVisibleHelping] = useState(false);
  const [status, setStatus] = useState(false);

  const checkVersionUpdate = () => {
    if (Platform.OS === "android") {
      Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.tinvietsoft.tvs"
      );
    } else {
      Linking.openURL(
        "https://apps.apple.com/vn/app/time365/id1585777072?l=vi"
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    //random number
    DefaultPreference.getAll().then(function (valueAll) {
      //Khởi tạo biến để lưu yêu cầu đăng nhập nhanh
      setTemp(valueAll.temp);
      setFinger(valueAll.status);
      setUsername(valueAll.username);
      setPass(valueAll.password);
      setUser(valueAll.username);
      setfullName(valueAll.fullname);
      setTypeAuthen(valueAll.nameAuthen);
      setBanner(Math.floor(Math.random() * 9));

      if (valueAll.logout == "false") {
        checkValidToken(valueAll.API, valueAll.username, valueAll.tokenLogin);
      }
    });
  }, []);

  const checkValidToken = (api, username, token) => {
    sysFetch(
      api,
      {
        pro: "STV_HR_SEL_MBI_CHKTOKEN_1_100",
        in_par: {
          p1_varchar2: username,
          p2_varchar2: APP_VERSION,
        },
        out_par: {
          p1_sys: "pwd",
          p2_sys: "flag",
        },
      },
      token
    )
      .then((res) => {
        console.log("Check valid token", res);
        if (res == "Token Expired") {
          console.log("Expired token");
          // refreshNewToken("checkValidToken", api, username, token);
        }
        if (res != "Token Expired") {
          setCheckUpdateVersion(res.data.flag[0].flag_upd);
          if (res.data.flag[0].flag_upd == "Y") {
            Alert.alert("Thông báo", "Cập nhật phiên bản mới?", [
              { text: "Xác nhận", onPress: () => checkVersionUpdate() },
            ]);
          } else {
            dispatch(
              fetchLoginAction({
                username: username,
                password: res.data.pwd[0].user_pw,
                machine_id: deviceId,
              })
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const optionalConfigObject = {
    title: "Quét vân tay",
    imageColor: Color.red,
    imageErrorColor: Color.red,
    sensorDescription: "Fingerprint",
    sensorErrorDescription: "Failed",
    cancelText: "Cancel",
    fallbackLabel: "Show Passcode",
    unifiedErrors: false,
    passcodeFallback: false,
  };

  const dialogError = (text) => {
    Alert.alert(
      "Thông báo",
      text,
      [
        {
          text: "Đóng",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    if (loadings === false && results === "S") {
      if (login_status === "0") {
        navigation.navigate("UpdatePass", { password });
      } else if (login_status !== 0) {
        getTokens(thr_emp_pk, device_id, crt_by);
        // DefaultPreference.set('username', username);
        TouchID.isSupported(optionalConfigObject)
          .then((biometryType) => {
            // Success code
            if (biometryType === "FaceID") {
              DefaultPreference.set("nameAuthen", "face_id");
            } else if (biometryType === "TouchID") {
              DefaultPreference.set("nameAuthen", "touch_id");
            } else if (biometryType == true) {
              DefaultPreference.set("nameAuthen", "finger_print");
            } else {
              DefaultPreference.set("nameAuthen", "0");
            }
          })
          .catch(() => {

          });
        navigation.replace("Index");
      }
    } else if (loadings === false && results === "F") {
      dispatch({ type: CLEAR_USER });
      if (
        errorData ==
        "Tài khoản hoặc mật khẩu không đúng. Có thể bạn chưa cấu hình đúng máy chủ của ứng dụng. Vui lòng liên hệ bộ phận quản trị nhân sự của bạn để được cung cấp thông tin."
      ) {
        Alert.alert("Thông báo", errorData, [
          {
            text: "Đóng",
            style: "cancel",
          },
          {
            text: "Cấu hình",
            onPress: async () => {
              const rs = await AsyncStorage.getItem("themeName");

              if (rs) {
                await AsyncStorage.setItem("oldTheme", rs.toString());
                await AsyncStorage.removeItem("themeName");
                await RNRestart.Restart();
              }
            },
          },
        ]);
      } else {
        dialogError(errorData);
      }
    }
  }, [results]);

  const refreshNewToken = (obj, p1, p2, p3, p_crt_by) => {
    axios
      .post(API + "User/RefreshToken/", {
        token: tokenLogin,
        userPk: userPk,
        refreshToken: refreshToken,
      })
      .then((response) => {
        dispatch(
          updateUserAction({
            index: 0,
            value: response.data.token,
            key: "tokenLogin",
          })
        );
        dispatch(
          updateUserAction({
            index: 0,
            value: response.data.refreshToken,
            key: "refreshToken",
          })
        );
        tokenLogin = response.data.token;
        refreshToken = response.data.refreshToken;
        if (obj == "getTokens") {
          getTokens(p1, p2, p_crt_by);
        }
        if (obj == "checkValidToken") {
          checkValidToken(p1, p2, p3);
        }
      })
      .catch((error) => {
        if (error == "AxiosError: Request failed with status code 400") {
          Alert.alert(
            "Thông báo",
            "Phiên bản làm việc đã hết hạn. Vui lòng đăng nhập lại hệ thống",
            [
              {
                text: "Đóng",
                onPress: () => {
                  RNRestart.Restart();
                },
              },
            ],
            { cancelable: true }
          );
        }
        console.log(error);
      });
  };

  function _pressHandler() {
    TouchID.authenticate("", optionalConfigObject)
      .then(() => {
        setPassword(pass);
        validateLogin(user, pass);
      })
      .catch(() => {
        Alert.alert("Xác nhận vân tay không thành công");
      });
  }

  async function getTokens(p_thr_emp_pk, device_id, p_crt_by) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Notification permission granted.');
      // ⚠️ XÓA TOKEN CŨ & LẤY TOKEN MỚI
      await messaging().deleteToken();
      const fcmToken = await messaging().getToken();
      console.log("FCM Token (new): ", fcmToken);
      if (fcmToken) {
        if (device_id !== fcmToken) {
          const action = "UPDATE";
          const  in_par = {
            p1_varchar2: action,
            p2_varchar2: p_thr_emp_pk,
            p3_varchar2: fcmToken,
            p4_varchar2: p_crt_by
          };
          sysFetch(
            API,
            {
              pro: "STV_HR_UPD_MBI_DEVICE_0_100",
              in_par:  in_par,
              out_par: {
                p1_varchar2: "update_device",
              },
            },
            tokenLogin
          )
            .then((rs) => {
              if (rs == "Token Expired") {
                refreshNewToken("getTokens", p_thr_emp_pk, device_id, p_crt_by);
              } else {
                // console.log("in_par", in_par);
                console.log("Token res", rs);
              }
            })
            .catch((error) => {
              console.log("Token error", error);
            });
        }
      } else {
        console.log('Không thể lấy FCM Token.');
      }
    } else {
      console.log('Người dùng chưa cho phép thông báo.');
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getTokens();
    }
  }, []);

  function setViewss() {
    if (finger === "1" || finger === "11") {
      return (
        <TextInput
          size={14}
          flex
          height={42}
          paddingLeft={12}
          editable={false}
          value={user}
          placeholder={"Tài khoản"}
          color={Color.textPrimary2}
          placeholderTextColor={Color.grayPlahoder}
          onChangeText={(username) => setUsername(username)}
          returnKeyType="done"
          blurOnSubmit={false}
          style={styles.input}
        />
      );
    } else {
      return (
        <TextInput
          flex
          size={14}
          height={42}
          paddingLeft={12}
          value={username}
          placeholder={"Tài khoản"}
          color={Color.textPrimary2}
          placeholderTextColor={Color.grayPlahoder}
          onChangeText={(username) => setUsername(username)}
          returnKeyType="done"
          blurOnSubmit={false}
          style={styles.input}
        />
      );
    }
  }
  function setFingers(types) {
    if (finger === "1") {
      if (types === "face_id") {
        return (
          <Button center radius={6} nextScreen={() => _pressHandler()} style={styles.biometricButton}>
            <Icon_face style={{ marginRight: 20 }} />
          </Button>
        );
      } else if (types === "touch_id") {
        return (
          <Button
            center
            radius={6}
            height={48}
            nextScreen={() => _pressHandler()}
            style={styles.biometricButton}
          >
            <Icon_finger style={{ width: 50, height: 50, marginRight: 20 }} />
          </Button>
        );
      } else if (types === "finger_print") {
        return (
          <Button
            center
            radius={6}
            height={48}
            nextScreen={() => _pressHandler()}
            style={styles.biometricButton}
          >
            <Icon_finger style={{ padding: 15 }} />
          </Button>
        );
      }
    } else {
      return <Block />;
    }
  }

  function deleteDataUser() {
    DefaultPreference.clearAll();
    setTimeout(() => {
      navigation.push("LoginScreen");
    }, 1000);
  }
  //Thoat tai khoan
  function logoutAppss() {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn thoát tài khoản?",
      [
        { text: "Có", onPress: () => deleteDataUser() },
        {
          text: "Không",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  //Valifate form login
  const validateLogin = async (usernames, passwords) => {
    if (checkUpdateVersion == "Y") {
      Alert.alert("Thông báo", "Cập nhật phiên bản mới?", [
        { text: "Xác nhận", onPress: () => checkVersionUpdate() },
      ]);
    } else {
      if (usernames === undefined) {
        dialogError("Vui lòng nhập tên đăng nhập!");
        return;
      }
      if (passwords === "") {
        dialogError("Vui lòng nhập mật khẩu!");
        return;
      }
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          if (statusAPI) {
            let pass_md5 = md5(passwords);
            DefaultPreference.set("passwords", passwords);
            DefaultPreference.set("pass_md5", pass_md5);
            setTimeout(async () => {
              await dispatch(
                fetchLoginAction({
                  username: username,
                  password: pass_md5,
                  machine_id: deviceId,
                })
              );
            }, 200);
          } else {
            Alert.alert(
              "Thông báo",
              "Thiết bị của bạn không kết nối được với máy chủ. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ với quản trị.",
              [{ text: "Xác nhận", onPress: () => { } }]
            );
          }
        } else {
          ShowError("No internet");
        }
      });
    }
  };
  const [urlAPIPing, setUrlAPIPing] = useState("");
  const [statusAPI, setStatusAPI] = useState("");
  useEffect(() => {
    console.log(API);
    setUrlAPIPing(API.split("/")[0] + "//" + API.split("/")[2]);
    const fetchData = async () => {
      try {
        console.log(API.split("/")[0] + "//" + API.split("/")[2]);
        const rs = await fetch(API.split("/")[0] + "//" + API.split("/")[2])
          .then((response) => {
            if (response.status === 200) {
              setStatusAPI(true);
            } else {
              setStatusAPI(false);
            }
          })
          .catch((error) => {
            console.error("network error: 00000 " + error);
            setStatusAPI(false);
          });
      } catch (error) {
        console.error("network error: 1111 " + error);
        setStatusAPI(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [API]);
  const [modalVisibleCloudConnect, setModalVisibleCloudConnect] =
    useState(false);
  const showInfoConnect = () => {
    setModalVisibleCloudConnect(true);
  };

  const modalCloudConnect = (
    <TVSControlPopup
      title={"Thông tin Server"}
      isShow={modalVisibleCloudConnect}
      minHeight={200}
      onHide={() => setModalVisibleCloudConnect(false)}
      bottom={
        <TVSButton
          type={"danger"}
          icon={"close"}
          buttonStyle={"3"}
          onPress={() => setModalVisibleCloudConnect(false)}
        >
          Đóng lại
        </TVSButton>
      }
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingLeft: 10, paddingTop: 10 }}>
          <Text fontFamily={'Roboto-Medium'} size={16} marginBottom={8}>
            Tình trạng kết nối
          </Text>
        </View>

        {statusAPI ? (
          <View
            style={{
              paddingLeft: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={"cloud-check-outline"}
              size={24}
              color={"green"}
            />
            <Text fontFamily={'Roboto-Bold'} size={16} paddingLeft={8}>Đã kết nối</Text>
          </View>
        ) : (
          <View
            style={{
              paddingLeft: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name={"cloud-off-outline"}
              size={20}
              color={"red"}
            />
            <Text style={{ marginLeft: 10, color: "red", fontFamily: 'Roboto-Bold', marginBottom: 8 }}>Không kết nối</Text>
          </View>
        )}
        <Text style={{ paddingLeft: 10, paddingTop: 10, fontSize: 16, fontFamily: "Roboto-Medium" }}>
          Khách hàng: <Text fontFamily={"Roboto-Bold"} color={Color.mainColor}>{clientId}</Text>
        </Text>
      </View>
    </TVSControlPopup>
  );

  const modalHelping = (
    <TVSControlPopup
      title={"Trợ giúp đăng nhập"}
      isShow={modalVisibleHelping}
      minHeight={600}
      onHide={() => setModalVisibleHelping(false)}
      bottom={
        <TVSButton
          type={"danger"}
          icon={"close"}
          buttonStyle={"3"}
          onPress={() => setModalVisibleHelping(false)}
        >
          Đóng lại
        </TVSButton>
      }
    >
      <View style={{ flex: 1 }}>
        <Swiper style={{}} showsButtons={true}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: Color.mainColor, fontSize: 16 }}>
                Thử cấu hình và đăng nhập lại
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                Liên hệ người quản trị để được cung cấp QR Code hoặc Mã khách
                hàng và Mã xác nhận
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={{
                  width: "80%",
                  height: "100%",
                  position: "static",
                  resizeMethod: "resize",
                  left: 0,
                  top: 0,
                }}
                source={require("../../assets/images/screen_config.png")}
              ></Image>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: Color.mainColor, fontSize: 16 }}>
                Kiểm tra số phiên bản phần mềm
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                Nếu chưa phải phiên bản mới nhất vui lòng truy cập vào AppStore
                hoặc ChPlay để cập nhật ứng dụng.
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={{
                  width: "80%",
                  height: "100%",
                  position: "static",
                  resizeMethod: "resize",
                  left: 0,
                  top: 0,
                }}
                source={require("../../assets/images/screen_login.png")}
              ></Image>
            </View>
          </View>
        </Swiper>
      </View>
    </TVSControlPopup>
  );

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: isKeyboardVisible ? 0 : 50,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardVisible]);

  const modalPasss = (
    <TVSControlPopup
      title={
        valueAuthen === "face_id"
          ? "Đăng nhập bằng khuôn mặt"
          : "Đăng nhập bằng vân tay"
      }
      isShow={modalPass}
      onHide={() => {
        setModalPass(false);
        setPassword("");
      }}
      onAccept={save}
    >
      <View>
        <Text
          style={{
            marginBottom: 5,
          }}
        >
          Xác nhận mật khẩu
        </Text>
      </View>
      <Block
        paddingLeft={20}
        radius={8}
        margin={5}
        alignCenter
        backgroundColor={Color.gray}
        row
        style={styles.inputContainer}
      >
        <MaterialCommunityIcons
          name="account-lock-outline"
          size={20}
          style={{ marginLeft: 5, color: Color.mainColor }}
        />
        <TextInput
          flex
          height={55}
          paddingLeft={15}
          placeholder={"Mật khẩu"}
          autoCompleteType={"password"}
          placeholderTextColor={Color.grayPlahoder}
          secureTextEntry={true}
          value={passwords}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
        />
      </Block>
    </TVSControlPopup>
  );

  function save() {
    const pass_md5 = md5(passwords);
    if (status === false) {
      if (pass_md5 === pass) {
        DefaultPreference.set("password", passwords);
        DefaultPreference.set("status", "1");
        DefaultPreference.set("nameAuthen", valueAuthen);
        setStatus(true);
        setPassword("");
        setModalPass(false);
      } else if (pass !== pass_md5) {
        Alert.alert("Mật khẩu không trùng khớp!");
      }
    } else if (status === true) {
      if (pass_md5 === pass) {
        DefaultPreference.set("status", "11");
        DefaultPreference.set("nameAuthen", valueAuthen);
        setStatus(false);
        setModalPass(false);
        setPassword("");
      } else if (pass !== pass_md5) {
        Alert.alert("Mật khẩu không trùng khớp!");
      }
    }
  }

  return (
    <Block flex backgroundColor={"#F4F6FF"}>
      <SafeAreaView>
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle="light-content"
        />
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Logo at the top */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              showInfoConnect();
            }}
            style={styles.connectionIcon}
          >
            {statusAPI ? (
              <MaterialCommunityIcons
                name={"cloud-check-outline"}
                size={30}
                color={"green"}
              />
            ) : (
              <MaterialCommunityIcons
                name={"cloud-off-outline"}
                size={30}
                color={"red"}
              />
            )}
          </TouchableOpacity> */}

          <View style={styles.headerContainer}>
            <Text
              color={Color.textPrimary2}
              size={16}
              fontFamily={"Roboto-Bold"}
            >
              Đăng nhập với tài khoản của bạn
            </Text>
          </View>

          <View style={styles.labelContainer}>
            <Text color={Color.textPrimary3} fontFamily={"Roboto-Medium"}>
              Tài khoản
            </Text>
          </View>

          <Block
            marginHorizontal={16}
            paddingLeft={20}
            paddingRight={10}
            alignCenter
            row
            style={styles.inputContainer}
          >
            <Icon_user />
            {setViewss()}
          </Block>

          <View style={styles.labelContainer}>
            <Text color={Color.textPrimary3} fontFamily={"Roboto-Medium"}>
              Mật khẩu
            </Text>
          </View>

          <Block
            marginHorizontal={16}
            paddingLeft={20}
            paddingRight={10}
            alignCenter
            row
            style={styles.inputContainer}
          >
            <Icon_pass />
            <TextInput
              size={14}
              flex
              height={42}
              paddingLeft={12}
              placeholder={"Mật khẩu"}
              autoCompleteType={"password"}
              color={Color.textPrimary2}
              placeholderTextColor={Color.grayPlahoder}
              secureTextEntry={eye}
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => validateLogin(username, password)}
              ref={passwordRef}
              style={styles.input}
            />
            <Button
              justifyCenter
              height={30}
              width={30}
              nextScreen={() => setEye(!eye)}
            >
              {eye ? <EyeOpen /> : <EyeClose />}
            </Button>
          </Block>

          <Block
            row
            justifyContent={"space-between"}
            marginTop={10}
            marginHorizontal={20}
          >
            {finger === "1" || finger === "11" ? (
              <Button nextScreen={() => logoutAppss()}>
                <Text color={Color.mainColor}>Thoát tài khoản!</Text>
              </Button>
            ) : (
              <Button nextScreen={() => setModalVisibleHelping(true)}>
                <Text fontFamily={"Roboto-Medium"} color={Color.textPrimary2}>Trợ giúp!</Text>
              </Button>
            )}
            <Button
              nextScreen={() =>
                navigation.navigate("ForgotPass", { users: username })
              }
            >
              <Text fontFamily={"Roboto-Medium"} color={Color.textPrimary2}>Quên mật khẩu?</Text>
            </Button>
          </Block>

          <View style={styles.loginButtonContainer}>

            <ButtonV2
              title="Đăng nhập"
              backgroundColor={Color.mainColor}
              borderRadius={8}
              textColor="#ffffff"
              fontFamily="Roboto-Medium"
              fontWeight="500"
              padding={10}
              onPress={() => validateLogin(username, password)}
            />
            {setFingers(typeAuthen)}
          </View>

          <View style={styles.footerContainer}>
            {buildFor === "tvs" && (
              <View style={styles.configButtonContainer}>
                {finger !== "1" && finger !== "11" ? (
                  <>
                    <Button
                      nextScreen={async () => {
                        const rs = await AsyncStorage.getItem("themeName");

                        if (rs) {
                          await AsyncStorage.setItem(
                            "oldTheme",
                            rs.toString()
                          );
                          await AsyncStorage.removeItem("themeName");
                          await RNRestart.Restart();
                        }
                      }}
                      style={styles.configButton}
                    >
                      <Text
                        borderRadius={5}
                        borderColor={Color.secondaryColor}
                        color={Color.textPrimary3}
                        padding={8}
                        fontFamily={"Roboto-Medium"}
                      >
                        Chưa có tài khoản?
                      </Text>
                      <Text
                        borderRadius={5}
                        borderColor={Color.secondaryColor}
                        color={Color.mainColor}
                        fontFamily={"Roboto-Bold"}
                      >
                        Đăng ký
                      </Text>
                    </Button>
                  </>
                ) : (
                  <View></View>
                )}
              </View>
            )}
            <View style={styles.versionContainer}>
              <Text>Phiên bản {APP_VERSION}</Text>
            </View>
          </View>
          {/* </Animated.View> */}
        </View>
      </TouchableWithoutFeedback>
      {modalHelping}
      {modalCloudConnect}
      {modalPasss}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#F4F6FF",
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logo: {
    marginTop: 32,
    width: 300,
    height: 160,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  labelContainer: {
    marginLeft: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  input: {
    borderRadius: 8,
  },
  loginButtonContainer: {
    paddingHorizontal: 16,
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  biometricButton: {
    marginLeft: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  configButtonContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 10,
  },
  configButton: {
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
    // borderRadius: 8,
    // marginBottom: 10,
    flexDirection: 'row'
  },
  versionContainer: {
    flex: 1,
    marginVertical: 10,
  },
  connectionIcon: {
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    right: 20,
    paddingTop: 10,
    zIndex: 100,
  },
});

export default LoginScreen;
