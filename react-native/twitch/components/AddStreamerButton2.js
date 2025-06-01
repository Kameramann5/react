// AddStreamerButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';




const AddStreamerButton = ({ isAdded, onAdd }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isAdded && styles.disabled]}
      onPress={onAdd}
      disabled={isAdded}
    >
      {isAdded ? (
        <Icon name="heart" size={20} color="gray" />
            ) : (
                <Icon name="heart" size={20} color="white" />
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
