// AddTaskModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet,ScrollView } from 'react-native';
import AddTask from './AddTask';
import Icon from '@react-native-vector-icons/ionicons';
import { gStyle } from "../styles/style";



export default function AddTaskModal({ visible, onClose, onAdd }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView style={gStyle.main}>
        <Icon
          name="close-circle"
          size={34}
          color="red"
          style={styles.closeIcon}
          onPress={onClose}
        />
        <Text style={styles.title}>Новая задача</Text>
        <AddTask AddArticle={onAdd} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
 
  closeIcon: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 0,
  },
});
