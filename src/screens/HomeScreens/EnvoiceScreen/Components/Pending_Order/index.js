import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppConfig from '../../../../../utils/useAppConfig';
import HistoryOrderCard from '../HistoryOrderCard';
import sysFetch from '../../../../../services/fetch_crypt';

const Pending_Order = ({ data }) => {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    console.log('Card pressed:', item);
    // Navigate to Detail_His_Order screen
    navigation.navigate('Detail_His_Order', { orderData: item });
  };
  console.log(data);


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cardList}>
        {data.map((item) => (

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
});

export default Pending_Order;