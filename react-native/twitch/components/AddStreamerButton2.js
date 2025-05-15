// AddStreamerButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';




const AddStreamerButton = ({ isAdded, onAdd }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isAdded && styles.disabled]}
      onPress={onAdd}
      disabled={isAdded}
    >
      {isAdded ? (
        <Ionicons name="heart" size={20} color="gray" />
            ) : (
                <Ionicons name="heart" size={20} color="white" />
            )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 0,
    paddingVertical: 5,
  
    backgroundColor: '#8c3fff',
    borderRadius: 5,
    alignItems: 'center',
    width:40,
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
