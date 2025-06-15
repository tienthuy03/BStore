import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Platform, TextInput } from 'react-native';
import { Color } from '../../../colors/colortv';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const CartSummary = ({
  total,
  quantityProd,
  handleCheckout,
  onDataChange // Callback để truyền data ra ngoài
}) => {
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customerNote, setCustomerNote] = useState('');

  const paymentMethods = [
    { id: 1, name: 'Thanh toán khi nhận hàng', icon: 'cash' },
    { id: 2, name: 'Chuyển khoản ngân hàng', icon: 'bank' },
    { id: 3, name: 'Ví điện tử MoMo', icon: 'wallet' },
    { id: 4, name: 'Thẻ tín dụng/ghi nợ', icon: 'credit-card' },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Function để tạo checkout data
  const getCheckoutData = useCallback(() => {
    return {
      paymentMethod,
      deliveryDate: formatDate(selectedDate),
      deliveryTime: formatTime(selectedTime),
      customerNote,
      total,
      quantityProd
    };
  }, [paymentMethod, selectedDate, selectedTime, customerNote, total, quantityProd]);

  // Function để notify parent component
  const notifyDataChange = useCallback(() => {
    if (onDataChange) {
      onDataChange(getCheckoutData());
    }
  }, [onDataChange, getCheckoutData]);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method.name);
    setShowPaymentModal(false);
    // Notify parent after state update
    setTimeout(() => notifyDataChange(), 0);
  };

  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      // Notify parent after state update
      setTimeout(() => notifyDataChange(), 0);
    }
  };

  const onTimeChange = (event, time) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (time) {
      setSelectedTime(time);
      // Notify parent after state update
      setTimeout(() => notifyDataChange(), 0);
    }
  };

  const handleNoteChange = (text) => {
    setCustomerNote(text);
    // Notify parent after state update
    setTimeout(() => notifyDataChange(), 0);
  };

  const handleCheckoutPress = () => {
    const checkoutData = getCheckoutData();
    handleCheckout(checkoutData);
  };

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentMethodItem}
      onPress={() => handlePaymentMethodSelect(item)}
    >
      <Icon name={item.icon} size={24} color={Color.mainColor} />
      <Text style={styles.paymentMethodText}>{item.name}</Text>
      {paymentMethod === item.name && (
        <Icon name="check-circle" size={20} color={Color.mainColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.summaryTitle}>Tổng đơn hàng</Text>

      {/* Payment Method Selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Phương thức thanh toán</Text>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => setShowPaymentModal(true)}
        >
          <Text style={styles.selectionText}>{paymentMethod}</Text>
          <Icon name="chevron-down" size={20} color={Color.textPrimary3} />
        </TouchableOpacity>
      </View>

      {/* Date Selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Ngày giao hàng</Text>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.selectionText}>{formatDate(selectedDate)}</Text>
          <Icon name="calendar" size={20} color={Color.textPrimary3} />
        </TouchableOpacity>
      </View>

      {/* Time Selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Giờ giao hàng</Text>
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.selectionText}>{formatTime(selectedTime)}</Text>
          <Icon name="clock-outline" size={20} color={Color.textPrimary3} />
        </TouchableOpacity>
      </View>

      {/* Customer Note */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Ghi chú cho đơn hàng</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Nhập ghi chú (tùy chọn)..."
          value={customerNote}
          onChangeText={handleNoteChange}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tổng số sản phẩm</Text>
        <Text style={styles.value}>{quantityProd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giảm giá</Text>
        <Text style={styles.value}>đ0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phí vận chuyển</Text>
        <Text style={[styles.value, { color: '#28a745' }]}>Miễn phí</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.totalMoneyRow}>
        <View style={styles.totalPay}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>đ{total}</Text>
        </View>
        <LinearGradient
          colors={[Color.mainColor, Color.mainColor3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.processButton}
        >
          <TouchableOpacity style={styles.buttonContent} onPress={handleCheckoutPress}>
            <Text style={styles.processText}>Xác nhận</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Icon name="close" size={24} color={Color.textPrimary3} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={paymentMethods}
              renderItem={renderPaymentMethod}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      {/* iOS Date Picker Modal */}
      {Platform.OS === 'ios' && showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerModalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.pickerButton}>Hủy</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Chọn ngày</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={[styles.pickerButton, { color: Color.mainColor }]}>Xong</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                minimumDate={new Date()}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* iOS Time Picker Modal */}
      {Platform.OS === 'ios' && showTimePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showTimePicker}
          onRequestClose={() => setShowTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerModalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                  <Text style={styles.pickerButton}>Hủy</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Chọn giờ</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                  <Text style={[styles.pickerButton, { color: Color.mainColor }]}>Xong</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={onTimeChange}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  processButton: {
    flex: 1,
    marginTop: 16,
    borderRadius: 24,
    height: 44,
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processText: {
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  footerContainer: {
    backgroundColor: Color.white,
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginBottom: 12,
  },
  selectionContainer: {
    marginBottom: 12,
  },
  selectionLabel: {
    fontSize: 14,
    color: Color.textPrimary3,
    marginBottom: 6,
    fontFamily: 'Roboto-Medium',
  },
  selectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  selectionText: {
    fontSize: 14,
    color: Color.textPrimary,
    fontFamily: 'Roboto-Regular',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.textPrimary,
    minHeight: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#888',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  totalMoneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPay: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  totalLabel: {
    fontFamily: 'Roboto-Medium',
    color: Color.textPrimary3,
    fontSize: 16,
  },
  totalValue: {
    fontFamily: 'Roboto-Bold',
    color: Color.mainColor,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: Color.textPrimary,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentMethodText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Color.textPrimary,
    fontFamily: 'Roboto-Regular',
  },
  pickerModalContent: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: Color.textPrimary2,
  },
  pickerButton: {
    fontSize: 16,
    color: Color.textPrimary3,
  },
  picker: {
    height: 200,
  },
});

export default CartSummary;