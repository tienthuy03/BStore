import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../../../components/Bstore/Header/Header';
import { Color } from '../../../colors/colortv';

const TAB_LIST = [
  { key: 'waitting', label: 'Chờ xác nhận' },
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'canceled', label: 'Đã huỷ' },
  { key: 'completed', label: 'Hoàn thành' },
];

const EnvoiceScreen = () => {
  const [activeTab, setActiveTab] = useState('waitting');

  return (
    <View style={styles.container}>
      <Header>Đơn hàng của bạn</Header>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {TAB_LIST.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.content}>
        <Text>Bạn đang ở tab: {TAB_LIST.find(t => t.key === activeTab).label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f7fb',
    // flex: 1,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 18,
    padding: 6,
    // marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 22,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  tabItemActive: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  tabText: {
    color: Color.textPrimary2,
    fontSize: 16,
    fontFamily: 'Roboto-Regular'
  },
  tabTextActive: {
    color: Color.mainColor,
    fontFamily: 'Roboto-Medium'
  },
  content: {
    // padding: 16,
    flex: 1,
  },
});

export default EnvoiceScreen;