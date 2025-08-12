import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Color } from "../../colors/colortv.js";
import Text from "../../components/Text.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginAction } from "../../actions";
import { deviceId } from "../../constants/index";
import sysFetch from "../../services/fetch_crypt";
import { APP_VERSION } from "../../config/Pro";

const InitialScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkTokenValidity = async (api, username, token) => {
    try {
      const response = await sysFetch(
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
      );

      if (response === "Token Expired") {
        console.log("Token expired");
        return false;
      }

      console.log("Token is valid");
      return true;
    } catch (error) {
      console.log("Error checking token validity:", error);
      return false;
    }
  };

  const checkInitialRoute = async () => {
    try {
      // Kiểm tra các thông tin cấu hình và đăng nhập
      const firstLoadApp = await AsyncStorage.getItem("firstLoadApp");
      const clientId = await AsyncStorage.getItem("CLIENT_ID");
      const apiUrl = await AsyncStorage.getItem("API_URL");
      const tokenLogin = await AsyncStorage.getItem("tokenLogin");
      const username = await AsyncStorage.getItem("username");

      console.log("Initial check:", {
        firstLoadApp,
        clientId,
        apiUrl,
        hasToken: !!tokenLogin,
        username
      });

      // Nếu chưa cấu hình lần nào
      if (!firstLoadApp || !clientId || !apiUrl) {
        console.log("App not configured, going to ConfigThemeScreen");
        navigation.replace("ConfigThemeScreen");
        return;
      }

      // Nếu đã cấu hình nhưng chưa đăng nhập
      if (!tokenLogin || !username) {
        console.log("App configured but not logged in, going to LoginScreen");
        navigation.replace("LoginScreen");
        return;
      }

      // Kiểm tra token có hợp lệ không
      const isTokenValid = await checkTokenValidity(apiUrl, username, tokenLogin);

      if (isTokenValid) {
        // Token hợp lệ, chuyển đến màn hình chính
        console.log("App configured and logged in with valid token, going to Index");
        navigation.replace("Index");
      } else {
        // Token không hợp lệ, xóa thông tin đăng nhập và chuyển đến login
        console.log("Token invalid, clearing login data and going to LoginScreen");
        await AsyncStorage.removeItem("tokenLogin");
        await AsyncStorage.removeItem("username");
        navigation.replace("LoginScreen");
      }

    } catch (error) {
      console.log("Error checking initial route:", error);
      // Nếu có lỗi, mặc định chuyển đến màn hình cấu hình
      navigation.replace("ConfigThemeScreen");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Color.mainColor} />
        <Text style={styles.loadingText}>Đang khởi tạo...</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FF",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Color.textPrimary2,
    fontFamily: "Roboto-Medium",
  },
});

export default InitialScreen; 