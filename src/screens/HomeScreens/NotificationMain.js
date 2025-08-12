import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AppState, StatusBar, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../components/Block';
import {
  ntGetNotification,
  ntResetCountNotiTab,
} from '../../services/redux/Notification/action';
import SystemNoti from '../HomeScreens/Tab_Notification/SystemNoti';
import { Color } from '../../colors/colortv';

const Tab = createMaterialTopTabNavigator();

const NotificationMain = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const isFocused = useIsFocused();
  const [valueNoti, setValueNoti] = useState('Thông báo');
  let language = '';

  const { notification, notificationGen, notificationSys } = useSelector(
    state => state.NotificationReducer,
  );

  let dataLanguage;
  try {
    dataLanguage = state.languageReducer.data.data.language;
    language =
      state.loginReducers.data.data.user_language == undefined
        ? 'VIE'
        : state.loginReducers.data.data.user_language;
  } catch (error) {
    // Handle error
  }

  useEffect(() => {
    if (dataLanguage !== undefined) {
      dataLanguage.filter(item => {
        var lowerLanguage = language.toLowerCase();
        if (item.field_name === 'notification') {
          setValueNoti(item[lowerLanguage]);
        }
      });
    }
  }, [dataLanguage, language]);

  useEffect(() => {
    const handleAppStateChange = (currentAppState) => {
      if (currentAppState === 'active') {
        console.log('currentAppState ', currentAppState);
        dispatch(ntGetNotification());
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    dispatch(ntGetNotification());

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(ntResetCountNotiTab());
    }
  }, [isFocused]);

  return (
    <Block flex backgroundColor={Color.gray}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Block row marginTop={55} alignCenter>
        <Block backgroundColor={Color.mainColor} width={7} height={29} />
        <Text style={styles.titleText}>
          {valueNoti}
        </Text>
      </Block>
      <Block flex backgroundColor={Color.gray} paddingTop={10}>
        <SystemNoti />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 26,
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
    paddingLeft: 20,
    textAlign: 'center',
  },
});

export default NotificationMain;