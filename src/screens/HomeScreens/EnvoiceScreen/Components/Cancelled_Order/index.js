import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryOrderCard from '../HistoryOrderCard';
import { Color } from '../../../../../colors/colortv';

const Cancelled_Order = ({ data, onLoadMore, isLoading, hasMoreData }) => {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    console.log('Card pressed:', item);
    navigation.navigate('Detail_His_Order', { orderData: item });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50; // Tăng padding để trigger sớm hơn

    // Kiểm tra xem đã scroll đến gần cuối chưa
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isNearBottom && onLoadMore && !isLoading && hasMoreData) {
      console.log('Scroll to bottom - Loading more data...');
      onLoadMore();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={200}
      onEndReachedThreshold={0.1}
    >
      <View style={styles.cardList}>
        {data.map((item) => (
          <HistoryOrderCard
            key={item.id}
            item={item}
            onPress={() => handleCardPress(item)}
          />
        ))}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Color.mainColor} />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        )}

        {!hasMoreData && data.length > 0 && (
          <View style={styles.endContainer}>
            <Text style={styles.endText}>Đã hiển thị tất cả đơn hàng</Text>
          </View>
        )}

        {!isLoading && data.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FF',
  },
  cardList: {
    paddingHorizontal: 12,
    paddingTop: 8
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: Color.textPrimary2,
    fontFamily: 'Roboto-Medium',
  },
  endContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  endText: {
    fontSize: 14,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Medium',
  },
});

export default Cancelled_Order;