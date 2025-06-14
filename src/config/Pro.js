import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
//Pro menu
export const SELHRMENU0 = "SELHRMENU0";
//Pro form truy van thong tin
export const SELHRIN0010100 = "SELHRIN0010100";
export const SELHRIN0020100 = "SELHRIN0020100";
export const SELHRIN0030100 = "SELHRIN0030100";
export const SELHRIN0040100 = "SELHRIN0040100";
export const SELHRIN0040101 = "SELHRIN0040101";
export const SELHRIN0050100 = "SELHRIN0050100";
export const SELHRIN0060100 = "SELHRIN0060100";
export const SELHRIN0070100 = "SELHRIN0070100";
export const SELHRIN0080100 = "SELHRIN0080100";

//Pro from dang ky du lieu
export const SELHRRE0070101 = "SELHRRE0070101";
export const SELHRRE0010101 = "SELHRRE0010101";
export const SELHRRE0100100 = "SELHRRE0100100";
export const SELHRRE0100101 = "SELHRRE0100101";
export const SELHRRE0012100 = "SELHRRE0012100";
export const SELHRRE0040100 = "SELHRRE0040100";
export const SELHRRE0041100 = "SELHRRE0041100";
export const UPDHRRE0011100 = "UPDHRRE0011100";
export const UPDHRRE0070101 = "UPDHRRE0070101";

//Phe duyet du lieu
export const SELHRAP0010101 = "SELHRAP0010101";
export const SELHRAP0020101 = "SELHRAP0020101";
export const UPDHRAP0010101 = "UPDHRAP0010101";
export const UPDHRRE0041100 = "UPDHRRE0041100";
export const SELHRAP1010100 = "SELHRAP1010100";
export const UPDHRAP1010100 = "UPDHRAP1010100";

//Pro Dictionnary
export const SELSYSDICT0100 = "SELSYSDICT0100";

//'http://tinvietsoft.com/tvs_api/api/'; 102
//'http://tinvietsoft.com/tinviet_api/api/'; tinviet
//'http://117.2.160.99:92/hpdqapi/api/'; 40
//'http://117.2.160.69:91/hpdqapi/api/'; 39
//'http://125.234.111.211/leadingstar_api/api/'; leadingstar

export const APP_VERSION = "1.0.0";

export const ServerIP = {
  tvs: "http://115.73.215.94:8082/new_api/api/",
  // tvs: "http://26.241.193.222:8082/api/",
};
export const configAPI = [
  {
    API_NAME: "http://115.73.215.94:8082/new_api/api/",
    // API_NAME: "http://26.241.193.222:8082/api/",
    CLIENT_ID: "SYSHR",
    CLIENT_KEY: "syshr@2025",
  },

];

export const ClientIdDefault = "TINVIET";
export const buildFor = "tvs";

export const ipServer = () => {
  const url = AsyncStorage.getItem("API_URL");
  let temp = ServerIP.tvs;
  console.log(" ************** url api_url ", url);
  if (url === null) {
    AsyncStorage.setItem("API_URL", ServerIP.tvs);
  } else {
    temp = url;
  }
  return temp;
};
export const nameApi = "TsMobileAPI.asmx";
