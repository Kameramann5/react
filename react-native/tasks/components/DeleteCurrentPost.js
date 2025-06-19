import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';


export default function DeleteCurrentPost({  deleteArticle }) {



  const handleDelete = () => {
    Alert.alert(
      'Подтверждение удаления',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            deleteArticle();
            // Предполагается, что у вас есть доступ к navigation
            // например, через useNavigation() или переданный пропс
                     },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Удалить</Text>
        <Icon
          name="close-circle"
          size={20}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row', borderRadius:100,
    alignItems: 'center',
    backgroundColor: '#ff5c5c',
    gap: 5,
    justifyContent: 'center',
    paddingHorizontal:15,
    paddingVertical:10
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
