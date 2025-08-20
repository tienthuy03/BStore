import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';
import ButtonGradient from '../../../../components/Bstore/ButtonGradient';

const AddressSelector = ({
  visible,
  onClose,
  onConfirm,
  initialAddress = {}
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [streetAddress, setStreetAddress] = useState('');

  const [currentStep, setCurrentStep] = useState('province'); // province, district, ward, street
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch provinces
  useEffect(() => {
    if (visible) {
      fetchProvinces();
    }
  }, [visible]);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince.code);
    }
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict.code);
    }
  }, [selectedDistrict]);

  const fetchProvinces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      if (!response.ok) {
        throw new Error('Không thể tải danh sách tỉnh thành');
      }
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      setError('Không thể tải danh sách tỉnh thành. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (districtCode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setCurrentStep('district');
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    setCurrentStep('ward');
  };

  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
    setCurrentStep('street');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'district':
        setSelectedProvince(null);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setCurrentStep('province');
        break;
      case 'ward':
        setSelectedDistrict(null);
        setSelectedWard(null);
        setCurrentStep('district');
        break;
      case 'street':
        setSelectedWard(null);
        setCurrentStep('ward');
        break;
      default:
        break;
    }
  };

  const canGoBack = () => {
    return currentStep !== 'province';
  };

  const getBackButtonText = () => {
    switch (currentStep) {
      case 'district':
        return 'Quay lại chọn tỉnh';
      case 'ward':
        return 'Quay lại chọn quận';
      case 'street':
        return 'Quay lại chọn phường';
      default:
        return 'Quay lại';
    }
  };

  const handleConfirm = () => {
    if (!selectedProvince || !selectedDistrict || !selectedWard || !streetAddress.trim()) {
      return;
    }

    const fullAddress = `${streetAddress.trim()}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;

    onConfirm({
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      streetAddress: streetAddress.trim(),
      fullAddress: fullAddress
    });

    onClose();
  };

  const renderItem = ({ item, type }) => {
    const isSelected =
      (type === 'province' && selectedProvince?.code === item.code) ||
      (type === 'district' && selectedDistrict?.code === item.code) ||
      (type === 'ward' && selectedWard?.code === item.code);

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => {
          if (type === 'province') handleProvinceSelect(item);
          else if (type === 'district') handleDistrictSelect(item);
          else if (type === 'ward') handleWardSelect(item);
        }}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.name}
        </Text>
        {isSelected && <Icon name="check" size={20} color={Color.mainColor} />}
      </TouchableOpacity>
    );
  };

  const getCurrentData = () => {
    switch (currentStep) {
      case 'province':
        return provinces;
      case 'district':
        return districts;
      case 'ward':
        return wards;
      default:
        return [];
    }
  };

  const getCurrentTitle = () => {
    switch (currentStep) {
      case 'province':
        return 'Chọn Tỉnh/Thành phố';
      case 'district':
        return 'Chọn Quận/Huyện';
      case 'ward':
        return 'Chọn Phường/Xã';
      case 'street':
        return 'Nhập địa chỉ chi tiết';
      default:
        return '';
    }
  };

  const getBreadcrumb = () => {
    const parts = [];
    if (selectedProvince) parts.push(selectedProvince.name);
    if (selectedDistrict) parts.push(selectedDistrict.name);
    if (selectedWard) parts.push(selectedWard.name);
    return parts.join(' > ');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {currentStep !== 'province' && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color={Color.mainColor} />
            </TouchableOpacity>
          )}
          {currentStep === 'province' && <View style={styles.placeholder} />}
          <Text style={styles.headerTitle}>Chọn địa chỉ</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={Color.textPrimary2} />
          </TouchableOpacity>
        </View>

        {/* Breadcrumb */}
        {getBreadcrumb() && (
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbText}>{getBreadcrumb()}</Text>
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.stepTitle}>{getCurrentTitle()}</Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={24} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchProvinces}>
                <Text style={styles.retryButtonText}>Thử lại</Text>
              </TouchableOpacity>
            </View>
          ) : currentStep === 'street' ? (
            <View style={styles.streetInputContainer}>
              <TextInput
                style={styles.streetInput}
                placeholder="Nhập số nhà, tên đường..."
                value={streetAddress}
                onChangeText={setStreetAddress}
                multiline
              />
            </View>
          ) : (
            <FlatList
              data={getCurrentData()}
              keyExtractor={(item) => item.code.toString()}
              renderItem={({ item }) => renderItem({ item, type: currentStep })}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedProvince || !selectedDistrict || !selectedWard || !streetAddress.trim()) && styles.disabledButton
            ]}
            onPress={handleConfirm}
            disabled={!selectedProvince || !selectedDistrict || !selectedWard || !streetAddress.trim()}
          >
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: Color.textPrimary2,
  },
  placeholder: {
    width: 32,
  },
  breadcrumb: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
  },
  breadcrumbText: {
    fontSize: 14,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: Color.textPrimary2,
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#FFF7F0',
    borderLeftWidth: 3,
    borderLeftColor: Color.mainColor,
  },
  itemText: {
    fontSize: 16,
    color: Color.textPrimary2,
    fontFamily: 'Roboto-Regular',
    flex: 1,
  },
  selectedItemText: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Bold',
  },
  streetInputContainer: {
    flex: 1,
    paddingTop: 16,
  },
  streetInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButtonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
  },
  confirmButton: {
    backgroundColor: Color.mainColor,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
    opacity: 0.6,
  },
  confirmButtonText: {
    color: Color.white,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Color.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Color.white,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
});

export default AddressSelector;
