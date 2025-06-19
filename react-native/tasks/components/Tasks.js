import React, { useState, useEffect,useContext   } from "react";
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { SwitchContext } from './Settings/SwitchContext';

const Tasks = ({ data, onItemPress, deleteArticle }) => {
  const { Minimalizm } = useContext(SwitchContext);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <View>
      {Minimalizm ?   
        <TouchableOpacity
       style={[styles.item, {  borderBottomWidth: 5,
    borderBottomColor: item.color, }]}
          onPress={() => onItemPress(item)}
        >
          <Image
            style={styles.image}
            source={{uri: item.img !=="" ? item.img : undefined }}
           
          />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.anons}>{item.anons}</Text>
        </TouchableOpacity>
         :   
         <TouchableOpacity
         style={[styles.minimalizm, {  borderBottomWidth: 5,
    borderBottomColor: item.color, }]}
          onPress={() => onItemPress(item)}
        >
         <View   style={styles.minimalizmContainer}  >
    <Text style={styles.minimalizmtitle}>{item.name}</Text>
 
  </View>
        </TouchableOpacity>
     
        }
    </View>
      )}
    />  
  );
};

const styles = StyleSheet.create({
  minimalizmContainer: {
    flexDirection: 'row', alignItems: 'center' ,
    padding:10,
  },
  minimalizm: {
    width: "100%",
    marginBottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
   item: {
    width: "100%",
    marginBottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
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
    paddingHorizontal:10
  },
  minimalizmtitle: {
    fontFamily: "mt-bold",
    fontSize: 18,
    textAlign: "left",
    marginTop: 0,
    color: "black",
  },
  anons: {
    fontFamily: "mt-light",
    fontSize: 14,
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
