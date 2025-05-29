// components/Categories.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from '../../../colors/colorhp';

const Categories_Card = () => {
  const [activeCategory, setActiveCategory] = useState('3');

  const categories = [
    { id: '1', name: 'Nuts', icon: 'flower-outline' },
    { id: '2', name: 'Vegetables', icon: 'flower-outline' },
    { id: '3', name: 'Fruits', icon: 'basket-outline' },
    { id: '4', name: 'Gluten Free', icon: 'flower-outline' },
    { id: '5', name: 'Vegan', icon: 'flower-outline' },
    { id: '6', name: 'Organic', icon: 'flower-outline' },
  ];

  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => setActiveCategory(category.id)}
          >
            <View style={[
              styles.categoryIcon,
              activeCategory === category.id && styles.categoryIconActive
            ]}>
              <Icon
                name={category.icon}
                size={22}
                color={activeCategory === category.id ? '#fff' : '#555'}
              />
            </View>
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.textPrimary3,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 4,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 2,
    width: 70,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: '#FF7E1B',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: Color.textPrimary3,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#333',
    fontWeight: '500',
  },
});

export default Categories_Card;