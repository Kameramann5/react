import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function DeleteCurrentPost({ deleteArticle  }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Удалить статью" 
        color="#ff5c5c" 
        onPress={deleteArticle } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
});