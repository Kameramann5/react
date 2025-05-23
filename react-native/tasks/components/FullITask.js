import React, { useState } from "react";
import { StyleSheet, View, Text, Image,ScrollView  } from "react-native";
import { gStyle } from "../styles/style";
import EditForm from "./EditForm";
import DeleteCurrentPost from "./DeleteCurrentPost";
import { Ionicons } from '@expo/vector-icons';

export default function FullTask({ route, navigation }) {
  const [editSuccess, setEditSuccess] = useState(false); // состояние для отслеживания редактирования

  const handleDelete = () => {
    
    route.params.deleteArticle(route.params.key);
    navigation.goBack();
  };


  const { updateArticle } = route.params;

  const handleSave = (updatedValues) => {
    if (updateArticle) {
      updateArticle(updatedValues);
    }
    
  
    setEditSuccess(true); // после успешного редактирования меняем состояние
  };

  // если нужно сбросить статус при открытии статьи
  React.useEffect(() => {
    setEditSuccess(false);
  }, [route.params]);

  return (
    <ScrollView  contentContainerStyle={styles.page}   >
    <View  style={gStyle.main}>    
      {route.params.img ? (
        
  <Image style={styles.image} source={{ uri: route.params.img }} />
) : (
  <Ionicons name="image-sharp" size={24} color="gray" />
)}
      <Text style={[gStyle.title, styles.header]}>{route.params.name}</Text>
      <Text style={styles.full}>{route.params.full}</Text>
    

      {/* Передаем статус редактирования и функцию для его обновления */}
      <EditForm
        article={route.params}
        onSave={handleSave}
        editSuccess={editSuccess}
        setEditSuccess={setEditSuccess}
        navigation={navigation}
      /> 
 <DeleteCurrentPost deleteArticle={handleDelete} />


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 0,
  },
  full: {
    fontFamily: "mt-light",
    fontSize: 16,
    textAlign: "center",
    marginTop: 0,
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
  },
  page: {
    paddingBottom: 20,
  },
});
