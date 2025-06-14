import NetInfo from "@react-native-community/netinfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  View
} from "react-native";
import DefaultPreference from "react-native-default-preference";
import { Badge } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguageAction,
  fetchMenuAction,
  fetchTTCNAction,
} from "../../actions";
import { deviceId } from "../../constants/index";
import ShowError from "../../services/errors";
import Dashboard from "../HomeScreens/Dashboard";
import HomeScreen from "../HomeScreens/HomeMain";
import NotiScreen from "../HomeScreens/NotificationMain";
import SystemScreen from "../HomeScreens/SystemMain";
import QRCodeScreen from "./QRCodeScreen";
import CustomTabBar from "../../components/Bstore/CustomTabar";

const Tab = createBottomTabNavigator();
const Index = () => {
  const Color = useSelector((s) => s.SystemReducer.theme);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.loginReducers);
  const { notification, notificationGen, notificationSys, countNotiTab } =
    useSelector((state) => state.NotificationReducer);
  const languageReducer = useSelector((state) => state.languageReducer);
  const menuReducer = useSelector((state) => state.menuReducer);
  const [system, setSystem] = useState("Tài khoản");
  const [home, setHome] = useState("Trang chủ");
  const [noti, setNoti] = useState("Thông báo");
  const [DashboardTitle, setDashboardTitle] = useState("Bảng tin");
  const API = useSelector((state) => state.SysConfigReducer.API_URL);
  let fullname;
  let tokenLogin;
  let thr_emp_pk;
  let language;
  let dataLanguage;
  let tes_user_pk;
  let user_name;
  let loadMenu;
  let loadLanguage;
  let login_status;
  try {
    fullname = state.data.data.full_name;
    user_name = state.user_name;
    tes_user_pk = state.data.data.tes_user_pk;
    tokenLogin = state.data.data.tokenLogin;
    thr_emp_pk = state.data.data.thr_emp_pk;
    loadMenu = menuReducer.isLoading;
    login_status = state.data.data.login_status;
    // PushNotificationIOS
  } catch (error) { }

  try {
    language = state.data.data.user_language;
    dataLanguage = languageReducer.data.data.language;
    loadLanguage = languageReducer.isLoading;
  } catch (error) { }

  useEffect(() => {
    console.log("get DefaultPreference");
    DefaultPreference.getAll().then((valueAll) => {
      console.log("valueAll.status ====> ", valueAll.status);
      console.log("valueAll.temp ====> ", valueAll.temp);
      console.log("valueAll.nameAuthen ====> ", valueAll.nameAuthen);

      if (valueAll.status === "" || valueAll.status === undefined) {
        DefaultPreference.set("status", "11");
        console.log("confirm fast login");
      }
    });
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        DefaultPreference.set("fullname", fullname);
        DefaultPreference.set("username", user_name);
        DefaultPreference.set("tokenLogin", tokenLogin);
        DefaultPreference.set("API", API);
        dispatch(
          fetchMenuAction({
            token: tokenLogin,
            machine_id: deviceId,
            tes_user_pk: tes_user_pk,
            thr_emp_pk: thr_emp_pk,
            user_name: user_name,
          })
        );
        dispatch(
          fetchLanguageAction({
            token: tokenLogin,
            machine_id: deviceId,
          })
        );
        dispatch(
          fetchTTCNAction({
            token: tokenLogin,
            machine_id: deviceId,
            userPK: thr_emp_pk,
            fullname: fullname,
          })
        );
      } else {
        ShowError("No internet");
      }
    });
  }, []);
  useEffect(() => {
    try {
      languageReducer.data.data.language.filter((item) => {
        var lowerLanguage = language.toLowerCase();
        if (item.field_name === "account") {
          setSystem(item[lowerLanguage]);
        }
        if (item.field_name === "notification") {
          setNoti(item[lowerLanguage]);
        }
        if (item.field_name === "dashboard") {
          setDashboardTitle(item[lowerLanguage]);
        }
        if (item.field_name === "home") {
          setHome(item[lowerLanguage]);
        }
      });
    } catch (error) { }
  }, [languageReducer]);
  //handle noti count
  useEffect(() => {
    const handleFirstLoadData = async () => {
      DefaultPreference.get("countNotiTab").then((rs) => {
        if (!rs) {
          DefaultPreference.set("countNotiTab", "0-0");
        }
      });
    };
    // DefaultPreference.clear('countNotiTab');
    handleFirstLoadData();
  }, []);

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="QRCode" component={QRCodeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Noti" component={NotiScreen} options={{ headerShown: false }} />
      <Tab.Screen name="System" component={SystemScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabs: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  tabIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    paddingTop: 0,
    paddingLeft: 25,
  },
});

export default Index;
