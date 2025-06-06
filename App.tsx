/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * 
 * 
 *Press Windows + X and select Windows PowerShell (Admin) or Terminal (Admin).
 *  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

yarn add react-native-gesture-handler
yarn add react-native-splash-screen
yarn add react-native-safe-area-context
yarn add react-redux
yarn add redux
yarn add redux-saga
yarn add @react-navigation/stack
yarn add @react-navigation/native
yarn add @react-native-community/async-storage
yarn add react-native-sound
yarn add axios
yarn add react-native-restart
yarn add react-native-vector-icons
yarn add react-native-action-button
yarn add @react-native-community/netinfo
yarn add react-native-camera
yarn add react-native-default-preference
yarn add moment
yarn add react-native-qrcode-scanner
yarn add react-native-linear-gradient
yarn add @react-navigation/native
yarn add react-native-reanimated@3.15.3
yarn add react-native-animatable
yarn add react-native-device-info
yarn add @react-native-firebase/app
yarn add react-native-push-notification
yarn add @react-native-firebase/messaging

yarn add @react-native-community/push-notification-ios
yarn add react-native-file-viewer
yarn add prop-types
yarn add patch-package
yarn add react-native-svg
yarn add react-native-sqlite-storage 


yarn add react-native-skeleton-placeholder
yarn add react-native-svg-charts
yarn add react-native-chart-kit

yarn add react-native-fs
yarn add rn-fetch-blob
yarn add react-native-modal-datetime-picker
yarn add react-native-image-picker
yarn add react-native-document-picker
 yarn add @react-navigation/bottom-tabs
 yarn add react-native-elements
yarn add @react-navigation/material-top-tabs
yarn add react-native-modal
yarn add react-native-month-year-picker
yarn add react-native-calendars
yarn add react-native-qrcode-svg
yarn add react-native-popup-menu
yarn add base64-arraybuffer
yarn add react-native-get-location
yarn add react-native-maps
yarn add md5
yarn add react-native-crypto-js
yarn add react-native-touch-id
yarn add react-native-swiper
yarn add react-native-radio-form
yarn add react-native-render-html
yarn add @miblanchard/react-native-slider
yarn add react-native-hyperlink
yarn add @react-native-masked-view/masked-view
yarn add react-native-fast-image
yarn add native-base
yarn add react-native-hyperlink
yarn add react-native-signature-canvas
yarn add react-native-fast-image
yarn remove react-native-view-pdf
yarn add react-native-pdf
yarn add react-native-blob-util
yarn add react-native-paper
yarn add @react-native-community/datetimepicker
yarn add react-native-tab-view
yarn add react-native-webview
yarn add react-native-pager-view

yarn add react-native-screens




 * 

-- sua file node_modules/react-native-action-button/ActionButton.js

  buttonTextStyle: PropTypes.object,

  npm install patch-package -D --legacy-peer-deps
  npx patch-package react-native-action-button 

  adb shell pm grant com.tinvietsoft android.permission.WRITE_EXTERNAL_STORAGE
 adb shell pm grant com.tinvietsoft android.permission.READ_EXTERNAL_STORAGE
 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
// import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
//import store from './src/store';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { GlobalLoading, Popup } from "./src/components/Base";
import allReducers from "./src/reducers";
import rootSaga from "./src/sagas/rootSaga";
import BDTK from "./src/screens/HomeScreens/FBDTK_MBHRTK/index";
import MBHRTK001 from "./src/screens/HomeScreens/FBDTK_MBHRTK/MBHRTK001_ThongKeNhanLuc";
import MBHRTK002 from "./src/screens/HomeScreens/FBDTK_MBHRTK/MBHRTK002_ThongKeLuong/MBHRTK002";
import MBHRTK003 from "./src/screens/HomeScreens/FBDTK_MBHRTK/MBHRTK003_BieuDoHopDong/BDHD_MBHRTK003";
import MBHRTK004 from "./src/screens/HomeScreens/FBDTK_MBHRTK/MBHRTK004_BieuDoLaoDong/TKTQ_MBHRTK004";
import CCKM from "./src/screens/HomeScreens/FCCKM_MBHRTI/index";
import QLDL from "./src/screens/HomeScreens/FQLDL_MBHRMN/index";
import MBHRMN001 from "./src/screens/HomeScreens/FQLDL_MBHRMN/MBHRMN001_NhanVien";
import CreateNewEmployee from "./src/screens/HomeScreens/FQLDL_MBHRMN/MBHRMN001_NhanVien/createNewEmployee";
import MBHRMN006 from "./src/screens/HomeScreens/FQLDL_MBHRMN/MBHRMN006_DiemDanh";
import MBHRMN012 from "./src/screens/HomeScreens/FQLDL_MBHRMN/MBHRMN012_Folder";
import QLDT from "./src/screens/HomeScreens/FQLDT_MBHRDT/index";
import MBHRDT001 from "./src/screens/HomeScreens/FQLDT_MBHRDT/MBHRDT001_DonThoiViec";
import MBHRDT002 from "./src/screens/HomeScreens/FQLDT_MBHRDT/MBHRDT002_DonDieuChuyen";
import Index from "./src/screens/HomeScreens/index";

import SecurityMethod from "./src/screens/HomeScreens/SecurityMethod";
import SystemSecurity from "./src/screens/HomeScreens/SecurityMethod/SystemSecurity";
import UpdatePassword from "./src/screens/HomeScreens/SecurityMethod/UpdatePassword";

import QuestionSecurity from "./src/screens/HomeScreens/SecurityMethod/QuestionSecurity";
import EmailSecurity from "./src/screens/HomeScreens/SecurityMethod/EmailSecurity";

import CheckLogin from "./src/screens/SystemScreens/CheckLogin";
import ConfigThemeScreen from "./src/screens/SystemScreens/ConfigTheme/index";
import ForgotPass from "./src/screens/SystemScreens/ForgotPassword";
import LoginScreen from "./src/screens/SystemScreens/LoginScreen";
import RegisterAccount from "./src/screens/SystemScreens/RegisterAccount";
// import SysConfig from "./src/screens/SystemScreens/SysConfig";
import UpdatePass from "./src/screens/SystemScreens/UpdatePass";
import UpdatePassQuestionSecurity from "./src/screens/SystemScreens/UpdatePassQuestionSecurity";

import { LogBox, StatusBar } from "react-native";
import Menu_Production from "./src/screens/HomeScreens/MBHS001";
import CartScreen from "./src/screens/HomeScreens/CartScreen";

LogBox.ignoreLogs(["Warning: ", "EventEmitter.removeListener"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {/* <NotificationAlert visible={visible} content={content} /> */}
      <SafeAreaProvider>
        <GlobalLoading>{null}</GlobalLoading>
        <Popup cusStyle={undefined} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ConfigThemeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="ConfigThemeScreen" component={ConfigThemeScreen} />
            <Stack.Screen
              name="LoginScreen"
              // If you need to pass reloadConfig, do it via initialParams or a wrapper
              // component={LoginScreen}
              children={(props) => <LoginScreen {...props} reloadConfig={undefined} />}
            />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="RegisterAccount" component={RegisterAccount} />
            <Stack.Screen name="CheckLogin" component={CheckLogin} />
            <Stack.Screen name="UpdatePass" component={UpdatePass} />
            <Stack.Screen name="UpdatePassQuestionSecurity" component={UpdatePassQuestionSecurity} />
            <Stack.Screen name="Index" component={Index} options={{ gestureEnabled: false, }} />
            <Stack.Screen name="Menu_Production" component={Menu_Production} options={{ gestureEnabled: false, }} />
            <Stack.Screen name="CartScreen" component={CartScreen} options={{ gestureEnabled: false, }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);

export default App;
