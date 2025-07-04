import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, KeyboardAvoidingView, Platform } from "react-native";
import { Color } from "../../../colors/colortv";
import ButtonGradient from "../../../components/Bstore/ButtonGradient";

const AddressModal = ({ visible, onClose, onSave, initialData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setPhone(initialData.phone || "");
      setAddress(initialData.address || "");
      setCity(initialData.city || "");
      setZipCode(initialData.zipCode || "");
      setIsDefault(initialData.isDefault || false);
    } else {
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setCity("");
      setZipCode("");
      setIsDefault(false);
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!firstName || !lastName || !phone || !address || !city || !zipCode) return;
    onSave({ firstName, lastName, phone, address, city, zipCode, isDefault });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex1}
      >
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={{ fontSize: 24, color: Color.textPrimary2 }}>{"\u2039"}</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{initialData ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</Text>
              <View style={{ width: 32 }} />
            </View>
            <View style={styles.row2Col}>
              <View style={styles.colHalf}>
                <Text style={styles.label}>Họ </Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Họ"
                />
              </View>
              <View style={styles.colHalf}>
                <Text style={styles.label}>Tên </Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Tên"
                />
              </View>
            </View>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Địa chỉ"
            />
            <View style={styles.row2Col}>
              <View style={styles.colHalf}>
                <Text style={styles.label}>Thành phố</Text>
                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Thành phố"
                />
              </View>
              <View style={styles.colHalf}>
                <Text style={styles.label}>ZIP Code</Text>
                <TextInput
                  style={styles.input}
                  value={zipCode}
                  onChangeText={setZipCode}
                  placeholder="ZIP Code"
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={styles.switchRow}>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                trackColor={{ false: '#ccc', true: Color.mainColor }}
                thumbColor={isDefault ? Color.mainColor : '#f4f3f4'}
              />
              <Text style={styles.switchLabel}>Chọn làm địa chỉ chính</Text>
            </View>
            <ButtonGradient
              onPress={handleSave}
              style={styles.btnConfirm}
              textStyle={styles.placeOrderText}
            >Sao lưu
            </ButtonGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  bottomSheet: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.textPrimary2,
    textAlign: "center",
  },
  row2Col: {
    flexDirection: "row",
    gap: 12,
  },
  colHalf: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: Color.textPrimary3,
    marginTop: 10,
    marginBottom: 4,
    fontFamily: "Roboto-Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 8,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F7F7F7",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  switchLabel: {
    marginLeft: 8,
    color: Color.textPrimary2,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
  saveBtn: {
    backgroundColor: "#FF7A2F",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: Color.white,
    fontSize: 17,
    fontWeight: "bold",
  },
}); 