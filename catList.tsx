const categories = [
  {
    categoryId: '1',
    categoryName: 'Fruits & Vegetables',
    subcategories: [
      {subCategoryId: '1', subCategoryName: 'Apples'},
      {subCategoryId: '2', subCategoryName: 'Bananas'},
    ],
  },
  {
    categoryId: '2',
    categoryName: 'Dairy and Milk',
    subcategories: [
      {subCategoryId: '3', subCategoryName: 'Milk'},
      {subCategoryId: '4', subCategoryName: 'Butter'},
      {subCategoryId: '5', subCategoryName: 'Cheese'},
      {subCategoryId: '6', subCategoryName: 'Yogurt'},
    ],
  },
  // Add more categories and subcategories here
];

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CategoryItem = ({category, isExpanded, onToggle}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => onToggle(category.categoryId)}>
        <Text style={styles.categoryText}>{category.categoryName}</Text>
        <Icon
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
        />
      </TouchableOpacity>
      {isExpanded && (
        <FlatList
          data={category.subcategories}
          keyExtractor={item => item.subCategoryId}
          renderItem={({item}) => (
            <View style={styles.subcategoryItem}>
              <Text>{item.subCategoryName}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const CategoryList = () => {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const handleToggleCategory = categoryId => {
    setExpandedCategoryId(prevCategoryId =>
      prevCategoryId === categoryId ? null : categoryId,
    );
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.categoryId}
      renderItem={({item}) => (
        <CategoryItem
          category={item}
          isExpanded={item.categoryId === expandedCategoryId}
          onToggle={handleToggleCategory}
        />
      )}
    />
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <CategoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
  },
  subcategoryItem: {
    paddingLeft: 32,
    paddingVertical: 8,
    backgroundColor: '#eee',
  },
});

export default App;
