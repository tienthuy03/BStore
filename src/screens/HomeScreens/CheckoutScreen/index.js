import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../../components/Bstore/Header/Header'
import { Color } from '../../../colors/colortv'
import GradientButton from '../../../components/Button'
import LinearGradient from 'react-native-linear-gradient'
import useAppConfig from '../../../utils/useAppConfig'
import sysFetch from '../../../services/fetch_crypt'
import ButtonGradient from '../../../components/Bstore/ButtonGradient'


const CheckoutScreen = ({ route, navigation }) => {
  const { thr_emp_pk, Api, tokenLogin, crt_by, APP_VERSION } = useAppConfig()
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


  // Loại bỏ image_uri khỏi danh sách sản phẩm gửi đi
  const productsToSend = (cartItems || []).map(({ image_uri, ...rest }) => rest)

  // Tính toán tổng tiền
  const itemTotal = total || 0
  const shipping = shippingFee !== undefined ? shippingFee : 0
  const voucherValue = voucher !== undefined ? voucher : 0
  const finalTotal = itemTotal + shipping + voucherValue


  //handle get payment method and delivery area
  const handleGetPaymentMethodAndDeliveryArea = async () => {
    const in_par = {
      p1_varchar2: thr_emp_pk,
      p2_varchar2: tco_depot_pk || "",
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }

    console.log("Final in_par: ", in_par)

    try {
      const rs = await sysFetch(
        Api,
        {
          pro: "STV_HR_SEL_MBI_HRDP00100_2",
          in_par: in_par,
          out_par: {
            p1_sys: "list_area",
            p2_sys: "list_payment_method",
          },
        },
        tokenLogin,
      )
      console.log("Payment response: ", rs.data.list_area
      )
      if (rs && rs.data.list_area && rs.data.list_area) {
        setListArea(rs.data.list_area);
        setList_payment_method(rs.data.list_payment_method)



      } else {
        console.log("No data found")
      }
    } catch (error) {
      console.log("Error:", error)
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

  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack}>Thanh toán</Header>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Shipping Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="map-marker" size={20} color={Color.mainColor} />
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
            <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Chỉnh sửa</Text></TouchableOpacity>
          </View>
          <View style={styles.infoRow}><Icon name="account" size={16} color="#888" /><Text style={styles.infoText}>{shippingInfo?.name || 'Eleanor Pena'}</Text></View>
          <View style={styles.infoRow}><Icon name="phone" size={16} color="#888" /><Text style={styles.infoText}>{shippingInfo?.phone || '(303) 555-0105'}</Text></View>
          <View style={styles.infoRow}><Icon name="map" size={16} color="#888" /><Text style={styles.infoText}>{shippingInfo?.address || '4517 Washington Ave. Manchester, Kentucky 39495'}</Text></View>
        </View>
        {/* Delivery Area */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="map-search" size={20} color={Color.mainColor} />
            <Text style={styles.sectionTitle}>Khu vực giao hàng</Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => setShowAreaModal(true)}>
              <Text style={styles.editText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentBox}>
            <Icon name={"location"} size={18} color={Color.mainColor} style={{ marginRight: 8 }} />
            <Text style={styles.paymentText}>{selectedArea ? selectedArea.code_nm : ""}</Text>
          </View>
        </View>
        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="credit-card" size={20} color={Color.mainColor} />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => setShowPaymentModal(true)}>
              <Text style={styles.editText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentBox}>
            <Icon name={"cash"} size={18} color={Color.mainColor} style={{ marginRight: 8 }} />
            <Text style={styles.paymentText}>{selectedPayment ? selectedPayment.code_nm : ""}</Text>
          </View>
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
      </ScrollView>

      {/* Modal chọn khu vực giao hàng */}
      <Modal
        visible={showAreaModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAreaModal(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowAreaModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn khu vực giao hàng</Text>
            <FlatList
              data={listArea}
              keyExtractor={item => item.code_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.paymentItem}
                  onPress={() => {
                    setSelectedArea(item);
                    setShowAreaModal(false);
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 16 }}>{item.code_nm}</Text>
                  {selectedArea && selectedArea.code_id === item.code_id && (
                    <Icon name="check-circle" size={20} color={Color.mainColor} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal chọn phương thức thanh toán */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowPaymentModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>
            <FlatList
              data={list_payment_method}
              keyExtractor={item => item.code_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.paymentItem}
                  onPress={() => {
                    setSelectedPayment(item);
                    setShowPaymentModal(false);
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 16 }}>{item.code_nm}</Text>
                  {selectedPayment && selectedPayment.code_id === item.code_id && (
                    <Icon name="check-circle" size={20} color={Color.mainColor} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.footerContainer}>
        <ButtonGradient
          onPress={() => { }}
          style={styles.placeOrderBtn}
          textStyle={styles.placeOrderText}
        >
          Thanh toán
        </ButtonGradient>
      </View>

    </View>
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
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 18,
    color: '#222',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
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
    color: '#FF7A00',
    fontWeight: 'bold',
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
    borderColor: '#FF7A00',
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
    color: '#FF7A00',
    fontWeight: 'bold',
    fontSize: 13,
  },
  promoRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
  promoBtn: {
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  promoBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalSection: {
    backgroundColor: '#fff',
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
    // backgroundColor: '#FF7A00',
    borderRadius: 100,
    margin: 20,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontWeight: 'bold',
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