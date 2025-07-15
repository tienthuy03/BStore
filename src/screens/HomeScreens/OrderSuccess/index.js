import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../../colors/colortv'
import LottieView from 'lottie-react-native'
import ButtonGradient from '../../../components/Bstore/ButtonGradient'

const OrderSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/Successful.json")}
        style={{ width: 400, height: 200 }}
        autoPlay
        loop
      />
      <Text style={styles.txtOrder}>Đặt đơn thành công</Text>
      <Text style={styles.txtWaiting}>Vui lòng chờ phản hồi từ chủ cửa hàng</Text>
      <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate('Index', { screen: 'Home' })}>
        <Text style={styles.btnHomeText}>Về trang chủ</Text>
      </TouchableOpacity>

    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
  txtWaiting: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Color.textPrimary3
  },
  txtOrder: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Color.textPrimary2,
    marginBottom: 8
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnHome: {
    paddingTop: 12
  },
  btnHomeText: {
    textDecorationLine: 'underline',
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    width: '100%'
  },
}) 