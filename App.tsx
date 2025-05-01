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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);

export default App;
