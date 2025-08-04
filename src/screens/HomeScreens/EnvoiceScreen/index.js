import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../../../components/Bstore/Header/Header';
import { Color } from '../../../colors/colortv';
import BSTab from '../../../components/Bstore/Tab';
import History_Order from './Components/History_Order/index';
import Order from './Components/Order/index';

const EnvoiceScreen = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <View style={styles.container}>
      <Header>Đơn hàng của bạn</Header>
      <BSTab
        tab={activeTab}
        onChangeTab={handleTabChange}
        data={[
          {
            id: 0,
            name: 'Lịch sử',
            count: 0,
            screen: (
              <History_Order />
            ),
          },
          {
            id: 1,
            name: 'Đơn hàng',
            count: 0,
            screen: (
              <Order />
            ),
          },
          {
            id: 2,
            name: 'Đơn hàng',
            count: 0,
            screen: (
              <Order />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f7fb',
    flex: 1,
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