// CachedImage.js
import React from 'react';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from "react-redux";

const CachedImage = ({ image_uri, style }) => {
  const API = useSelector((state) => state.SysConfigReducer.API_URL);
  let tokenLogin = useSelector((state) => state.loginReducers.data.data.tokenLogin);
  let uri = `${API}Exec/GetImageFromBlob?${image_uri}`;
  return (
    <FastImage
      source={{
        uri,
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
        },
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={style}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default CachedImage;
