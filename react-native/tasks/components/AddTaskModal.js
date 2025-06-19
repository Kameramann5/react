import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import AddTask from './AddTask';
import Icon from '@react-native-vector-icons/ionicons';
import { gStyle } from "../styles/style";

export default function AddTaskModal({ visible, onClose, onAdd }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView style={gStyle.main}>
        {/* Заголовок с центром текста и кнопкой справа */}
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Новая задача</Text>
          </View>
          <Icon
            name="close-circle"
            size={25}
            color="#ff5c5c"
            style={styles.closeIcon}
            onPress={onClose}
          />
        </View>
        <AddTask AddArticle={onAdd} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop:40,
    paddingBottom:0,
  },
  titleWrapper: {
    position: 'absolute', // Чтобы текст был по центру независимо от иконки
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
  },
});