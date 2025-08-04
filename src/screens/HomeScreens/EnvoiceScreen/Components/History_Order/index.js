import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../../../../colors/colortv';

const History_Order = () => {
  const navigation = useNavigation();

  const HistoryOrderCard = ({ item, onPress }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {/* Status-colored bar on the left */}
        <View style={[styles.blueBar, { backgroundColor: statusColor }]} />
        {/* Content */}
        <View style={styles.content}>
          <View style={{ width: '100%', gap: 8, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>🕓 01-08-2025 / 22:34</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={[styles.dateTime, { color: statusColor }]}>💵 Tổng tiền: 100.000 VNĐ</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTime}>💳 Thanh toán: Tiền mặt</Text>
          </View>

          <View style={styles.dateTimeContainer}>
            <Text style={[styles.dateTime]}>🏠 Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={[styles.dateTime]}>📦 Sản phẩm: 10 sản phẩm</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'inprogress':
        return Color.mainColor;
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return Color.mainColor;
    }
  };

  // Mock data - replace with real data from API
  const mockData = [
    {
      id: 1,
      title: 'Customer Service',
      dateTime: 'March 25 - 12:00 PM',
      project: 'For Zoho Project',
      status: 'InProgress'
    },
    {
      id: 2,
      title: 'Technical Support',
      dateTime: 'March 24 - 2:30 PM',
      project: 'For CRM System',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Sales Consultation',
      dateTime: 'March 23 - 10:15 AM',
      project: 'For Sales Team',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Product Demo',
      dateTime: 'March 22 - 4:45 PM',
      project: 'For Marketing',
      status: 'Cancelled'
    }
  ];

  const handleCardPress = (item) => {
    console.log('Card pressed:', item);
    // Navigate to Detail_His_Order screen
    navigation.navigate('Detail_His_Order', { orderData: item });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.cardList}>
        {mockData.map((item) => (
          <HistoryOrderCard
            key={item.id}
            item={item}
            onPress={() => handleCardPress(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardList: {
    paddingHorizontal: 12,
    paddingTop: 8
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  blueBar: {
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Color.text,
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateTime: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    // minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default History_Order;