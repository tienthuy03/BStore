import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryOrderCard from '../HistoryOrderCard';
import { Color } from '../../../../../colors/colortv';

const Pending_Order = ({ data, onLoadMore, isLoading, hasMoreData }) => {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    console.log('Card pressed:', item);
    // Navigate to Detail_His_Order screen

    navigation.navigate('Detail_His_Order', {
      tdp_product_order_pk: item.tdp_product_order_pk,
      order: item
    });
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

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Color.mainColor} />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        )}



        {/* End of data indicator */}
        {!hasMoreData && data.length > 0 && (
          <View style={styles.endContainer}>
            <Text style={styles.endText}>Đã hiển thị tất cả đơn hàng</Text>
          </View>
        )}

        {/* Empty state */}
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
  debugContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  debugText: {
    fontSize: 14,
    color: Color.textPrimary3,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  debugButton: {
    backgroundColor: Color.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  loadMoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadMoreButton: {
    backgroundColor: Color.mainColor,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loadMoreText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});

export default Pending_Order;