// FullInfo.jsx
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { gStyle } from "../styles/style";
import EditForm from "./EditForm";
import DeleteCurrentPost from "./DeleteCurrentPost";

export default function FullInfo({ route, navigation }) {
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
    setArticleData(updatedValues);
    setIsEditing(false);
    setEditSuccess(true); // после успешного редактирования меняем состояние
  };

  // если нужно сбросить статус при открытии статьи
  React.useEffect(() => {
    setEditSuccess(false);
  }, [route.params]);

  return (
    <View style={gStyle.main}>
      <Image style={styles.image} source={{ uri: route.params.img }} />
      <Text style={[gStyle.title, styles.header]}>{route.params.name}</Text>
      <Text style={styles.full}>{route.params.full}</Text>
      <DeleteCurrentPost deleteArticle={handleDelete} />

      {/* Передаем статус редактирования и функцию для его обновления */}
      <EditForm
        article={route.params}
        onSave={handleSave}
        editSuccess={editSuccess}
        setEditSuccess={setEditSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 25,
  },
  full: {
    fontFamily: "mt-light",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
  },
});
