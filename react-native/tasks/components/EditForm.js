import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { FontAwesome } from '@expo/vector-icons'; // Для иконки плюса, установите через npm install @expo/vector-icons
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup'; 

export default function EditForm({ article, onSave, editSuccess, setEditSuccess, navigation }) {
  const [localImage, setLocalImage] = useState(article.img || null);
  const [checkboxes, setCheckboxes] = useState([]);
  
// Схема валидации
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название обязательное'),
  anons: Yup.string(),
  full: Yup.string(),
  img: Yup.string().nullable(),
});


  // Стейт для даты последнего редактирования
  const [dateUpdated, setEditTime] = useState('');

  useEffect(() => {
    if (article.tasks && article.tasks.length > 0) {
      setCheckboxes(article.tasks);
    }
    // Инициализация времени редактирования текущим временем при монтировании
    const now = new Date();
    setEditTime(now.toISOString());
  }, [article.tasks]);

  const addCheckbox = () => {
    const newId = Date.now().toString(); // уникальный id
    setCheckboxes(prev => [
      ...prev,
      { id: newId, label: '', checked: false }
    ]);
  };

  const changeCheckboxLabel = (id, newLabel) => {
    setCheckboxes(prev => prev.map(cb => (
      cb.id === id ? { ...cb, label: newLabel } : cb
    )));
  };
  const deleteCheckbox = (id) => {
    setCheckboxes(prevCheckboxes => prevCheckboxes.filter(cb => cb.id !== id));
  }
  const toggleCheckbox = (id) => {
    setCheckboxes(prev => prev.map(cb => (
      cb.id === id ? { ...cb, checked: !cb.checked } : cb
    )));
  };

  const pickImage = async (setFieldValue) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Разрешение на доступ к галерее отклонено");
      return;
    }
 
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        setLocalImage(uri);
        setFieldValue('img', uri);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        name: article.name,
        full: article.full,
        anons: article.anons,
        dateCreated: article.dateCreated,
        img: article.img || '',
        tasks: article.tasks || [],
        dateUpdated: article.dateUpdated || '', // добавляем поле для даты обновления
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Обновляем дату редактирования прямо перед сохранением
        const now = new Date();
        const currentISODate = now.toISOString();

        // Обновляем состояние dateUpdated для отправки
        setEditTime(currentISODate);

        // Перед отправкой обновляем задачи из локального состояния
        const tasksForSubmit = checkboxes.length > 0 ? checkboxes : values.tasks;

        onSave({ 
          ...values, 
          tasks: tasksForSubmit,
          dateUpdated: currentISODate, // добавляем актуальную дату редактирования
        });
        setEditSuccess(true);
        navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => {
        // Обновляем поле tasks при изменении чекбоксов
        useEffect(() => {
          setFieldValue('tasks', checkboxes);
        }, [checkboxes]);

        //формат даты
        const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    };

        return (
          <View style={styles.formContainer}>
            {/* Поля ввода */}
            <TextInput
  style={styles.input}
  placeholder="дата создания"
  onChangeText={handleChange('dateCreated')}
  onBlur={handleBlur('dateCreated')}
  value={formatDate(values.dateCreated)}
  editable={false}
/>


        

            <TextInput
              maxLength={50}
              style={styles.input}
              placeholder="Название"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
 {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
             maxLength={100}
              style={styles.textarea}
              placeholder="Краткое описание"
              onChangeText={handleChange('anons')}
              onBlur={handleBlur('anons')}
              value={values.anons}
              multiline
            />
            <TextInput
              maxLength={300}
              style={styles.textarea}
              placeholder="Полное описание"
              onChangeText={handleChange('full')}
              onBlur={handleBlur('full')}
              value={values.full}
              multiline
            />

            {/* Фото */}
            <TouchableOpacity
              style={[styles.imgSelect, { marginTop: 0 }]}
              onPress={() => pickImage(setFieldValue)}
            >
              <Text style={styles.imgSelect}>Выбрать изображение</Text>
            </TouchableOpacity>
            <TextInput
              style={{ width: 0, height: 0 }}
              value={values.img}
              placeholder="Фото"
              editable={false}
            />

            {/* Чекбоксы */}
            {checkboxes.map((cb) => (
              <View key={cb.id} style={[styles.checkboxContainer, styles.checkboxMargin]}>
                <TouchableOpacity
                  style={styles.checkboxWrapper}
                  onPress={() => toggleCheckbox(cb.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      cb.checked && styles.checkedCheckbox,
                    ]}
                  />
                  <TextInput
                   maxLength={50}
                    style={[
                      styles.checkboxInput,
                      { borderColor: cb.checked ? 'blue' : 'silver' }
                    ]}
                    placeholder="Введите название"
                    value={cb.label}
                    onChangeText={(text) => changeCheckboxLabel(cb.id, text)}
                  />
                 
              {/* Кнопка удаления */}
      <Text style={styles.deleteButton} onPress={() => deleteCheckbox(cb.id)}>
        - 
      </Text>
           
                </TouchableOpacity>
              </View>
            ))}
            {/* Кнопка добавления чекбокса */}
            <View style={styles.addButton}>
              <TouchableOpacity onPress={addCheckbox} style={styles.addButton}>
                <Text style={styles.addButtonText}>＋</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Сохранить"
              onPress={() => {
                handleSubmit();
                // дополнительно можно установить флаг успеха, если нужно
              }}
              color={editSuccess ? 'green' : '#2196F3'}
            />
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical:5,
    textAlignVertical: 'top',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius:100,
    width:20,
    paddingTop:0,
    paddingBottom:0
  },
  errorText:{
    color:'red',
      },
  checkboxMargin: {
    marginBottom: 20, 
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  imgSelect: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  addButton: {
  
    alignSelf: 'flex-start',
  },
  addButtonText: {
    backgroundColor: '#007BFF',
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    marginBottom:10,
    borderRadius:100
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 3,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#007BFF',
    borderColor:'#007BFF',
  },
  checkboxInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingVertical: 4,
  },
});
