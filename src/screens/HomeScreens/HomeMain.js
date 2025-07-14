import MaskedView from '@react-native-masked-view/masked-view';
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RNRestart from "react-native-restart";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../actions";
import Block from "../../components/Block";
import CardShop from "../../components/Bstore/CardShop";
import { APP_VERSION } from "../../config/Pro";
import sysFetch from "../../services/fetch_crypt";
import useAppConfig from '../../utils/useAppConfig';
import { Color } from '../../colors/colortv';

const defaultAvatar = "https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg"

const getUserInfo = (loginReducers) => {
  try {
    const data = loginReducers?.data?.data;
    return {
      language: data?.user_language,
      urlImage: data?.avatar,
      fullname: data?.full_name,
      empId: data?.emp_id,
      menuType: data?.menu_type,
    };
  } catch {
    return {};
  }
};

const getLanguageData = (languageReducer) => {
  try {
    return languageReducer?.data?.data?.language || [];
  } catch {
    return [];
  }
};

const filterMenu = (menu, menuType) => {
  // Lọc menu có mã 6 ký tự
  let filtered = menu.filter((item) => item.menu_cd && item.menu_cd.length === 6);
  // Chia cột cho menu home
  const count = filtered.filter((x) => x.menu_cd !== 'MBHRAN').length;
  if (menuType === 2) {
    if (count > 3) {
      if ((count - 1) % 3 === 1) filtered.push({ pk: 'pk', parent: true });
      if ((count - 1) % 3 === 2) filtered.push({ pk: 'pk', parent: true }, { pk: 'pk', parent: true });
    } else {
      if (count === 1) filtered.push({ pk: 'pk', parent: true }, { pk: 'pk', parent: true });
      if (count === 2) filtered.push({ pk: 'pk', parent: true });
    }
  } else {
    if (count % 2 === 1) filtered.push({ pk: 'pk', parent: true });
  }
  // Loại bỏ MBHRAN, MBSYSY
  return filtered.filter((x) => x.menu_cd !== 'MBHRAN' && x.menu_cd !== 'MBSYSY');
};

const HomeMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const API = useSelector((state) => state.SysConfigReducer.API_URL);
  const loginReducers = useSelector((state) => state.loginReducers);
  const languageReducer = useSelector((state) => state.languageReducer);
  const [loadMenu, setLoadMenu] = useState(true);
  const [dataMenuMBHR, setDataMenuMBHR] = useState([]);
  const { thr_emp_pk, tokenLogin, crt_by, userPk, refreshToken } = useAppConfig()

  const languageData = getLanguageData(languageReducer);
  const { fullname, menuType } = getUserInfo(loginReducers);

  useEffect(() => {
    setLoadMenu(true);
    getMenu();
  }, []);

  const refreshNewToken = (obj) => {
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
        if (obj == "getMenu") {
          getMenu();
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

  const getMenu = () => {
    console.log('getMenu', {
      p1_varchar2: userPk,
      p2_varchar2: thr_emp_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    });
    sysFetch(
      API,
      {
        pro: "STV_HR_SEL_MBI_HRMENU_1",
        in_par: {
          p1_varchar2: userPk,
          p2_varchar2: thr_emp_pk,
          p3_varchar2: APP_VERSION,
          p4_varchar2: crt_by,
        },
        out_par: {
          p1_sys: "menu",
        },
      },
      tokenLogin
    )
      .then((rs) => {
        console.log("rs: ", rs);

        if (rs == "Token Expired") {
          refreshNewToken("getMenu");
        }
        if (rs != "Token Expired") {
          setLoadMenu(false);
          const menuData = rs.data.menu || [];
          setDataMenuMBHR(filterMenu(menuData, menuType));
        }
      })
      .catch((error) => {
        setLoadMenu(false);
        console.log(error);
      });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <CardShop
        onPress={() => {
          navigation.navigate("Menu_Production", { tco_depot_pk: item.tco_depot_pk });
        }}
        image_uri={item.image_uri || "https://menuonline.vn/images/upload/news/789438234-Nha-hang-Hai-san.jpg"}
        shop_address={item.address}
        shop_name={item.depot_nm}
        shop_owner={item.shop_owner}
        shop_phone={item.mobile}
      />
    ),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            style={[styles.avatar, { borderColor: Color.mainColor }]}
            source={{ uri: "https://i.pinimg.com/736x/3b/19/11/3b1911246fc66f81cbc8a0035014569b.jpg" }}
          />
          <View>
            <MaskedView
              maskElement={
                <Text style={styles.helloText}>Xin chào 👋</Text>
              }
            >
              <LinearGradient colors={['#FF5E62', '#FA812F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.helloTextGradient}>Xin chào 👋</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={[styles.fullname, { color: Color.textPrimary2 }]}>{fullname}</Text>
          </View>
        </View>
        <View style={styles.iconOption}>
          <TouchableOpacity style={styles.cartButton} activeOpacity={0.7} onPress={() => navigation.navigate('QRCodeScreen')}>
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <View style={styles.cartIconWrapper}>
                  <Icon name="qrcode-scan" size={20} color="black" />
                </View>
              }
            >
              <LinearGradient colors={['#FF5E62', '#FA812F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
            </MaskedView>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} activeOpacity={0.7} onPress={() => navigation.navigate('CartScreen')}>
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <View style={styles.cartIconWrapper}>
                  <Icon name="cart" size={24} color="black" />
                </View>
              }
            >
              <LinearGradient colors={['#FF5E62', '#FA812F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
            </MaskedView>
          </TouchableOpacity>
        </View>

      </View>
      <Text style={[styles.title, { color: Color.mainColor }]}>Danh sách cửa hàng</Text>
      <Block flex={1}>
        <Block flex>
          {loadMenu ? (
            <Block flex>
              <ActivityIndicator size="large" color="grey" />
            </Block>
          ) : (
            <Block flex={1}>
              <FlatList
                data={dataMenuMBHR}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </Block>
          )}
        </Block>
      </Block>
    </View>
  );
};

export default HomeMain;

const styles = StyleSheet.create({
  iconOption: {
    flexDirection: 'row',
    gap: 8
  },
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
  headerRow: {
    paddingTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    alignItems: 'center',
    gap: 12,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
  },
  helloText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'black',
  },
  helloTextGradient: {
    opacity: 0,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  fullname: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  cartButton: {
    width: 24,
    height: 24,
  },
  cartIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    paddingVertical: 12,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});