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
import { LogBox } from "react-native";
import "react-native-gesture-handler";
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
import PDDL from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/index";
import MBHRAP001 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP001_Vang";
import MBHRAP101 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP101_Vang";
import MBHRAP011 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP011_DeNghiTangCa";
import MBHRAP002 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP002_TangCa";
import MBHRAP003 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP003_DiTreVeSom";
import MBHRAP004 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP004_RaCong";
import MBHRAP005 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP005_DiCongTac";
// import MBHRAP006 from './src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP006_ChuyenDoiCaLamViec';
import MBHRAP008 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP008_BoSungCong";
import MBHRAP012 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP012_XeTuyen";
import MBHRAP014 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP014_NhanComHop";
import MBHRAP017 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP017_PheDuyetCapNhatKhongNhanComHop";
import MBHRAP023 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP023_DeNghiDiemDanh";
import MBHRAP025 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP025_DieuDongXe";
import MBHRAP026 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP026_ViPhamCom";
import MBHRAP027 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP027_PheDuyetXeTangCa";

import HPHRIN003 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/HPHRIN003_CongThang";
import MBHRIN001 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN001_CaNhan";
import MBHRIN002 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN002_NgayCong";
import MBHRIN003 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN003_CongThang";
import MBHRIN004 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN004_LuongThang";
import MBHRIN005 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN005_NgayNghi";
import MBHRIN006 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN006_XepLoai";
import MBHRIN007 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN007_LichSuChamCong";
import MBHRIN008 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN008_ViPhamChamCong";
import MBHRIN009 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN009_PhepNam";
import MBHRIN010 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN010_TienThuong";
import MBHRIN011 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN011_QuyetDinh";
import MBHRIN012 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN012_Folder";
import MBHRIN013 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN013_XeDuaRuoc";
import MBHRIN014 from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/MBHRIN014_XeTangCa";
import TVTT from "./src/screens/HomeScreens/MBHRIN_TruyVanThongTin/TVTT";

import DKDL from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/index";
import MBHRRE001 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE001_Vang";
import MBHRRE010 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE010_Vang_V2";
import MBHRRE004 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE004_DangKyTangCa";
import MBHRRE005 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE005_RaCong";
import MBHRRE006 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE006_CongTac";
import MBHRRE007 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE007_XacNhanTangCa";
import MBHRRE008 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE008_BoSungCong";
import MBHRRE011 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE011_DeNghiTangCa";
import EDITREGINFO11 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE011_DeNghiTangCa/EditInfoRegOT";
import APPREGINFO11 from "./src/screens/HomeScreens/MBHRAP_QuanLyPheDuyet/MBHRAP011_DeNghiTangCa/EditInfoRegOT";
import EDITREGINFO23 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE023_DeNghiPheDuyetDiemDanh/EditInfoRegOT";
import MBHRRE012 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE012_DangKyXeTuyen";
import MBHRRE014 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE014_DangKyNhanComHop";
import MBHRRE015 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE015_DangKyNhanComChay";
import MBHRRE016 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE016_DangKyKhongAnCom";
import MBHRRE017 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE017_CapNhatKhongNhanComHop";
import MBHRRE018 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE018_DiemDanh";
import MBHRRE019 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE019_DieuChinhBuaAnDotXuat";
import MBHRRE020 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE020_DangKyNhanComHopTBP";
import MBHRRE021 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE021_CapNhatKhongNhanComHopTBP";
import MBHRRE022 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE022_DangKySuatAnKhacCaLamViec";
import MBHRRE023 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE023_DeNghiPheDuyetDiemDanh";
import MBHRRE024 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE024_CapNhatAnComTroLai";
import MBHRRE025 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE025_DangKyDieuDongXe";
import MBHRRE026 from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE026_DangKyThucDon";

import DKDLC from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/index";
import MBHRRI000 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI000_ThongTinDangKyCom";
import MBHRRI001 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI001_DangKyNhanComChay";
import ChiTietNhanComChay from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI001_DangKyNhanComChay/DanhSach/ChiTietNhanComChay";
import MBHRRI002 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI002_DangKyKhongAnCom";
import ChiTietKhongAnCom from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI002_DangKyKhongAnCom/DanhSach/ChiTietKhongAnCom";
import MBHRRI003 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI003_CapNhatAnComTroLai";
import ChiTietAnComTroLai from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI003_CapNhatAnComTroLai/DanhSach/ChiTiet";
import MBHRRI004 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI004_DangKySuatAnKhacCaLamViec";
import ChiTietSuatAnKhacCaLamViec from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI004_DangKySuatAnKhacCaLamViec/DanhSach/ChiTiet";
import MBHRRI005 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI005_DieuChinhBuaAnDotXuat";
import ChiTietBuaAnDotXuat from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI005_DieuChinhBuaAnDotXuat/DanhSach/ChiTietBuaAnDotXuat";
import MBHRRI006 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI006_CapNhatKhongNhanComHop";
import MBHRRI007 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI007_DangKyNhanComHopTBP";
import ChiTietNhanComHop from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI007_DangKyNhanComHopTBP/DanhSach/ChiTietNhanComHop";
import MBHRRI008 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI008_CapNhatKhongNhanComHopTBP";
import ChiTietCapNhatKhongNhanComHop from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI008_CapNhatKhongNhanComHopTBP/DanhSach/ChiTietCapNhatKhongNhanComHop";
import MBHRRI009 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI009_DangKyMan";
import ChiTietMan from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI009_DangKyMan/DanhSach/ChiTietMan";
import MBHRRI010 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI010_DangKyChay";
import ChiTietChay from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI010_DangKyChay/DanhSach/ChiTietChay";
import MBHRRI011 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI011_XacNhanLyDoViPhamCom";
import MBHRRI012 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI012_DangKyComTangCaDauMoi";
import ChiTietComTangCa from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI012_DangKyComTangCaDauMoi/DanhSach/ChiTietComTangCa";
import MBHRRI013 from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI013_DangKyComKhiDiMuon";
import ChiTietKhiDiMuon from "./src/screens/HomeScreens/MBHRRI_DangKyDuLieuCom/MBHRRI013_DangKyComKhiDiMuon/DanhSach/ChiTietKhiDiMuon";

import MBHRTI001 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI001_ChamCong";
import MBHRTI002 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI002_DangKyKhuonMat";
import MBHRTI003 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI003_DuLieuChamCong";
import MBHRTI004 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI004_DangKyKhuonMatFe";
import MBHRTI005 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI005_DangKyKhuonMatHIK";
import MBHRTI006 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI006_DangKyChamCongUBIO_test";
import MBHRTI007 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI007_DangKyChamCongMita";
import MBHRTI008 from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI008_MayChamCong";
import MBHRTI008_ChiTiet from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI008_MayChamCong/ChiTiet";
import MBHRTI008_TimKiem from "./src/screens/HomeScreens/MBHRTI_ChamCongKhuonMat/MBHRTI008_MayChamCong/TimKiem";
import SecurityMethod from "./src/screens/HomeScreens/SecurityMethod";
import SystemSecurity from "./src/screens/HomeScreens/SecurityMethod/SystemSecurity";
import UpdatePassword from "./src/screens/HomeScreens/SecurityMethod/UpdatePassword";

import QuestionSecurity from "./src/screens/HomeScreens/SecurityMethod/QuestionSecurity";
import EmailSecurity from "./src/screens/HomeScreens/SecurityMethod/EmailSecurity";

import QR_WALLET from "./src/screens/HomeScreens/MBHRQR_QRWallet";
import QR_Detail from "./src/screens/HomeScreens/MBHRQR_QRWallet/detail";
import MBHRCD from "./src/screens/HomeScreens/MBHRCD_TheNhanVien";

import CheckLogin from "./src/screens/SystemScreens/CheckLogin";
import ConfigThemeScreen from "./src/screens/SystemScreens/ConfigTheme";
import ForgotPass from "./src/screens/SystemScreens/ForgotPassword";
import LoginScreen from "./src/screens/SystemScreens/LoginScreen";
import RegisterAccount from "./src/screens/SystemScreens/RegisterAccount";
// import SysConfig from "./src/screens/SystemScreens/SysConfig";
import UpdatePass from "./src/screens/SystemScreens/UpdatePass";
import UpdatePassQuestionSecurity from "./src/screens/SystemScreens/UpdatePassQuestionSecurity";

import MBHRPR from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/index";
import MBHRPR001 from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/MBHRPR001_NhapSanLuongTrucTiep";
import MBHRPR002 from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/MBHRPR002_NhapSanLuongTheoCum";
import MBHRPR003 from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/MBHRPR003_ThongTinSanLuong";
import AddNewLSL from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/MBHRPR001_NhapSanLuongTrucTiep/DangKy";
import AddNewLSLTC from "./src/screens/HomeScreens/MBHRPR_LuongSanLuong/MBHRPR002_NhapSanLuongTheoCum/DangKy";

import MBHRMT from "./src/screens/HomeScreens/MBHRMT_GS/index";
import MBHRMT001 from "./src/screens/HomeScreens/MBHRMT_GS/MBHRMT001_Monitering";
import MBHRMT002 from "./src/screens/HomeScreens/MBHRMT_GS/MBHRMT002_ScanQR";
import MBHRMT003 from "./src/screens/HomeScreens/MBHRMT_GS/MBHRMT003_ControlLockDoor";

import MBHRRG from "./src/screens/HomeScreens/MBHRRG_DangKyDuLieu";
import MBHRRG001 from "./src/screens/HomeScreens/MBHRRG_DangKyDuLieu/MBHRRG001_Vang";
import MBHRRG002 from "./src/screens/HomeScreens/MBHRRG_DangKyDuLieu/MBHRRG002_RaCong";
import MBHRRG003 from "./src/screens/HomeScreens/MBHRRG_DangKyDuLieu/MBHRRG003_DangKyTangCa";
import MBHRRG004 from "./src/screens/HomeScreens/MBHRRG_DangKyDuLieu/MBHRRG004_BoSungCong";

import MBHRAR from "./src/screens/HomeScreens/MBHRAR_QuanLyPheDuyet";
import MBHRAR001 from "./src/screens/HomeScreens/MBHRAR_QuanLyPheDuyet/MBHRAR001_Vang";
import MBHRAR002 from "./src/screens/HomeScreens/MBHRAR_QuanLyPheDuyet/MBHRAR002_RaCong";
import MBHRAR003 from "./src/screens/HomeScreens/MBHRAR_QuanLyPheDuyet/MBHRAR003_TangCa";
import MBHRAR004 from "./src/screens/HomeScreens/MBHRAR_QuanLyPheDuyet/MBHRAR004_BoSungCong";

import MBHRSV from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia";
import MBHRSV001 from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV001_PhieuDanhGia";
import MBHRSV002 from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV002_PhieuDanhGiaNhaAnNgay";
import MBHRSV003 from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV003_PhieuDanhGiaNhaAnThang";
import MBHRSV004 from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV004_PhieuDanhGiaXeTuyen";
import MBHRSV005 from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV005_PhieuDanhGiaThucDon";
import UpdatePDG from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV002_PhieuDanhGiaNhaAnNgay/DanhSach/Update";
import UpdatePDGT from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV003_PhieuDanhGiaNhaAnThang/DanhSach/Update";
import UpdatePDGXT from "./src/screens/HomeScreens/MBHRSV_KhaoSatDanhGia/MBHRSV004_PhieuDanhGiaXeTuyen/DanhSach/Update";

import MBHRSY from "./src/screens/HomeScreens/MBHRSY_TongHop";
import MBHRSY001 from "./src/screens/HomeScreens/MBHRSY_TongHop/MBHRSY001_Dev";

import MBHRSI from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline";
import MBHRSG001 from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG001_KyDuyetDonTu";
import NoiDungTrinhKy from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG001_KyDuyetDonTu/ChoKy/NoiDungTrinhKy";
import NoiDungDaKy from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG001_KyDuyetDonTu/DaKy/NoiDungDaKy";
import NoiDungHuyKy from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG001_KyDuyetDonTu/HuyKy/NoiDungHuyKy";
import MBHRSG002 from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG002_KyHopDongLaoDong";

import UpdateDD from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE018_DiemDanh/DanhSach/UpdateDD";
// import ChiTietNhanComChay from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE015_DangKyNhanComChay/DanhSach/ChiTietNhanComChay";
// import ChiTietKhongAnCom from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE016_DangKyKhongAnCom/DanhSach/ChiTietKhongAnCom";
// import ChiTietBuaAnDotXuat from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE019_DieuChinhBuaAnDotXuat/DanhSach/ChiTietBuaAnDotXuat";
// import ChiTietNhanComHop from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE020_DangKyNhanComHopTBP/DanhSach/ChiTietNhanComHop";
// import ChiTietCapNhatKhongNhanComHop from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE021_CapNhatKhongNhanComHopTBP/DanhSach/ChiTietCapNhatKhongNhanComHop";
// import ChiTietSuatAnKhacCaLamViec from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE022_DangKySuatAnKhacCaLamViec/DanhSach/ChiTiet";
// import ChiTietAnComTroLai from "./src/screens/HomeScreens/MBHRRE_DangKyDuLieu/MBHRRE024_CapNhatAnComTroLai/DanhSach/ChiTiet";

import MBHRWO from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec";
import MBHRWO001 from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO001_CongViecGiao";
import MBHRWO001_ChiTiet from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO001_CongViecGiao/ChiTiet/ChiTietCongViec";
import MBHRWO001_Update from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO001_CongViecGiao/ModalUpdate";
import MBHRWO002 from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO002_CongViecThucHien";
import MBHRWO002_ChiTiet from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO002_CongViecThucHien/ChiTiet/ChiTietCongViec";
import MBHRWO003 from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO003_TongHopCongViec";
import MBHRWO004 from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO004_CongViecTheoDoi";
import MBHRWO004_ChiTiet from "./src/screens/HomeScreens/MBHRWO_QuanLyCongViec/MBHRWO004_CongViecTheoDoi/ChiTiet/ChiTietCongViec";

import MBHRBS from "./src/screens/HomeScreens/MBHRBS_XeDuaRuoc";
import MBHRBS001 from "./src/screens/HomeScreens/MBHRBS_XeDuaRuoc/MBHRBS001_CheckInOutRoute";
import MBHRBS001_ChiTiet from "./src/screens/HomeScreens/MBHRBS_XeDuaRuoc/MBHRBS001_CheckInOutRoute/ChiTiet";
import MBHRBS002 from "./src/screens/HomeScreens/MBHRBS_XeDuaRuoc/MBHRBS002_DangKyXeTuyen";
import MBHRBS003 from "./src/screens/HomeScreens/MBHRBS_XeDuaRuoc/MBHRBS003_DangKyXeTangCa";
import ChiTietHopDongLaoDong from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG002_KyHopDongLaoDong/ChiTietHopDongLaoDong";
import KyThanhCong from "./src/screens/HomeScreens/MBHRSG_KyDuyetOnline/MBHRSG002_KyHopDongLaoDong/KyThanhCong";

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
      {/* <NotificationAlert visible={visible} content={content} /> */}
      <SafeAreaProvider>
        <GlobalLoading />
        <Popup />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ConfigThemeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="ConfigThemeScreen" component={ConfigThemeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="RegisterAccount" component={RegisterAccount} />
            <Stack.Screen name="CheckLogin" component={CheckLogin} />
            <Stack.Screen name="UpdatePass" component={UpdatePass} />
            <Stack.Screen name="UpdatePassQuestionSecurity" component={UpdatePassQuestionSecurity} />
            {/* <Stack.Screen name="SysConfig" component={SysConfig} /> */}
            <Stack.Screen name="Index" component={Index} options={{ gestureEnabled: false, }} />
            <Stack.Screen name="MBHRIN" component={TVTT} />
            <Stack.Screen name="MBHRIN001" component={MBHRIN001} />
            <Stack.Screen name="MBHRIN002" component={MBHRIN002} />
            <Stack.Screen name="MBHRIN003" component={MBHRIN003} />
            <Stack.Screen name="MBHRIN004" component={MBHRIN004} />
            <Stack.Screen name="MBHRIN005" component={MBHRIN005} />
            <Stack.Screen name="MBHRIN007" component={MBHRIN007} />
            <Stack.Screen name="MBHRIN006" component={MBHRIN006} />
            <Stack.Screen name="MBHRIN008" component={MBHRIN008} />
            <Stack.Screen name="MBHRIN009" component={MBHRIN009} />
            <Stack.Screen name="HPHRIN003" component={HPHRIN003} />
            <Stack.Screen name="MBHRIN010" component={MBHRIN010} />
            <Stack.Screen name="MBHRIN011" component={MBHRIN011} />
            <Stack.Screen name="MBHRIN012" component={MBHRIN012} />
            <Stack.Screen name="MBHRIN013" component={MBHRIN013} />
            <Stack.Screen name="MBHRIN014" component={MBHRIN014} />

            <Stack.Screen name="MBHRRE" component={DKDL} />
            <Stack.Screen name="MBHRRE007" component={MBHRRE007} />
            <Stack.Screen name="MBHRRE001" component={MBHRRE001} />
            <Stack.Screen name="MBHRRE004" component={MBHRRE004} />
            <Stack.Screen name="MBHRRE005" component={MBHRRE005} />
            <Stack.Screen name="MBHRRE006" component={MBHRRE006} />
            <Stack.Screen name="MBHRRE008" component={MBHRRE008} />
            <Stack.Screen name="MBHRRE010" component={MBHRRE010} />
            <Stack.Screen name="MBHRRE011" component={MBHRRE011} />
            <Stack.Screen name="MBHRRE012" component={MBHRRE012} />
            <Stack.Screen name="MBHRRE014" component={MBHRRE014} />
            <Stack.Screen name="MBHRRE015" component={MBHRRE015} />
            <Stack.Screen name="MBHRRE016" component={MBHRRE016} />
            <Stack.Screen name="MBHRRE017" component={MBHRRE017} />
            <Stack.Screen name="MBHRRE018" component={MBHRRE018} />
            <Stack.Screen name="MBHRRE019" component={MBHRRE019} />
            <Stack.Screen name="MBHRRE020" component={MBHRRE020} />
            <Stack.Screen name="MBHRRE021" component={MBHRRE021} />
            <Stack.Screen name="MBHRRE022" component={MBHRRE022} />
            <Stack.Screen name="MBHRRE023" component={MBHRRE023} />
            <Stack.Screen name="MBHRRE024" component={MBHRRE024} />
            <Stack.Screen name="MBHRRE025" component={MBHRRE025} />
            <Stack.Screen name="MBHRRE026" component={MBHRRE026} />
            <Stack.Screen name="MBHRRE011_EDIT_REG_INFO" component={EDITREGINFO11} />
            <Stack.Screen name="MBHRAP011_EDIT_REG_INFO" component={APPREGINFO11} />

            <Stack.Screen name="MBHRRE023_EDIT_REG_INFO" component={EDITREGINFO23} />

            <Stack.Screen name="MBHRPR" component={MBHRPR} />
            <Stack.Screen name="MBHRPR001" component={MBHRPR001} />
            <Stack.Screen name="MBHRPR002" component={MBHRPR002} />
            <Stack.Screen name="MBHRPR003" component={MBHRPR003} />
            <Stack.Screen name="AddNewLSL" component={AddNewLSL} />
            <Stack.Screen name="AddNewLSLTC" component={AddNewLSLTC} />

            <Stack.Screen name="MBHRRG" component={MBHRRG} />
            <Stack.Screen name="MBHRRG001" component={MBHRRG001} />
            <Stack.Screen name="MBHRRG002" component={MBHRRG002} />
            <Stack.Screen name="MBHRRG003" component={MBHRRG003} />
            <Stack.Screen name="MBHRRG004" component={MBHRRG004} />
            <Stack.Screen name="MBHRAP" component={PDDL} />
            <Stack.Screen name="MBHRAP001" component={MBHRAP001} />
            <Stack.Screen name="MBHRAP002" component={MBHRAP002} />
            <Stack.Screen name="MBHRAP003" component={MBHRAP003} />
            <Stack.Screen name="MBHRAP004" component={MBHRAP004} />
            <Stack.Screen name="MBHRAP005" component={MBHRAP005} />
            {/* <Stack.Screen name="MBHRAP006" component={MBHRAP006} /> */}
            <Stack.Screen name="MBHRAP008" component={MBHRAP008} />
            <Stack.Screen name="MBHRAP101" component={MBHRAP101} />
            <Stack.Screen name="MBHRAP011" component={MBHRAP011} />
            <Stack.Screen name="MBHRAP012" component={MBHRAP012} />
            <Stack.Screen name="MBHRAP014" component={MBHRAP014} />
            <Stack.Screen name="MBHRAP017" component={MBHRAP017} />
            <Stack.Screen name="MBHRAP023" component={MBHRAP023} />
            <Stack.Screen name="MBHRAP025" component={MBHRAP025} />
            <Stack.Screen name="MBHRAP026" component={MBHRAP026} />
            <Stack.Screen name="MBHRAP027" component={MBHRAP027} />

            <Stack.Screen name="MBHRTI" component={CCKM} />
            <Stack.Screen name="MBHRTI001" component={MBHRTI001} />
            <Stack.Screen name="MBHRTI002" component={MBHRTI002} />
            <Stack.Screen name="MBHRTI003" component={MBHRTI003} />
            <Stack.Screen name="MBHRTI004" component={MBHRTI004} />
            <Stack.Screen name="MBHRTI005" component={MBHRTI005} />
            <Stack.Screen name="MBHRTI006" component={MBHRTI006} />
            <Stack.Screen name="MBHRTI007" component={MBHRTI007} />
            <Stack.Screen name="MBHRTI008" component={MBHRTI008} />
            <Stack.Screen name="MBHRTI008_ChiTiet" component={MBHRTI008_ChiTiet} />
            <Stack.Screen name="MBHRTI008_TimKiem" component={MBHRTI008_TimKiem} />

            <Stack.Screen name="MBHRTK" component={BDTK} />
            <Stack.Screen name="MBHRTK002" component={MBHRTK002} />
            <Stack.Screen name="MBHRTK001" component={MBHRTK001} />
            <Stack.Screen name="MBHRTK003" component={MBHRTK003} />
            <Stack.Screen name="MBHRTK004" component={MBHRTK004} />
            <Stack.Screen name="MBHRDT" component={QLDT} />
            <Stack.Screen name="MBHRDT001" component={MBHRDT001} />
            <Stack.Screen name="MBHRDT002" component={MBHRDT002} />
            <Stack.Screen name="MBHRMN" component={QLDL} />
            <Stack.Screen name="MBHRMN005" component={MBHRMN006} />
            <Stack.Screen name="MBHRMN012" component={MBHRMN012} />
            <Stack.Screen name="MBHRMN001" component={MBHRMN001} />
            <Stack.Screen name="MBHRMN001_CREATE_NEW_EMPLOYEE" component={CreateNewEmployee} />
            <Stack.Screen name="SecurityMethod" component={SecurityMethod} />
            <Stack.Screen name="SystemSecurity" component={SystemSecurity} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="QuestionSecurity" component={QuestionSecurity} />
            <Stack.Screen name="EmailSecurity" component={EmailSecurity} />

            <Stack.Screen name="QR_WALLET" component={QR_WALLET} />
            <Stack.Screen name="QR_Detail" component={QR_Detail} />
            <Stack.Screen name="MBHRCD" component={MBHRCD} />

            <Stack.Screen name="MBHRMT" component={MBHRMT} />
            <Stack.Screen name="MBHRMT001" component={MBHRMT001} />
            <Stack.Screen name="MBHRMT002" component={MBHRMT002} />
            <Stack.Screen name="MBHRMT003" component={MBHRMT003} />
            <Stack.Screen name="MBHRAR" component={MBHRAR} />
            <Stack.Screen name="MBHRAR001" component={MBHRAR001} />
            <Stack.Screen name="MBHRAR002" component={MBHRAR002} />
            <Stack.Screen name="MBHRAR003" component={MBHRAR003} />
            <Stack.Screen name="MBHRAR004" component={MBHRAR004} />

            <Stack.Screen name="MBHRSV" component={MBHRSV} />
            <Stack.Screen name="MBHRSV001" component={MBHRSV001} />
            <Stack.Screen name="MBHRSV002" component={MBHRSV002} />
            <Stack.Screen name="MBHRSV003" component={MBHRSV003} />
            <Stack.Screen name="MBHRSV004" component={MBHRSV004} />
            <Stack.Screen name="MBHRSV005" component={MBHRSV005} />

            <Stack.Screen name="UpdatePDG" component={UpdatePDG} />
            <Stack.Screen name="UpdatePDGT" component={UpdatePDGT} />
            <Stack.Screen name="UpdatePDGXT" component={UpdatePDGXT} />

            <Stack.Screen name="MBHRSY" component={MBHRSY} />
            <Stack.Screen name="MBHRSY001" component={MBHRSY001} />
            <Stack.Screen name="MBHRSI" component={MBHRSI} />
            <Stack.Screen name="MBHRSG001" component={MBHRSG001} />
            <Stack.Screen name="NoiDungTrinhKy" component={NoiDungTrinhKy} />
            <Stack.Screen name="NoiDungDaKy" component={NoiDungDaKy} />
            <Stack.Screen name="NoiDungHuyKy" component={NoiDungHuyKy} />
            <Stack.Screen name="UpdateDD" component={UpdateDD} />
            <Stack.Screen name="ChiTietKhongAnCom" component={ChiTietKhongAnCom} />
            <Stack.Screen name="ChiTietNhanComChay" component={ChiTietNhanComChay} />
            <Stack.Screen name="ChiTietBuaAnDotXuat" component={ChiTietBuaAnDotXuat} />
            <Stack.Screen name="ChiTietNhanComHop" component={ChiTietNhanComHop} />
            <Stack.Screen name="ChiTietCapNhatKhongNhanComHop" component={ChiTietCapNhatKhongNhanComHop} />
            <Stack.Screen name="ChiTietSuatAnKhacCaLamViec" component={ChiTietSuatAnKhacCaLamViec} />
            <Stack.Screen name="ChiTietAnComTroLai" component={ChiTietAnComTroLai} />
            <Stack.Screen name="ChiTietMan" component={ChiTietMan} />
            <Stack.Screen name="ChiTietChay" component={ChiTietChay} />
            <Stack.Screen name="ChiTietComTangCa" component={ChiTietComTangCa} />
            <Stack.Screen name="ChiTietKhiDiMuon" component={ChiTietKhiDiMuon} />
            {/* Ky hop dong lao dong */}
            <Stack.Screen name="MBHRSG002" component={MBHRSG002} />
            <Stack.Screen name="ChiTietHopDongLaoDong" component={ChiTietHopDongLaoDong} />
            <Stack.Screen name="KyThanhCong" component={KyThanhCong} />

            <Stack.Screen name="MBHRRI" component={DKDLC} />
            <Stack.Screen name="MBHRRI000" component={MBHRRI000} />
            <Stack.Screen name="MBHRRI001" component={MBHRRI001} />
            <Stack.Screen name="MBHRRI002" component={MBHRRI002} />
            <Stack.Screen name="MBHRRI003" component={MBHRRI003} />
            <Stack.Screen name="MBHRRI004" component={MBHRRI004} />
            <Stack.Screen name="MBHRRI005" component={MBHRRI005} />
            <Stack.Screen name="MBHRRI006" component={MBHRRI006} />
            <Stack.Screen name="MBHRRI007" component={MBHRRI007} />
            <Stack.Screen name="MBHRRI008" component={MBHRRI008} />
            <Stack.Screen name="MBHRRI009" component={MBHRRI009} />
            <Stack.Screen name="MBHRRI010" component={MBHRRI010} />
            <Stack.Screen name="MBHRRI011" component={MBHRRI011} />
            <Stack.Screen name="MBHRRI012" component={MBHRRI012} />
            <Stack.Screen name="MBHRRI013" component={MBHRRI013} />

            <Stack.Screen name="MBHRWO" component={MBHRWO} />
            <Stack.Screen name="MBHRWO001" component={MBHRWO001} />
            <Stack.Screen name="MBHRWO001_Update" component={MBHRWO001_Update} />
            <Stack.Screen name="MBHRWO001_ChiTiet" component={MBHRWO001_ChiTiet} />
            <Stack.Screen name="MBHRWO002" component={MBHRWO002} />
            <Stack.Screen name="MBHRWO002_ChiTiet" component={MBHRWO002_ChiTiet} />
            <Stack.Screen name="MBHRWO003" component={MBHRWO003} />
            <Stack.Screen name="MBHRWO004" component={MBHRWO004} />
            <Stack.Screen name="MBHRWO004_ChiTiet" component={MBHRWO004_ChiTiet} />

            <Stack.Screen name="MBHRBS" component={MBHRBS} />
            <Stack.Screen name="MBHRBS001" component={MBHRBS001} />
            <Stack.Screen name="MBHRBS001_ChiTiet" component={MBHRBS001_ChiTiet} />
            <Stack.Screen name="MBHRBS002" component={MBHRBS002} />
            <Stack.Screen name="MBHRBS003" component={MBHRBS003} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);

export default App;
