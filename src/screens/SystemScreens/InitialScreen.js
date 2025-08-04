import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SetApiURL } from '../services/redux/SysConfig/action';
import { sysLoadTheme } from '../services/redux/System/action';
import { ServerIP } from '../../config/Pro';
import * as ColorTV from '../../colors/colortv';

const arr = [
  { id: "1", name: "Theme 01", color: ColorTV.Color },
];

const InitialScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const CLIENT_ID = await AsyncStorage.getItem("CLIENT_ID");
      const API_URL = await AsyncStorage.getItem("API_URL");
      const firstLoadApp = await AsyncStorage.getItem("firstLoadApp");

      console.log("Checking configuration:");
      console.log("CLIENT_ID:", CLIENT_ID);
      console.log("API_URL:", API_URL);
      console.log("firstLoadApp:", firstLoadApp);

      // If already configured, go to LoginScreen
      if (CLIENT_ID && API_URL && firstLoadApp) {
        console.log("Already configured, going to LoginScreen");
        navigation.replace("LoginScreen");
        return;
      }

      // If not configured, go to ConfigThemeScreen
      console.log("Not configured, going to ConfigThemeScreen");
      navigation.replace("ConfigThemeScreen");
    } catch (error) {
      console.log("Error checking configuration:", error);
      // Default to ConfigThemeScreen on error
      navigation.replace("ConfigThemeScreen");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6FF' }}>
      <ActivityIndicator size="large" color="#01acec" />
    </View>
  );
};

export default InitialScreen; 