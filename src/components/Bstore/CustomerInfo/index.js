import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../colors/colortv';

const CustomerInfo = ({ customerData, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={24} color={Color.mainColor} />
        <Text style={styles.title}>Thông tin khách hàng</Text>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Icon name="pencil" size={20} color={Color.mainColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="account" size={20} color={Color.textPrimary3} />
          <Text style={styles.infoText}>{customerData.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color={Color.textPrimary3} />
          <Text style={styles.infoText}>{customerData.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="map-marker" size={20} color={Color.textPrimary3} />
          <Text style={styles.infoText}>{customerData.address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    margin: 8,
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: Color.textPrimary2,
    marginLeft: 8,
  },
  editButton: {
    padding: 4,
  },
  infoContainer: {
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: Color.textPrimary2,
    fontFamily: 'Roboto-Regular',
    flex: 1,
  },
});

export default CustomerInfo;