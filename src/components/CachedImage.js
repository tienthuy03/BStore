// CachedImage.js
import React from 'react';
import FastImage from 'react-native-fast-image';

const CachedImage = ({ pk, table_nm, column_nm, token, api}) => {
  let uri = `${api}Exec/GetImageFromBlob?pk=${pk}&table_nm=${table_nm}&column_nm=${column_nm}`;
  return (
    <FastImage
      source={{
        uri,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={{ width: 300, height: 300 }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default CachedImage;
