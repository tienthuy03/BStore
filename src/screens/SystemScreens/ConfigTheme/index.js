"use client"

/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import {
  Alert,
  Animated,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import RNRestart from "react-native-restart"
import { useDispatch } from "react-redux"
import * as ColorHP from "../../../colors/colorhp"
import * as ColorTV from "../../../colors/colortv"
import TVSButton from "../../../components/Tvs/Button"
import { configAPI, ServerIP } from "../../../config/Pro"
import { SetApiURL } from "../../../services/redux/SysConfig/action"
import { sysLoadTheme } from "../../../services/redux/System/action"
import CaptchaComponent from "./CaptchaComponent"
import ScanQR from "./ScanQR"
// import CryptoJS from "crypto-js";
import CryptoJS from "react-native-crypto-js"
import Load from "../../../components/Loading"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ButtonV2 from "../../../components/ButtonV2"

const arr = [
  { id: "1", name: "Theme 01", color: ColorTV.Color },
  { id: "2", name: "Theme 02", color: ColorHP.Color },
]

const RegistrationScreen = ({ navigation }) => {
  const [load, setLoad] = useState(false)
  const [ClientId, setClientId] = useState("")
  const [ClientKey, setClientKey] = useState("")
  const [captchaText, setCaptchaText] = useState("")

  // New fields for registration
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSave = () => {
    // Validate username
    // if (username.length === 0) {
    //   Alert.alert("Thông báo", "Bạn chưa nhập tên đăng nhập.", [{ text: "Đóng" }])
    //   return
    // }

    // // Validate phone number
    // if (phoneNumber.length === 0) {
    //   Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại.", [{ text: "Đóng" }])
    //   return
    // }

    // // Validate password
    // if (password.length === 0) {
    //   Alert.alert("Thông báo", "Bạn chưa nhập mật khẩu.", [{ text: "Đóng" }])
    //   return
    // }

    // // Validate confirm password
    // if (confirmPassword.length === 0) {
    //   Alert.alert("Thông báo", "Bạn chưa nhập xác nhận mật khẩu.", [{ text: "Đóng" }])
    //   return
    // }

    // // Check if passwords match
    // if (password !== confirmPassword) {
    //   Alert.alert("Thông báo", "Mật khẩu và xác nhận mật khẩu không khớp.", [{ text: "Đóng" }])
    //   return
    // }

    // Original validation
    if (ClientId.length === 0) {
      Alert.alert("Thông báo", "Bạn chưa nhập Client Id.", [{ text: "Đóng" }])
      return
    }
    if (captchaText.length === 0) {
      Alert.alert("Thông báo", "Vui lòng nhập các ký tự bên trên.", [{ text: "Đóng" }])
      return
    }
    const originCaptcha = currentCaptcha
    const inputCaptcha = captchaText
    console.log(captchaText)
    console.log(currentCaptcha)
    if (originCaptcha.toLowerCase() == inputCaptcha.toLowerCase()) {
      console.log("check")
      setLoad(true)
      checkAPI(ClientId)
    } else {
      Alert.alert("Thông báo", "Các ký tự không trùng khớp vui lòng kiểm tra lại", [
        {
          text: "Đóng",
          onPress: () => {
            // setIsShow(false);
            // RNRestart.Restart();
          },
        },
      ])
    }
  }
  const checkQR = async (qrdata) => {
    console.log("qrdata ", qrdata)
    const clientId = qrdata.split("+|+")[0]
    const cryptoString = qrdata.split("+|+")[1]
    const secretKey = "tinvietsoft@1911"
    console.log("decode ", cryptoString)
    const bytes = CryptoJS.AES.decrypt(cryptoString, secretKey)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log("originalText ", originalText)

    await AsyncStorage.setItem("API_URL", originalText)
    await AsyncStorage.setItem("themeName", "1")
    await AsyncStorage.setItem("CLIENT_ID", clientId.toUpperCase())
    dispatch(SetApiURL(originalText))
    Alert.alert("Thông báo", "Cấu hình thành công.", [
      {
        text: "Đóng",
        onPress: () => {
          setIsShow(false)
          RNRestart.Restart()
        },
      },
    ])
  }
  const checkAPI = async (clientId) => {
    const rsCheck = await checkConfigAPI(clientId)
    if (rsCheck) {
      Alert.alert("Thông báo", "Đăng ký thành công.", [
        {
          text: "Đóng",
          onPress: () => {
            setIsShow(false)
            RNRestart.Restart()
          },
        },
      ])
    } else {
      //checkoffline
      const rsCheckOffline = await checkConfigAPIOffline(clientId)
      console.log("check config ", rsCheckOffline)
      if (rsCheckOffline) {
        setLoad(false)
        Alert.alert("Thông báo", "Đăng ký thành công.", [
          {
            text: "Đóng",
            onPress: () => {
              setIsShow(false)
              RNRestart.Restart()
              // navigation.replace("Index");
            },
          },
        ])
      } else {
        setLoad(false)
        Alert.alert("Thông báo", "Đăng ký thất bại.", [
          {
            text: "Đóng",
          },
        ])
      }
    }
    setLoad(false)
  }
  const checkConfigAPIOffline = (clientId) => {
    return new Promise(async (resolve) => {
      let flag = false
      configAPI.forEach(async (item) => {
        if (item.CLIENT_ID.toLowerCase() == clientId.toLowerCase()) {
          flag = true
          console.log("item ", item)
          await AsyncStorage.setItem("API_URL", item.API_NAME)
          await AsyncStorage.setItem("themeName", "1")
          await AsyncStorage.setItem("CLIENT_ID", clientId.toUpperCase())
          await AsyncStorage.setItem("CLIENT_NM", item.CLIENT_NM)
          dispatch(SetApiURL(item.API_NAME))
          resolve(true)
        }
      })
      if (flag) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }
  const checkConfigAPI = (clientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false)
      }, 10000)
      const URL = ServerIP.tvs + "User/CheckClient?clientId=" + clientId + "&clientKey="
      console.log(URL)
      axios
        .post(URL, null)
        .then(async (response) => {
          console.log("response10001", response.data)
          if (response.data.data.length > 0) {
            await AsyncStorage.setItem("API_URL", response.data.data[0].api_name)
            await AsyncStorage.setItem("themeName", response.data.data[0].theme_type)
            await AsyncStorage.setItem("CLIENT_ID", clientId.toUpperCase())
            await AsyncStorage.setItem("CLIENT_NM", response.data.data[0].client_nm)
            dispatch(SetApiURL(response.data.data[0].api_name))

            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(async (error) => {
          console.log(error)
          resolve(false)
        })
    })
  }
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    let CLIENT_ID = ""
    let API_URL = ""
    fetchData()
    async function fetchData() {
      CLIENT_ID = await AsyncStorage.getItem("CLIENT_ID")
      API_URL = await AsyncStorage.getItem("API_URL")
    }
    if (API_URL == "http://14.241.235.252:8081/api/" && CLIENT_ID == null) {
      setClientId("")
    } else if (API_URL == null && CLIENT_ID == null) {
      setClientId("")
    } else {
      setClientId(CLIENT_ID)
    }

    if (API_URL != "http://14.241.235.252:8081/api/" && CLIENT_ID == null) {
      if (configAPI != null && configAPI != []) {
        configAPI.forEach(async (item) => {
          if (item.API_NAME.toLowerCase() == API_URL.toLowerCase()) {
            console.log("item ", item)
            setClientId(item.CLIENT_ID.toUpperCase())
          }
        })
      }
    }

    AsyncStorage.getItem("firstLoadApp").then(async (rs) => {
      if (rs) {
        getTheme()
      } else {
        AsyncStorage.setItem("themeName", "1")
        AsyncStorage.setItem("API_URL", ServerIP.tvs)
        dispatch(SetApiURL(ServerIP.tvs))
        dispatch(sysLoadTheme(arr[0].color))
        AsyncStorage.setItem("firstLoadApp", "yes")
        setIsShow(true)
      }
    })
    const getTheme = async () => {
      try {
        const themeName = await AsyncStorage.getItem("themeName")
        if (!themeName) {
          setIsShow(true)
        } else {
          const tempTheme = arr.filter((i) => i.id === themeName)[0].color
          dispatch(sysLoadTheme(tempTheme))
          navigation.replace("LoginScreen")
          // navigation.replace("Index");
        }
      } catch (error) { }
    }
    return () => { }
  }, [])

  const [currentCaptcha, setCurrentCaptcha] = useState("")

  const handleCaptchaChange = (newCaptchaText) => {
    setCurrentCaptcha(newCaptchaText)
  }

  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const translation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(translation, {
      toValue: isKeyboardVisible ? -40 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [isKeyboardVisible])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      console.log("show")
      setKeyboardVisible(true) // or some other action
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      console.log("hide")

      setKeyboardVisible(false) // or some other action
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return isShow ? (
    <SafeAreaView style={styles.container}>
      <Load visible={load} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Đăng Ký Tài Khoản</Text>

        <View style={styles.formContainer}>
          {/* Username field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <View style={styles.inputContainer}>
              <Icon name="account" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholder="Nhập tên đăng nhập"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Phone number field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password field */}
          {/* <View style={styles.inputGroup}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock-check" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Client ID field (existing) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mã khách hàng</Text>
            <View style={styles.inputContainer}>
              <Icon name="card-account-details" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
              <TextInput
                value={ClientId}
                onChangeText={setClientId}
                style={styles.input}
                placeholder="Nhập mã khách hàng"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Captcha field (existing) */}
          <View>
            <Text style={styles.label}>Mã xác nhận</Text>
            <View style={styles.captchaContainer}>
              <View style={styles.captchaInputContainer}>
                <Icon name="shield-check" size={20} color={ColorTV.Color.textPrimary3} style={styles.inputIcon} />
                <TextInput
                  value={captchaText}
                  onChangeText={setCaptchaText}
                  style={styles.input}
                  placeholder="Nhập mã xác nhận"
                  placeholderTextColor="#999"
                />
              </View>
              <CaptchaComponent onCaptchaChange={handleCaptchaChange} />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <ButtonV2
              icon={"close"}
              title="Đóng"
              backgroundColor={ColorTV.Color.mainColor}
              borderRadius={8}
              textColor="#ffffff"
              fontFamily="Roboto-Medium"
              fontWeight="500"
              padding={10}
              onPress={() => {
                AsyncStorage.setItem("themeName", "1")
                RNRestart.Restart()
              }}
            />
            <ButtonV2
              icon={"check"}
              title="Đăng nhập"
              backgroundColor={ColorTV.Color.mainColor}
              borderRadius={8}
              textColor="#ffffff"
              fontFamily="Roboto-Medium"
              fontWeight="500"
              padding={10}
              onPress={onSave}
            />
          </View>

          {/* QR Scanner */}
          <View style={styles.qrContainer}>
            <ScanQR checkApi={checkQR} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={{ backgroundColor: "#01acec" }} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 140,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: ColorTV.Color.textPrimary2,
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: ColorTV.Color.textPrimary3,
    fontFamily: "Roboto-Medium"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 42,
    // paddingHorizontal: 8,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  captchaContainer: {
    flexDirection: "row",
  },
  captchaInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
    marginRight: 10,
  },
  captchaBox: {
    justifyContent: "center",
    borderRadius: 8,
    // backgroundColor: "#f9f9f9",
    backgroundColor: 'red'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 12
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  registerButton: {
    flex: 1,
    marginLeft: 10,
  },
  qrContainer: {
    alignItems: "center",
  },
  qrText: {
    marginBottom: 10,
    color: "#666",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#666",
  },
  loginLink: {
    color: ColorTV.Color.textPrimary3,
    fontWeight: "bold",
  },
})

export default RegistrationScreen
