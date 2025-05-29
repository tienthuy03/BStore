import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

const PostImage = ({ pk, table_nm, column_nm, token, api }) => {
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.post(
          `${api}Exec/GetImageFromBlob?pk=${pk}&table_nm=${table_nm}&column_nm=${column_nm}`,
          {}, // post body rỗng nếu API chỉ cần query string
          {
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contentType = res.headers['content-type']; // e.g., image/png
        const base64 = Buffer.from(res.data, 'binary').toString('base64');
        setImageBase64(`data:${contentType};base64,${base64}`);
      } catch (err) {
        console.error('Lỗi tải ảnh từ API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [pk, table_nm, column_nm, token]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <Image
      source={{ uri: imageBase64 }}
      style={{ width: 300, height: 300 }}
      resizeMode="contain"
    />
  );
};

export default PostImage;
