import axios from 'axios';
import {deviceId} from '../../constants';

const sysFetch = (api, image_uri, token) => {
  let axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(
      api + 'Exec/GetImageFromBlob?'+image_uri,
      axiosConfig,
    )
    .then(response => {
      // console.log('response ', response);
      return response.data;
    })
    .catch(err => {
      console.log('err sysFetch', err);
      if (err == 'AxiosError: Request failed with status code 401') {
        return 'Token Expired';
      } else {
        console.log('err sysFetch');
        console.log(err);
      }
    });
};
export default sysFetch;
