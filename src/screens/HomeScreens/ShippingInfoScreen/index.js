import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "../../../colors/colortv";
import Header from "../../../components/Bstore/Header/Header";
import ButtonGradient from "../../../components/Bstore/ButtonGradient";
import AddressModal from "./AddressModal";

const initialData = [
  {
    id: "1",
    firstName: "Thuỷ",
    lastName: "Tiên",
    phone: "0971761090",
    address: "132 Đường C1, Tân bình",
    city: "Hồ Chí Minh",
    zipCode: "70000",
    isDefault: false,
  },
  {
    id: "2",
    firstName: "Arlene",
    lastName: "McCoy",
    phone: "(217) 555-0113",
    address: "8502 Preston Rd. Inglewood",
    city: "Maine",
    zipCode: "98380",
    isDefault: true,
  },
  {
    id: "3",
    firstName: "Bessie",
    lastName: "Cooper",
    phone: "(702) 555-0122",
    address: "2972 Westheimer Rd. Santa Ana",
    city: "Santa Ana",
    zipCode: "85486",
    isDefault: false,
  },
];

const ShippingInfoScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState(initialData);
  const [selectedId, setSelectedId] = useState(
    initialData.find((item) => item.isDefault)?.id || initialData[0].id
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null = thêm mới, object = chỉnh sửa

  // Xử lý lưu địa chỉ (thêm mới hoặc cập nhật)
  const handleSaveAddress = (data) => {
    if (editingAddress) {
      // Chỉnh sửa
      setAddresses((prev) => {
        let updated = prev.map((item) =>
          item.id === editingAddress.id
            ? { ...item, ...data }
            : (data.isDefault ? { ...item, isDefault: false } : item)
        );
        // Nếu vừa chỉnh sửa mà chọn mặc định thì set selectedId luôn
        if (data.isDefault) setSelectedId(editingAddress.id);
        return updated;
      });
    } else {
      // Thêm mới
      const newId = (Math.max(...addresses.map(a => +a.id)) + 1).toString();
      const newAddress = { ...data, id: newId };
      setAddresses((prev) => {
        let updated = data.isDefault
          ? prev.map((item) => ({ ...item, isDefault: false }))
          : prev;
        updated = [...updated, newAddress];
        if (data.isDefault) setSelectedId(newId);
        return updated;
      });
    }
    setModalVisible(false);
    setEditingAddress(null);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.radioRow}>
            <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Mặc định</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => { setEditingAddress(item); setModalVisible(true); }}>
            <Text style={styles.editText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.address}>{item.city}{item.zipCode ? ", " + item.zipCode : ""}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        goBack={navigation.goBack}
        rightIconVisible
        rightIconName="plus"
        onRightPress={() => { setEditingAddress(null); setModalVisible(true); }}
      >Thông tin nhận hàng</Header>

      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <ButtonGradient
        onPress={() => { navigation.goBack() }}
        style={styles.btnConfirm}
        textStyle={styles.placeOrderText}
      >
        Xác nhận
      </ButtonGradient>
      <AddressModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setEditingAddress(null); }}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </SafeAreaView>
  );
};

export default ShippingInfoScreen;

const styles = StyleSheet.create({
  btnConfirm: {
    padding: 16
  },
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Color.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.textPrimary2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    minHeight: 500,
  },
  card: {
    backgroundColor: Color.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Color.white,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardSelected: {
    borderColor: Color.mainColor,
    backgroundColor: Color.white,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: Color.mainColor,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.mainColor,
  },
  defaultBadge: {
    backgroundColor: "#FFD6C6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 2,
  },
  defaultBadgeText: {
    color: Color.mainColor,
    fontSize: 12,
    fontWeight: "bold",
  },
  editText: {
    color: Color.mainColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.textPrimary2,
    marginBottom: 2,
  },
  phone: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },
  checkoutButton: {
    backgroundColor: Color.mainColor,
    margin: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Color.mainColor,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  checkoutButtonText: {
    color: Color.white,
    fontSize: 18,
    fontWeight: "bold",
  },
}); 