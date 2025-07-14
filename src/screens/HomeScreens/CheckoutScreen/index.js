import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, FlatList, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../components/Bstore/Header/Header'
import { Color } from '../../../colors/colortv'

import useAppConfig from '../../../utils/useAppConfig'
import sysFetch from '../../../services/fetch_crypt'
import ButtonGradient from '../../../components/Bstore/ButtonGradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'

// Import các component tái sử dụng
import SectionHeader from './components/SectionHeader'
import InfoRow from './components/InfoRow'
import PaymentBox from './components/PaymentBox'
import SelectModal from './components/SelectModal'

const CheckoutScreen = ({ route, navigation }) => {
  const { thr_emp_pk, Api, tokenLogin, crt_by, APP_VERSION, full_Name } = useAppConfig()
  // Nhận params từ CartScreen
  const { total, cartItems, shippingInfo, voucher, shippingFee, tco_depot_pk } = route.params || {}
  const [listArea, setListArea] = useState([])
  const [list_payment_method, setList_payment_method] = useState([])

  // State cho phương thức thanh toán
  const [selectedPayment, setSelectedPayment] = useState();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // State cho khu vực giao hàng
  const [selectedArea, setSelectedArea] = useState();
  const [showAreaModal, setShowAreaModal] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState(""); // Dùng cho hiển thị (dd-MM-yyyy)
  const [deliveryDateApi, setDeliveryDateApi] = useState(""); // Dùng để gửi API (yyyyMMdd)
  const [deliveryTime, setDeliveryTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [note, setNote] = useState("");

  // Chuẩn hóa JSON sản phẩm gửi lên API
  const productsToSend = (cartItems || []).map(item => ({
    tdp_production_pk: item.tdp_production_pk,
    name: item.prod_nm, // map prod_nm sang name
    quantity: item.quantity,
    price: item.price,
    price_type: item.price_type,
    uom: item.uom,
    note: item.note
  }));

  // Tính toán tổng tiền
  const itemTotal = total || 0
  const shipping = shippingFee !== undefined ? shippingFee : 0
  const voucherValue = voucher !== undefined ? voucher : 0
  const finalTotal = itemTotal + shipping + voucherValue

  const data = useSelector((state) => state.loginReducers.data.data)
  // console.log("data: ", data);

  //handle get payment method and delivery area
  const handleGetPaymentMethodAndDeliveryArea = async () => {
    const in_par = {
      p1_varchar2: thr_emp_pk,
      p2_varchar2: tco_depot_pk || "",
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }

    // console.log("Final in_par: ", in_par)

    try {
      const rs = await sysFetch(
        Api,
        {
          pro: "STV_HR_SEL_MBI_HRDP00100_2",
          in_par: in_par,
          out_par: {
            p1_sys: "list_payment_method",
            p2_sys: "list_area",
          },
        },
        tokenLogin,
      )
      if (rs && rs.data.list_area && rs.data.list_payment_method) {
        setListArea(rs.data.list_area);
        setList_payment_method(rs.data.list_payment_method)
      } else {
        // console.log("No data found")
      }
    } catch (error) {
      // console.log("Error:", error)
    }
  }

  useEffect(() => {
    handleGetPaymentMethodAndDeliveryArea()
  }, [])

  // Set lại selected khi có dữ liệu mới từ API
  useEffect(() => {
    if (list_payment_method.length > 0 && !selectedPayment) {
      setSelectedPayment(list_payment_method[0]);
    }
  }, [list_payment_method]);

  useEffect(() => {
    if (listArea.length > 0 && !selectedArea) {
      setSelectedArea(listArea[0]);
    }
  }, [listArea]);

  // Xử lý thanh toán - SỬ DỤNG checkoutData từ state
  const handleCheckout = async () => {
    // Kiểm tra ngày và giờ giao hàng
    if (!deliveryDate) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày giao hàng!');
      return;
    }
    if (!deliveryTime) {
      Alert.alert('Lỗi', 'Vui lòng chọn giờ giao hàng!');
      return;
    }
    // console.log("handle checkout");
    const in_par = {
      p1_varchar2: "INSERT",
      p2_varchar2: cartItems[0]?.tco_depot_pk,
      p3_varchar2: JSON.stringify(productsToSend),
      p4_varchar2: itemTotal,
      p5_varchar2: shipping.toString(),
      p6_varchar2: selectedPayment.code,
      p7_varchar2: thr_emp_pk,
      p8_varchar2: shippingInfo?.name || full_Name,
      p9_varchar2: shippingInfo?.phone || "0971761090",
      p10_varchar2: shippingInfo?.address || "Ho chi minh",
      p11_varchar2: note,
      p12_varchar2: deliveryDateApi,
      p13_varchar2: deliveryTime,
      p14_varchar2: APP_VERSION,
      p15_varchar2: crt_by,
    };
    // console.log("in_par: ", in_par);

    try {
      const response = await sysFetch(
        Api,
        {
          pro: "STV_HR_UPD_MBI_HRDP00100_0",
          in_par,
          out_par: { p1_varchar2: "result" }
        },
        tokenLogin
      );
      if (response.results === 'S') {
        navigation.navigate("OrderSuccess")
        // Alert.alert("Thông báo", "Đơn hàng của bạn đã thành công. Vui lòng chờ phản hồi từ chủ cửa hàng.");
      }
      console.log("response: ", response);
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo đơn hàng.");
    }
  };

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack}>Thanh toán</Header>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Shipping Information */}
        <View style={styles.section}>
          <SectionHeader
            icon="map-marker"
            title="Thông tin khách hàng"
            onEdit={() => navigation.navigate("ShippingInfoScreen")}
          />
          <InfoRow icon="account" text={shippingInfo?.name || 'Thuỷ tiên'} />
          <InfoRow icon="phone" text={shippingInfo?.phone || '0971761090'} />
          <InfoRow icon="map" text={shippingInfo?.address || '132 Đường C1, Tân bình, Hồ Chí Minh'} />
        </View>
        {/* Delivery Area */}
        <View style={styles.section}>
          <SectionHeader
            icon="map-search"
            title="Khu vực giao hàng"
            onEdit={() => setShowAreaModal(true)}
          />
          <PaymentBox icon="map" text={selectedArea ? selectedArea.code_nm : ""} />
        </View>
        {/* Payment Method */}
        <View style={styles.section}>
          <SectionHeader
            icon="credit-card"
            title="Phương thức thanh toán"
            onEdit={() => setShowPaymentModal(true)}
          />
          <PaymentBox icon="cash" text={selectedPayment ? selectedPayment.code_nm : ""} />
        </View>
        {/* Delivery Date & Time */}
        <View style={styles.section}>
          <SectionHeader
            icon="calendar"
            title="Ngày & giờ giao hàng"
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <PaymentBox
              icon="calendar"
              text={deliveryDate || "Chọn ngày"}
              onPress={() => setShowDatePicker(true)}
              style={{ flex: 1, marginRight: 5 }}
            />
            <PaymentBox
              icon="clock-outline"
              text={deliveryTime || "Chọn giờ"}
              onPress={() => setShowTimePicker(true)}
              style={{ flex: 1, marginLeft: 5 }}
            />
          </View>
        </View>
        {/* Note input */}
        <View style={{ backgroundColor: Color.white, borderRadius: 14, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, marginBottom: 6, color: Color.textPrimary2 }}>Ghi chú cho đơn hàng</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#eee',
              borderRadius: 10,
              padding: 12,
              fontSize: 15,
              backgroundColor: '#F7F7F7',
              minHeight: 48
            }}
            value={note}
            onChangeText={setNote}
            placeholder="Nhập ghi chú (nếu có)..."
            multiline
          />
        </View>
        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Tổng</Text><Text style={styles.totalValue}>đ{(itemTotal).toLocaleString()}</Text></View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Phí vận chuyển</Text><Text style={styles.totalValue}>{shipping === 0 ? 'Free' : `$${shipping}`}</Text></View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Giảm giá</Text><Text style={styles.totalValue}>đ0</Text></View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontFamily: 'Roboto-Bold', fontSize: 16 }]}>Tổng đơn hàng</Text>
            <Text style={[styles.totalValue, { color: Color.mainColor, fontWeight: 'bold', fontSize: 18 }]}>đ{(finalTotal).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView >

      {/* Modal chọn khu vực giao hàng */}
      <SelectModal
        visible={showAreaModal}
        title="Chọn khu vực giao hàng"
        data={listArea}
        selected={selectedArea}
        onSelect={setSelectedArea}
        onClose={() => setShowAreaModal(false)}
      />

      {/* Modal chọn phương thức thanh toán */}
      <SelectModal
        visible={showPaymentModal}
        title="Chọn phương thức thanh toán"
        data={list_payment_method}
        selected={selectedPayment}
        onSelect={setSelectedPayment}
        onClose={() => setShowPaymentModal(false)}
      />

      {/* Modal chọn ngày giao hàng - ĐÃ THAY BẰNG DATETIMEPICKER */}
      {
        showDatePicker && (
          <DateTimePicker
            value={deliveryDate ? new Date(deliveryDate) : new Date()}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const d = selectedDate;
                // Hiển thị: dd-MM-yyyy
                const display = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
                setDeliveryDate(display);
                // Gửi API: yyyyMMdd
                const api = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
                setDeliveryDateApi(api);
              }
            }}
          />
        )
      }

      {/* Modal chọn giờ giao hàng - ĐÃ THAY BẰNG DATETIMEPICKER */}
      {
        showTimePicker && (
          <DateTimePicker
            value={deliveryTime ? new Date(`2000-01-01T${deliveryTime}:00`) : new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                const d = selectedTime;
                const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
                setDeliveryTime(timeStr);
              }
            }}
          />
        )
      }

      <ButtonGradient
        onPress={handleCheckout}
        style={styles.placeOrderBtn}
        textStyle={styles.placeOrderText}
      >
        Thanh toán
      </ButtonGradient>

    </View >
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 18,
    color: '#222',
  },
  section: {
    backgroundColor: Color.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: Color.black,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    color: Color.textPrimary2,
  },
  editBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  editText: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoText: {
    marginLeft: 8,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.mainColor,
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
    backgroundColor: '#FFF7F0',
  },
  paymentText: {
    color: Color.textPrimary2,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  addBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  addText: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
  promoRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
  promoBtn: {
    backgroundColor: Color.mainColor,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  promoBtnText: {
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  totalSection: {
    backgroundColor: Color.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    color: Color.textPrimary3,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  totalValue: {
    color: '#222',
    fontSize: 14,
  },
  placeOrderBtn: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  placeOrderText: {
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    marginBottom: 16,
    color: '#222',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})