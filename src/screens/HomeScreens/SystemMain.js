import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import DefaultPreference from 'react-native-default-preference';
import RNRestart from 'react-native-restart';

const SystemMain = () => {
  const dispatch = useDispatch();
  const Color = useSelector((s) => s.SystemReducer.theme);
  const API = useSelector((state) => state.SysConfigReducer.API_URL);

  // Get user data from Redux
  let tokenLogin = useSelector(
    (state) => state.loginReducers.data.data.tokenLogin
  );
  let userPk = useSelector(
    (state) => state.loginReducers.data.data.tes_user_pk
  );

  // Logout function
  const deleteDataUser = async () => {
    try {
      const response = await axios.post(API + "User/RevokeToken/", {
        token: tokenLogin,
        userPk: userPk,
      });
      console.log('Logout response:', response);
    } catch (error) {
      console.log('Logout error:', error);
    }

    // Clear all stored data and restart app
    DefaultPreference.set("logout", "true");
    RNRestart.Restart();
  };

  // Logout confirmation dialog
  function logoutApp() {
    Alert.alert(
      "Đăng xuất !",
      "Xác nhận thoát tài khoản",
      [
        {
          text: "Huỷ bỏ",
          onPress: () => console.log("Cancel logout"),
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          onPress: () => deleteDataUser()
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>System Settings</Text>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logoutApp}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons
              name="logout"
              size={30}
              style={[styles.icon, { color: Color?.mainColor || '#007AFF' }]}
            />
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: Color?.mainColor || '#007AFF' }]}>
                Đăng xuất
              </Text>
              <Text style={styles.buttonSubText}>
                Thoát khỏi tài khoản hiện tại
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SystemMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  buttonSubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
    fontFamily: 'Roboto-Regular',
  },
});