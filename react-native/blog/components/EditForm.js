import React from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';

export default function EditForm({ article, onSave, editSuccess, setEditSuccess }) {
  return (
    <Formik
      initialValues={{
        name: article.name,
        full: article.full,
        anons: article.anons,
        img: article.img,
      }}
      onSubmit={(values) => {
        onSave(values);
        setEditSuccess(false); // сбрасываем статус, чтобы при новом открытии он был исходным
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
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
          <TextInput
            style={styles.input}
            placeholder="Изображение (URL)"
            onChangeText={handleChange('img')}
            onBlur={handleBlur('img')}
            value={values.img}
          />
        <Button
  title="Сохранить"
  onPress={() => {
    handleSubmit();
    setEditSuccess(true);
  }}
  color={editSuccess ? 'green' : '#2196F3'} // по умолчанию синий, после редактирования зеленый
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
});