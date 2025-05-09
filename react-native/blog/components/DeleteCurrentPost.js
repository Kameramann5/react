import React from 'react';
import { Button, StyleSheet, View,TouchableOpacity,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function DeleteCurrentPost({ deleteArticle  }) {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.deleteButton} onPress={deleteArticle} activeOpacity={0.7}>
        <Text style={styles.text}>Удалить</Text>
        <Ionicons
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
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#ff5c5c',
    padding:10,
    gap:10,
    justifyContent:'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});