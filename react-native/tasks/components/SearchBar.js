import React, { useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, data, onCountChange }) => {
  // Фильтрация данных по поисковому запросу
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  // Используем useEffect для передачи количества при изменении
  useEffect(() => {
    if (onCountChange) {
      onCountChange(filteredData.length);
    }
  }, [filteredData.length]);

  return (
    <View style={styles.container}>
      {/* Можно оставить отображение внутри компонента или убрать */}
      {/* {value.length > 0 && (
        <Text style={styles.text}>{filteredData.length} найдено</Text>
      )} */}
      <TextInput
        maxLength={50}
        style={styles.input}
        placeholder="Поиск по названию"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default SearchBar;