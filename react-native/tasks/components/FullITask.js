import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer'; // импортируем библиотеку
import { gStyle } from "../styles/style";
import EditForm from "./EditForm";
import DeleteCurrentPost from "./DeleteCurrentPost";
import Icon from '@react-native-vector-icons/ionicons';

export default function FullTask({ route, navigation }) {
  const [editSuccess, setEditSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // состояние для модального окна

  const handleDelete = () => {
    route.params.deleteArticle(route.params.key);
    navigation.goBack();
  };

  const { updateArticle } = route.params;

  const handleSave = (updatedValues) => {
    if (updateArticle) {
      updateArticle(updatedValues);
    }
    setEditSuccess(true);
  };

  React.useEffect(() => {
    setEditSuccess(false);
  }, [route.params]);

  const openImageModal = () => {
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={gStyle.main}>
        {route.params.img ? (
          <>
            <TouchableOpacity onPress={openImageModal}>
              <Image style={styles.image} source={{ uri: route.params.img }} />
            </TouchableOpacity>
            {/* Модальное окно с зумом изображением */}
            <Modal visible={modalVisible} transparent={true} animationType="fade">
              {/* Используем ImageViewer для зума */}
              <ImageViewer
  imageUrls={[{ url: route.params.img }]}
  enableSwipeDown={true}
  onSwipeDown={closeImageModal}
  onRequestClose={closeImageModal}
  renderHeader={() => (
    <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
      <Text style={styles.closeButtonText}>Закрыть</Text>
    </TouchableOpacity>
  )}
  renderIndicator={() => null}
/>
            </Modal>
          </>
        ) : (
          <Icon name="image-sharp" size={24} color="gray" />
        )}
        <Text style={[gStyle.title, styles.header]}>{route.params.name}</Text>
        <Text style={styles.full}>{route.params.full}</Text>

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
  
  // стили для модального окна
  modalBackground: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.8)',
    justifyContent:'center',
    alignItems:'center',
  },
  
  // Кнопка закрытия
  closeButton:{
    position:'absolute',
    top:10,
    right:10,
    paddingHorizontal:18,
    paddingVertical:8,
    backgroundColor:'#007BFF',
    borderRadius:100,
    zIndex:999,
  },
  
  closeButtonText:{
    color:'#fff',
    fontSize:14,
  }
});