import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

export default function EditForm({ article, onSave, editSuccess, setEditSuccess }) {
  const [localImage, setLocalImage] = useState(article.img || null); // инициализация из article

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
      setLocalImage(uri); // отображение выбранного изображения
      setFieldValue('img', uri); // обновление формы
    }
  };

  return (
    <Formik
      initialValues={{
        name: article.name,
        full: article.full,
        anons: article.anons,
        img: article.img || '', // по умолчанию пустая строка
      }}
      onSubmit={(values) => {
        onSave(values);
        setEditSuccess(true); // например, отметка что успешно сохранено
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Название"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Краткое описание"
            onChangeText={handleChange('anons')}
            onBlur={handleBlur('anons')}
            value={values.anons}
          />
          <TextInput
            style={styles.input}
            placeholder="Полное описание"
            onChangeText={handleChange('full')}
            onBlur={handleBlur('full')}
            value={values.full}
            multiline
          />

<TouchableOpacity
              style={[styles.imgSelect, { marginTop: 15 }]}
              onPress={() => pickImage(setFieldValue)}
            >
              <Text style={styles.imgSelect}>Выбрать изображение</Text>
            </TouchableOpacity>



       
          
          <TextInput
               style={{width:0,height:0}}
            value={values.img}
            placeholder="Фото"
            editable={false}
          />

          <Button
            title="Сохранить"
            onPress={() => {
              handleSubmit();
              setEditSuccess(true);
            }}
            color={editSuccess ? 'green' : '#2196F3'}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
});
