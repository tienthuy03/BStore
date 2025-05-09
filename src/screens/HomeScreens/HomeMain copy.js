import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StatusBar,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Text from "../../components/Text";
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
import sysFetch from "../../services/fetch_v1";
import { home } from "../../styles"
import RowText from "../../components/RowText";
import SvgPerson from "../../icons/Person";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    checkBaoMat();
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
    console.log({
      p1_varchar2: userPk,
      p2_varchar2: thr_emp_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    });
    sysFetch(
      API,
      {
        // pro: 'SELHRMENU0100',
        pro: "SELHRMENU0",
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

        if (rs == "Token Expired") {
          refreshNewToken("getMenu");
        }
        if (rs != "Token Expired") {
          setLoadMenu(false);
          dataMenuMBHRs = rs.data.menu;

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


  // const renderItem = ({ item }) => {
  //   if (item.parent === true) {
  //     return (
  //       <Block flex />
  //     );
  //   } else {
  //     return (
  //       <Block
  //         // shadow
  //         // height={100}
  //         // margin={10}
  //         // borderRadius={16}
  //         backgroundColor={Color.btnRed2}
  //         // style={{
  //         //   borderColor: isSelected ? Color.mainColor : 'transparent',
  //         //   borderWidth: isSelected ? 1 : 0,
  //         // }}
  //         // flex
  //         justifyCenter
  //         alignCenter={"space-between"}
  //         paddingVertical={8}
  //       >
  //         <Button
  //           nextScreen={() => {
  //             setSelectedItem(item);
  //             navigation.navigate(item.menu_cd);
  //           }}>
  //           <Block
  //             justifyCenter={"center"}
  //             alignCenter={"center"}
  //             paddingBottom={4}
  //           >
  //             {SetIcon(item.icon)}
  //           </Block>

  //           <Text
  //             // numberOfLines={1}
  //             // paddingLeft={10}
  //             size={13}
  //             color={Color.mainColor}
  //             paddingTop={3}
  //             center={"center"}
  //             fontFamily={"Roboto-Regular"}
  //           >
  //             {selectLanguageDM(item, language)}
  //           </Text>
  //         </Button>
  //       </Block>
  //     );
  //   }
  // };

  // const renderItem = ({ item }) => {
  //   const isPlaceholder = item.parent === true;

  //   return (
  //     <Block
  //       style={{
  //         flex: 1,
  //         maxWidth: '30%',
  //         aspectRatio: 1,
  //         marginHorizontal: '2%',
  //         paddingBottom: '5%',
  //         opacity: isPlaceholder ? 0 : 1,
  //       }}
  //     >
  //       {!isPlaceholder && (
  //         <Button
  //           nextScreen={() => {
  //             setSelectedItem(item);
  //             navigation.navigate(item.menu_cd);
  //           }}
  //           style={{
  //             flex: 1,
  //             borderRadius: 12,
  //             paddingVertical: 4,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <Block paddingBottom={4}>{SetIcon(item.icon)}</Block>
  //           <Text
  //             size={13}
  //             color={Color.mainColor}
  //             paddingTop={3}
  //             center
  //             fontFamily="Roboto-Regular"
  //           >
  //             {selectLanguageDM(item, language)}
  //           </Text>
  //         </Button>
  //       )}
  //     </Block>
  //   );
  // };
  const renderItem = ({ item }) => {
    const isPlaceholder = item.parent === true;
    return (
      <Block
        style={{
          width: '30%',
          aspectRatio: 1,
          margin: '1.5%',
          opacity: isPlaceholder ? 0 : 1,
        }}
      >
        {!isPlaceholder && (
          <Button
            nextScreen={() => {
              setSelectedItem(item);
              navigation.navigate(item.menu_cd);
            }}
            style={{
              flex: 1,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
            }}
          >
            <Block style={{ alignItems: 'center' }}>
              {/* <Block paddingBottom={4}>{SetIcon(item.icon)}</Block> */}
              <Icon name={'abacus'} color={Color.titleColor} size={60} />
              <Text
                size={13}
                color={Color.mainColor}
                center
                fontFamily="Roboto-Regular"
                numberOfLines={2}
                style={{
                  minHeight: 36,               // hoặc 40 tùy theo size chữ
                  textAlignVertical: 'center' // Android hỗ trợ tốt
                }}
              >
                {selectLanguageDM(item, language)}
              </Text>
            </Block>
          </Button>
        )}
      </Block>
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
          paddingTop={10}
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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.5 }}
        colors={["#498DE3", "#25399F"]}
        style={home.linearGradient}
      >
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle="light-content"
        />
        <View style={home.over} />
        <Block
          row
          justifyContent={"space-between"}
          alignCenter
          marginTop={16}
          paddingRight={20}
        >
          <Block height={40} />
        </Block>
        {infor}

      </LinearGradient>
      <Block flex={1} >
        <Block flex>
          {loadMenu ? (
            <Block flex>
              <ActivityIndicator size="large" color="grey" />
            </Block>
          ) : (
            <Block flex={1} backgroundColor={Color.white} paddingHorizontal={5} >
              <FlatList
                data={dataMenuMBHR.filter((x) => x !== "MBHRAN")}
                renderItem={
                  loginReducers.data.data.menu_type == 2
                    ? renderItemV1
                    : renderItem
                }
                numColumns={numColumns}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
              />
            </Block>
          )}
        </Block>
      </Block>
    </>
  );
};
export default HomeMain;
<View style={styles.inputGroup}>
  <View style={styles.inputContainer}>
    <Icon name="search" size={20} color={Color.textPrimary3} style={styles.inputIcon} />
    <TextInput
      value={""}
      onChangeText={""}
      style={styles.input}
      placeholder="Nhập tên đăng nhập"
      placeholderTextColor="#999"
    />
  </View>
  {/* <View style={{ backgroundColor: Color.mainColor, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="filter" size={20} color={Color.textPrimary3} style={styles.inputIcon} />
          </View> */}

  <TouchableOpacity onPress={() => console.log('Filter icon pressed')}>
    <LinearGradient
      colors={['#FA812F', '#FF5E62']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <Icon name="filter" size={24} color="#FFFFFF" />
    </LinearGradient>
  </TouchableOpacity>


</View>
const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Color.textPrimary3,
    fontFamily: "Roboto-Medium"
  },
  inputContainer: {
    flex: 1,
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
    height: 42,
    // paddingHorizontal: 8,
    color: "#333",
  },
})