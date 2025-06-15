// src/hooks/useAppConfig.js (hoặc src/utils/useAppConfig.js)

import { useSelector } from 'react-redux'
import { APP_VERSION } from '../config/Pro'

const useAppConfig = () => {
  const Api = useSelector((state) => state.SysConfigReducer.API_URL)
  const tokenLogin = useSelector((state) => state.loginReducers.data.data.tokenLogin)
  const userPk = useSelector((state) => state.loginReducers.data.data.tes_user_pk)
  const crt_by = useSelector((state) => state.loginReducers.data.data.crt_by)
  const full_Name = useSelector((state) => state.loginReducers.data.data.full_name)
  const thr_emp_pk = useSelector((state) => state.loginReducers.data.data.thr_emp_pk)
  return {
    Api,
    tokenLogin,
    userPk,
    crt_by,
    APP_VERSION,
    full_Name,
    thr_emp_pk
  }
}

export default useAppConfig
