import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../../../../colors/colortv';

const Categories_Card = ({ categories, onPress }) => {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <View style={styles.categoriesWrapper}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesGrid}>
        {(categories || []).map((category) => (
          <TouchableOpacity
            key={category.code}
            style={[
              styles.categoryItem,
              activeCategory === category.code && styles.categoryItemActive,
            ]}
            onPress={() => {
              setActiveCategory(category.code);
              if (onPress) {
                onPress(category);
              }
            }}
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.code && styles.categoryTextActive,
                ]}
                numberOfLines={1}
              >
                {category.prod_type_nm}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

Categories_Card.defaultProps = {
  categories: [],
  onPress: () => { },
};

const styles = StyleSheet.create({
  categoriesWrapper: {
    backgroundColor: Color.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.textPrimary3,
    paddingBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 8,
  },
  categoryItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // Bỏ width cố định, để item tự động mở rộng theo nội dung
    flexShrink: 0, // Không cho phép thu nhỏ
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryItemActive: {
    backgroundColor: Color.mainColor,
    shadowColor: Color.mainColor,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#666',
    textAlign: 'center',
    // Text sẽ không bị cắt, item sẽ mở rộng theo độ dài text
  },
  categoryTextActive: {
    color: Color.white,
    fontWeight: '600',
  },
});

export default Categories_Card;