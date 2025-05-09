import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={handlePrevious}
        disabled={currentPage === 1}
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Предыдущая</Text>
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        {currentPage} / {totalPages}
      </Text>

      <TouchableOpacity
        onPress={handleNext}
        disabled={currentPage === totalPages}
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Следующая</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pagination;
