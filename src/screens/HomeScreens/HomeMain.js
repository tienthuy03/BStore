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
  const menuReducer = useSelector((state) => state.menuReducer);
  const languageReducer = useSelector((state) => state.languageReducer);
  const Color = useSelector((s) => s.SystemReducer.theme);
  const numColumns = loginReducers.data.data.menu_type == 2 ? 2 : 3;
  const [loadMenu, setLoadMenu] = useState(true);
  const [dataMenuMBHR, setDataMenuMBHR] = useState([]);
  let dataMenuMBHRs;
  let dataLanguage;
  let language;
  let fullname;
  let empId;
  let urlImage;

  // let loadMenu;
  function SetIcon(name) {
    if (loginReducers.data.data.menu_type == 2) {
      if (name === "account-card-details") {
        return <Icon_TVTT_V2 />;
      } else if (name === "file-document-edit") {
        return <Icon_DKDL_V2 />;
      } else if (name === "calendar-check") {
        return <Icon_QLDL_V2 />;
      } else if (name === "bell") {
        return <Icon_tb />;
      } else if (name === "camera-front-variant") {
        return <Icon_CCKM_V2 />;
      } else if (name === "chart-bar") {
        return <Icon_BDTK_V2 />;
      } else if (name === "file-document-box-multiple") {
        return <Icon_QLDT_V2 />;
      } else if (name === "file-table") {
        return <Icon_qldl />;
      } else if (name === "settings") {
        return <Icon_st />;
      } else if (name === "form-qldt") {
        return <Icon_QLDT_V2 />;
      } else if (name === "form-lsl") {
        return <Icon_lsl />;
      } else if (name === "form-gs") {
        return <Icon_gs />;
      } else if (name === "form-pddlv2") {
        return <Icon_PDDL_V2 />;
      } else if (name === "form-qldlv2") {
        return <Icon_QLDL_V2 />;
      } else if (name === "bus") {
        return <Icon_XDR_V2 />;
      } else if (name === "icon-tvtt-v2") {
        return <Icon_TVTT_V2 />;
      } else if (name === "icon-dkdl-v2") {
        return <Icon_DKDL_V2 />;
      } else if (name === "icon-cckm-v2") {
        return <Icon_CCKM_V2 />;
      } else if (name === "icon-bdtk-v2") {
        return <Icon_BDTK_V2 />;
      } else if (name === "icon-pddl-v2") {
        return <Icon_PDDL_V2 />;
      } else if (name === "icon-qldl-v2") {
        return <Icon_QLDL_V2 />;
      } else if (name === "icon-dkdlc-v2") {
        return <Icon_DKDLC_V2 />;
      } else if (name === "icon-xdr-v2") {
        return <Icon_XDR_V2 />;
      } else if (name === "icon-th-v2") {
        return <Icon_TH_V2 />;
      } else if (name === "icon-qldt-v2") {
        return <Icon_QLDT_V2 />;
      } else if (name === "icon-qlcv-v2") {
        return <Icon_QLCV_V2 />;
      } else if (name === "icon-ksdg-v2") {
        return <Icon_KSDG_V2 />;
      } else if (name === "icon-kdol-v2") {
        return <Icon_KDOL_V2 />;
      } else if (name === "icon-tvtt-v2") {
        return <Icon_TVTT_V2 />;
      } else if (name === "icon-dkdl-v2") {
        return <Icon_DKDL_V2 />;
      } else if (name === "icon-cckm-v2") {
        return <Icon_CCKM_V2 />;
      } else if (name === "icon-bdtk-v2") {
        return <Icon_BDTK_V2 />;
      } else if (name === "icon-pddl-v2") {
        return <Icon_PDDL_V2 />;
      } else if (name === "icon-qldl-v2") {
        return <Icon_QLDL_V2 />;
      } else if (name === "icon-dkdlc-v2") {
        return <Icon_DKDLC_V2 />;
      } else if (name === "icon-xdr-v2") {
        return <Icon_XDR_V2 />;
      } else if (name === "icon-th-v2") {
        return <Icon_TH_V2 />;
      } else if (name === "icon-qldt-v2") {
        return <Icon_QLDT_V2 />;
      } else if (name === "icon-qlcv-v2") {
        return <Icon_QLCV_V2 />;
      } else if (name === "icon-ksdg-v2") {
        return <Icon_KSDG_V2 />;
      } else if (name === "form-ksdg") {
        return <Icon_KDOL_V2 />;
      } else {
        return <Icon_NONE_V2 />;
      }
    } else {
      if (name === "account-card-details") {
        return <Icon_tvtt />;
      } else if (name === "file-document-edit") {
        return <Icon_dkdl />;
      } else if (name === "calendar-check") {
        return <Icon_qlpd />;
      } else if (name === "bell") {
        return <Icon_tb />;
      } else if (name === "camera-front-variant") {
        return <Icon_cc />;
      } else if (name === "chart-bar") {
        return <Icon_bdtk />;
      } else if (name === "file-document-box-multiple") {
        return <Icon_qldt />;
      } else if (name === "file-table") {
        return <Icon_qldl />;
      } else if (name === "settings") {
        return <Icon_st />;
      } else if (name === "form-qldt") {
        return <Icon_qldt_v2 />;
      } else if (name === "form-lsl") {
        return <Icon_lsl />;
      } else if (name === "form-gs") {
        return <Icon_gsNew />;
      } else if (name === "form-pddlv2") {
        return <Icon_pddl_v2 />;
      } else if (name === "form-qldlv2") {
        return <Icon_qldl_v2 />;
      } else if (name === "bus") {
        return <Icon_bus />;
      } else if (name === "form-kdonl") {
        return <Icon_Signature />;
      } else if (name === "form-bhld") {
        return <Icon_BHLD />;
      }
    }
    // http://14.241.235.252:8484/tvs_api_v1/api/
    // http://tinvietsoft.com/tinviet_api/api/
  }
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
  // loadMenu = menuReducer.isLoading;
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
    //checkBaoMat();
  }, []);

  const checkBaoMat = () => {
    const pro = "SELHRHM001000";
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: thr_emp_pk,
    };
    const out_par = {
      p1_sys: "value1",
      p2_sys: "value2",
      p3_sys: "value_email",
    };
    sysFetch(
      API,
      {
        pro,
        in_par,
        out_par,
      },
      tokenLogin
    )
      .then((rs) => {
        if (rs == "Token Expired") {
          refreshNewToken("getData", "", "");
        }
        if (rs != "Token Expired") {
          if (rs.results == "S") {
            const value1 = rs.data.value1;
            const value2 = rs.data.value2;
            const value_email = rs.data.value_email;
            const check1 = value_email[0].email == "" || !value_email[0].email;
            const check2 = value1.length == 0;
            const check3 = value2.length == 0;

            if (check1 && check2 && check3) {
              Alert.alert(
                "Thông báo",
                "Vui lòng cập nhật thông tin bảo mật để bảo vệ tài khoản của bạn",
                [
                  {
                    text: "Đóng",
                    onPress: () => { },
                  },
                  {
                    text: "Xác nhận",
                    onPress: () => {
                      navigation.navigate("EmailSecurity", { first: true });
                    },
                  },
                ],
                { cancelable: true }
              );
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        // pro: 'SELHRMENU0100',
        pro: "SELHRMENU1",
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

  const infor = useMemo(() => {
    return (
      <Block row justifyStart alignCenter paddingLeft={20}>
        <View style={home.boxI}>
          {urlImage !== "data:;base64," ? (
            <Image
              style={home.img}
              source={{ uri: urlImage }}
              resizeMode='stretch'
            />
          ) : (
            <View style={home.imgNo}>
              <SvgPerson />
            </View>

          )}
        </View>
        <Block column paddingLeft={12}>
          <Text
            size={20}
            marginBottom={4}
            color={Color.white}
            fontFamily={"Roboto-Bold"}
          >
            {greeting}
          </Text>
          <View style={{ gap: 4, justifyContent: 'center' }}>
            <RowText text={fullname} iconColor={Color.white} iconName={""} iconSize={24} textStyle={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: Color.white }} />
          </View>
        </Block>
      </Block>
    );
  }, [language, greeting]);
  const renderItem = ({ item }) => {
    return (
      <CardShop
        onPress={() => navigation.navigate("Menu_Production")}
        shop_image={"https://menuonline.vn/images/upload/news/789438234-Nha-hang-Hai-san.jpg"}
        shop_address={"134 Trần Hưng Đạo, TP Hồ Chí Minh"} />
    );

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
          <View style={{ paddingTop: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', gap: 12, flexDirection: 'row', flex: 1, justifyContent: 'flex-start' }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: Color.mainColor }}
                source={{ uri: "https://i.pinimg.com/736x/3b/19/11/3b1911246fc66f81cbc8a0035014569b.jpg" }} />
              <View style={{}}>
                {/* <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 20, color: Color.textPrimary3 }}>Xin chào 👋</Text> */}
                <MaskedView
                  maskElement={
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 20,
                        color: 'black', // màu này không quan trọng vì sẽ bị che
                        textAlign: 'center',
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
                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, color: Color.textPrimary2 }}>Thuỷ Tiên</Text>
              </View>

            </View>
            <TouchableOpacity style={{ width: 24, height: 24 }}>
              <MaskedView
                style={{ flex: 1 }}
                maskElement={
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Icon name="cart" size={24} color="black" />
                  </View>
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
                      loginReducers.data.data.menu_type == 2
                        ? renderItemV1
                        : renderItem
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