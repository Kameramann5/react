// AddStreamerButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddStreamerButton = ({ isAdded, onAdd }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isAdded && styles.disabled]}
      onPress={onAdd}
      disabled={isAdded}
    >
      <Text style={styles.text}>{isAdded ? 'Уже отслеживаете' : 'Отслеживать'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#8c3fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddStreamerButton;
