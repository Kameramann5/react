import React from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

const Tasks = ({ data, onItemPress, deleteArticle }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onItemPress(item)}
        >
          <Image
            style={styles.image}
            source={{uri: item.img !=="" ? item.img : undefined }}
           
          />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.anons}>{item.anons}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    marginBottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontFamily: "mt-bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 0,
    color: "black",
  },
  anons: {
    fontFamily: "mt-light",
    fontSize: 16,
    textAlign: "center",
    marginTop: 0,
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 15,
  },
});

export default Tasks;
