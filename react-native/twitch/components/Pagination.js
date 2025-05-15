import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        onPress={onPrev}
        disabled={currentPage === 1}
      >
        <Text style={styles.pageButtonText}>Предыдущая</Text>
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        {currentPage} / {totalPages}
      </Text>

      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.pageButtonText}>Следующая</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 8,
    backgroundColor: '#8c3fff',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  pageInfo: {
    padding: 8,
    fontSize: 16,
  },
});

export default Pagination;
