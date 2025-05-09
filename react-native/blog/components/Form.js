import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from 'expo-image-picker'; // импортируем image-picker
import { gStyle } from "../styles/style";
import { Formik } from "formik";

export default function Form({ AddArticle }) {
  const [localImage, setLocalImage] = useState(null); // локальное состояние для выбранного изображения

  // функция для открытия галереи
  const pickImage = async (setFieldValue) => {
    // Запрашиваем разрешение
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Разрешение на доступ к галерее отклонено");
      return;
    }

    // Открываем галерею
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setLocalImage(uri); // сохраняем изображение для отображения
      setFieldValue("img", uri); // обновляем значение формы
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ name: "", anons: "", full: "", img: "" }}
        onSubmit={(values, action) => {
          AddArticle(values);
          action.resetForm();
          setLocalImage(null); // сбрасываем изображение после отправки
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              value={props.values.name}
              placeholder="Введите название"
              onChangeText={props.handleChange("name")}
            />
            <TextInput
              style={styles.input}
              value={props.values.anons}
              placeholder="Введите анонс"
              onChangeText={props.handleChange("anons")}
              multiline
            />
            <TextInput
              style={styles.input}
              value={props.values.full}
              placeholder="Введите статью"
              onChangeText={props.handleChange("full")}
              multiline
            />
        
            <TouchableOpacity
              style={[styles.imgSelect, { marginTop: 15 }]}
              onPress={() => pickImage(props.setFieldValue)}
            >
              <Text style={styles.imgSelect}>Выбрать изображение</Text>
            </TouchableOpacity>
            {localImage && (
              <Image source={{ uri: localImage }} style={styles.imagePreview} />
            )}
            <TouchableOpacity style={styles.imgSelect}>
            <TextInput
             style={{width:0,height:0}}
              value={props.values.img}
              placeholder="Фото"
              editable={false} 
            />
  </TouchableOpacity>
            <TouchableOpacity style={styles.submit} onPress={props.handleSubmit}>
              <Text style={styles.submitText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 15,
    padding: 15,
    borderColor: "silver",
    borderRadius: 5,
  },
  submit: {
    marginTop: 15,
    backgroundColor: '#007BFF',
  },
  submitText: {
    backgroundColor: '#007BFF',
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  imagePreview: {
    marginTop: 15,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
