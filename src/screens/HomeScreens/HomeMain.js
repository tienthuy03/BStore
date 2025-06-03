import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import Block from "../../components/Block";
import Button from "../../components/Button";
import Icon_bdtk from "../../icons/BDTK";
import Icon_bus from "../../icons/Bus";
import Icon_cc from "../../icons/CC";
import Icon_dkdl from "../../icons/DKDL";
import Icon_gs from "../../icons/GS";
import Icon_lsl from "../../icons/LSL";
import Icon_BDTK_V2 from "../../icons/Menu/BieuDoThongKe";
import Icon_CCKM_V2 from "../../icons/Menu/ChamCongKhuonMat";
import Icon_DKDLC_V2 from "../../icons/Menu/DangKyCom";
import Icon_DKDL_V2 from "../../icons/Menu/DangKyDuLieu";
import Icon_KSDG_V2 from "../../icons/Menu/KhaoSatDanhGia";
import Icon_KDOL_V2 from "../../icons/Menu/KyDuyetOnline";
import Icon_NONE_V2 from "../../icons/Menu/NoneIcon";
import Icon_PDDL_V2 from "../../icons/Menu/PheDuyetDuLieu";
import Icon_QLCV_V2 from "../../icons/Menu/QuanLyCongViec";
import Icon_QLDT_V2 from "../../icons/Menu/QuanLyDonTu";
import Icon_QLDL_V2 from "../../icons/Menu/QuanLyDuLieu";
import Icon_TH_V2 from "../../icons/Menu/TongHop";
import Icon_TVTT_V2 from "../../icons/Menu/TruyVanThongTin";
import Icon_XDR_V2 from "../../icons/Menu/XeDuaRuoc";
import Icon_pddl_v2 from "../../icons/PDDLV2";
import Icon_qldl from "../../icons/QLDL";
import Icon_qldl_v2 from "../../icons/QLDLV2";
import Icon_qldt from "../../icons/QLDT";
import Icon_qldt_v2 from "../../icons/QLDTV2";
import Icon_qlpd from "../../icons/QLPD";
import Icon_st from "../../icons/ST";
import Icon_tb from "../../icons/TB";
import Icon_tvtt from "../../icons/TVTT";
import Icon_gsNew from '../../icons/icongsnew'
import Icon_Signature from "../../icons/IconSignature";
import Icon_BHLD from "../../icons/IconBHLD";
import axios from "axios";
import RNRestart from "react-native-restart";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../actions";
import { APP_VERSION } from "../../config/Pro";
import { selectLanguageDM } from "../../Language";
import sysFetch from "../../services/fetch_crypt";
import { home } from "../../styles"
import RowText from "../../components/RowText";
import SvgPerson from "../../icons/Person";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from "../../colors/colortv";
import CardShop, { ShopCard } from "../../components/Bstore/CardShop";

const defaultAvatar = "https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg"

const HomeMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const API = useSelector((state) => state.SysConfigReducer.API_URL);
  const loginReducers = useSelector((state) => state.loginReducers);
  const languageReducer = useSelector((state) => state.languageReducer);
  const Color = useSelector((s) => s.SystemReducer.theme);
  const [loadMenu, setLoadMenu] = useState(true);
  const [dataMenuMBHR, setDataMenuMBHR] = useState([]);
  let dataMenuMBHRs;
  let fullname;

  let tokenLogin = useSelector(
    (state) => state.loginReducers.data.data.tokenLogin
  );
  let userPk = useSelector(
    (state) => state.loginReducers.data.data.tes_user_pk
  );
  let crt_by = useSelector((state) => state.loginReducers.data.data.crt_by);
  let refreshToken = useSelector(
    (state) => state.loginReducers.data.data.refreshToken
  );
  let thr_emp_pk = useSelector(
    (state) => state.loginReducers.data.data.thr_emp_pk
  );
  try {
    dataLanguage = languageReducer.data.data.language;
  } catch (error) { }
  try {
    language = loginReducers.data.data.user_language;
    urlImage = loginReducers.data.data.avatar;
    fullname = loginReducers.data.data.full_name;
    empId = loginReducers.data.data.emp_id;
  } catch (error) { }

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
          dataMenuMBHRs = rs.data.menu;
          console.log("rs: ", dataMenuMBHRs);
          let dataMenuMBHRc = [];
          try {
            dataMenuMBHRs.map((item) => {
              if (item.menu_cd.length === 6) {
                dataMenuMBHRc.push(item);
              }
            });
            //Chia cột cho menu home
            if (loginReducers.data.data.menu_type == 2) {
              console.log("loginReducers.data.data.menu_type ", 0 % 3);
              if (
                dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length > 3
              ) {
                if (
                  (dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length -
                    1) %
                  3 ===
                  1
                ) {
                  dataMenuMBHRc.push({ pk: "pk", parent: true });
                }
                if (
                  (dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length -
                    1) %
                  3 ===
                  2
                ) {
                  dataMenuMBHRc.push(
                    { pk: "pk", parent: true },
                    { pk: "pk", parent: true }
                  );
                }
              } else {
                if (
                  dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length ==
                  1
                ) {
                  dataMenuMBHRc.push(
                    { pk: "pk", parent: true },
                    { pk: "pk", parent: true }
                  );
                }

                if (
                  dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length ==
                  2
                ) {
                  dataMenuMBHRc.push({ pk: "pk", parent: true });
                }
              }
            } else {
              if (
                dataMenuMBHRc.filter((x) => x.menu_cd !== "MBHRAN").length %
                2 ===
                1
              ) {
                dataMenuMBHRc.push({ pk: "pk", parent: true });
              }
            }

            setDataMenuMBHR(
              dataMenuMBHRc.filter(
                (x) => x.menu_cd !== "MBHRAN" && x.menu_cd !== "MBSYSY"
              )
            );
          } catch (error) {
            setLoadMenu(false);
            console.log(error);
          }
        }
      })
      .catch((error) => {
        setLoadMenu(false);
        console.log(error);
      });
  };

  function selectSystem(params, index) {
    let data = [];
    try {
      dataLanguage.map((item) => {
        if (item.field_name === "welcome" || item.field_name === "menu") {
          data.push(item);
        }
      });
      return data[index][params.toString().toLowerCase()];
    } catch (error) { }
  }
  const [greeting, setGreeting] = useState("");
  // Hàm xác định lời chào dựa trên giờ hiện tại
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    if (hour >= 0 && hour < 12) {
      return "Chào buổi sáng! 🌞";
    } else if (hour >= 12 && hour < 18) {
      return "Chào buổi chiều! 🌤️";
    } else {
      return "Chào buổi tối! 🌙";
    }
  };
  useEffect(() => {
    // Hàm cập nhật lời chào
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    // Gọi ngay khi component mount
    updateGreeting();

    // Cập nhật lời chào sau 5 phút
    const interval = setInterval(updateGreeting, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  const renderItem = ({ item }) => {
    return (
      <CardShop
        onPress={() => {
          console.log("ID được truyền đi:", item.tco_depot_pk);  // ✅ Log ở đây
          navigation.navigate("Menu_Production", { tco_depot_pk: item.tco_depot_pk });
        }}
        image_uri={item.image_uri || "https://menuonline.vn/images/upload/news/789438234-Nha-hang-Hai-san.jpg"}
        shop_address={item.address}
        shop_name={item.depot_nm}
        shop_owner={item.shop_owner}
        shop_phone={item.mobile}
      />

    );
  };
  const renderItemV1 = ({ item }) => {
    const isSelected = selectedItem === item;
    if (item.parent === true) {
      return (
        <View
          style={{
            height: 120,
            margin: 5,
            flex: 1,
            marginBottom: 12,
          }}
        ></View>
      );
    } else {
      return (
        <View style={{ height: 100, flex: 1, marginBottom: 16, marginTop: 12 }}>
          <Block
            shadow
            marginHorizontal={12}
            borderRadius={12}
            justifyCenter
            backgroundColor={Color.white}
            paddingVertical={12}
            style={{
              borderColor: isSelected ? '#25399F' : 'transparent',
              borderWidth: isSelected ? 2 : 0,
            }}
          >
            <Button
              nextScreen={() => {
                setSelectedItem(item);
                navigation.navigate(item.menu_cd);
              }}>
              {SetIcon(item.icon)}
            </Button>
          </Block>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              numberOfLines={1}
              fontWeight={"bold"}
              size={12}
              color={Color.mainColor}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={10}
            >
              {selectLanguageDM(item, language)}
            </Text>
          </View>
        </View >
      );
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const ListHeaderComponent = () => {
    return (
      <Block>
        <Text
          paddingLeft={20}
          // paddingTop={10}
          size={22}
          fontFamily={"Roboto-Bold"}
          color={Color.mainColor}
          paddingBottom={12}
        >
          {selectSystem(language, 0)}
        </Text>
      </Block>
    )
  }

  return (
    <>
      <View style={{ paddingHorizontal: 16, backgroundColor: "#F1F1F1", flex: 1 }}>
        <View style={{ paddingTop: '4%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 12, flexDirection: 'row', flex: 1, justifyContent: 'flex-start' }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: Color.mainColor }}
              source={{ uri: "https://i.pinimg.com/736x/3b/19/11/3b1911246fc66f81cbc8a0035014569b.jpg" }} />
            <View style={{}}>
              <MaskedView
                maskElement={
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 16,
                      color: 'black', // màu này không quan trọng vì sẽ bị che

                    }}
                  >
                    Xin chào 👋
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#FF5E62', '#FA812F',]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text
                    style={{
                      opacity: 0, // ẩn text gốc, chỉ dùng để lấy layout
                      fontFamily: 'Roboto-Medium',
                      fontSize: 20,
                    }}
                  >
                    Xin chào 👋
                  </Text>
                </LinearGradient>
              </MaskedView>
              <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, color: Color.textPrimary2 }}>{fullname}</Text>
            </View>

          </View>
          <TouchableOpacity style={{ width: 24, height: 24 }} activeOpacity={0.7} onPress={() => navigation.navigate('CartScreen')}>
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Icon name="cart" size={24} color="black" />
                </TouchableOpacity>
              }
            >
              <LinearGradient
                colors={['#FF5E62', '#FA812F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
              />
            </MaskedView>
          </TouchableOpacity>

        </View>
        <Text style={{ paddingVertical: 12, fontFamily: "Roboto-Medium", fontSize: 16, color: Color.mainColor }}>Danh sách cửa hàng</Text>

        <Block flex={1} >
          <Block flex>
            {loadMenu ? (
              <Block flex>
                <ActivityIndicator size="large" color="grey" />
              </Block>
            ) : (
              <Block flex={1}  >
                <FlatList
                  data={dataMenuMBHR.filter((x) => x !== "MBHRAN")}
                  renderItem={

                    renderItem
                  }
                  numColumns={1}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                // ListHeaderComponent={ListHeaderComponent}
                />
              </Block>
            )}
          </Block>
        </Block>
      </View >
    </>
  );
};

export default HomeMain;