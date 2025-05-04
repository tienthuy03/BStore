import AsyncStorage from '@react-native-community/async-storage';
import {put} from '@redux-saga/core/effects';
import {Color} from '../../colors/colorhp';
import {buildFor, ServerIP} from '../../config/Pro';
import {SetApiURL} from '../redux/SysConfig/action';
import {sysLoadTheme} from '../redux/System/action';
function* globalstorage() {
  if (buildFor === 'bst') {
    const rs = yield AsyncStorage.getItem('themeName');
    const apiUrl = yield AsyncStorage.getItem('API_URL');
    yield put(SetApiURL(apiUrl));
  } else {
    AsyncStorage.setItem('themeName', '2');
    AsyncStorage.setItem('API_URL', ServerIP.bst);
    yield put(SetApiURL(ServerIP.bst));
    yield put(sysLoadTheme(Color));
  }
}
export {globalstorage};
