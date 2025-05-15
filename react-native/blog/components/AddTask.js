import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Импортируем image-picker
import { Formik } from "formik";
import * as Yup from 'yup'; // Импортируем Yup для валидации

// Схема валидации
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название обязательно'),
  anons: Yup.string(),
  full: Yup.string(),
  img: Yup.string().nullable(),
});



export default function AddTask({ AddArticle }) {
  const [localImage, setLocalImage] = useState(null); // выбранное изображение

  // Состояния аккордеонов
  const [accordionAnons, setAccordionAnons] = useState(false);
  const [accordionFull, setAccordionFull] = useState(false);
  const [accordionImage, setAccordionImage] = useState(false);

  // Начальные чекбоксы
  const [checkboxes, setCheckboxes] = useState([]);

  // Время обновления, обновляется только при сохранении
  const [timeCreated, setTimeCreated] = useState(null);

  const toggleCheckbox = (id) => {
    setCheckboxes(prev =>
      prev.map(cb =>
        cb.id === id ? { ...cb, checked: !cb.checked } : cb
      )
    );
  };

  const changeCheckboxLabel = (id, text) => {
    setCheckboxes(prev =>
      prev.map(cb =>
        cb.id === id ? { ...cb, label: text } : cb
      )
    );
  };

  const addCheckbox = () => {
    const newId = Date.now().toString();
    setCheckboxes(prev => [
      ...prev,
      { id: newId, label: "", checked: false },
    ]);
  };

  const pickImage = async (setFieldValue) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
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
    <View>
      <Formik
        initialValues={{ name: "", anons: "", full: "", img: null }}
        validationSchema={validationSchema} // добавляем схему валидации
        onSubmit={(values, actions) => {
          // Обновляем время только при отправке формы
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          setTimeCreated(formattedDate); // обновляем время

          const data = {
            ...values,
            dateCreated: formattedDate,
            dateUpdated: formattedDate,
            tasks: [...checkboxes],
          };
          AddArticle(data);
          actions.resetForm();
          setLocalImage(null);
        }}
      >
        {(props) => (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Название */}
            <TextInput
              style={styles.input}
              value={props.values.name}
              placeholder="Название"
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
            />
            {props.touched.name && props.errors.name && (
              <Text style={styles.errorText}>{props.errors.name}</Text>
            )}

            {/* Остальной код без изменений */}
            {/* Аккордеон для "Анонс" */}
            <Accordion
              title={`Анонс ${accordionAnons ? '▲' : '▼'}`}
              isOpen={accordionAnons}
              toggle={() => setAccordionAnons(!accordionAnons)}
            >
              {accordionAnons && (
                <TextInput
                  style={styles.textarea}
                  value={props.values.anons}
                  placeholder=""
                  onChangeText={props.handleChange("anons")}
                  onBlur={props.handleBlur("anons")}
                  multiline
                />
              )}
            </Accordion>

            {/* Аккордеон для "Описание" */}
            <Accordion
              title={`Описание ${accordionFull ? '▲' : '▼'}`}
              isOpen={accordionFull}
              toggle={() => setAccordionFull(!accordionFull)}
            >
              {accordionFull && (
                <TextInput
                  style={styles.textarea}
                  value={props.values.full}
                  placeholder=""
                  onChangeText={props.handleChange("full")}
                  onBlur={props.handleBlur("full")}
                  multiline
                />
              )}
            </Accordion>

            {/* Аккордеон для "Выбор изображения" */}
            <Accordion
              title={`Выбрать изображение ${accordionImage ? '▲' : '▼'}`}
              isOpen={accordionImage}
              toggle={() => setAccordionImage(!accordionImage)}
            >
              {accordionImage && (
                <>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => pickImage(props.setFieldValue)}
                  >
                    <Text style={styles.imageButtonText}>Выбрать изображение</Text>
                  </TouchableOpacity>
                  {props.values.img && (
                    <Image
                      source={{ uri: props.values.img }}
                      style={styles.imagePreview}
                    />
                  )}
                </>
              )}
            </Accordion>

            {/* Генерация чекбоксов */}
            {checkboxes.map((cb) => (
              <View key={cb.id} style={styles.checkboxContainer}>
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
                    style={styles.checkboxInput}
                    placeholder="Введите название"
                    value={cb.label}
                    onChangeText={(text) => changeCheckboxLabel(cb.id, text)}
                  />
                </TouchableOpacity>
              </View>
            ))}

            {/* Кнопка добавления чекбокса */}
            <TouchableOpacity style={styles.addButton} onPress={addCheckbox}>
              <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>

            {/* Кнопка отправки */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                // Перед вызовом handleSubmit, проверим ошибку для "name"
                if (props.errors.name) {
                  // Можно показать alert или фокусировать поле
                  alert(props.errors.name);
                } else {
                  props.handleSubmit();
                }
              }}
            >
              <Text style={styles.submitButtonText}>Добавить</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

// Компонент Accordion для удобства
const Accordion = ({ title, isOpen, toggle, children }) => (
  <View style={styles.accordionContainer}>
    <TouchableOpacity style={styles.accordionHeader} onPress={toggle}>
      <Text style={styles.accordionHeaderText}>{title}</Text>
    </TouchableOpacity>
    {isOpen && children}
  </View>
);

const styles = StyleSheet.create({
  errorText:{
color:'red',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  accordionContainer: {
    marginTop: 15,
  },
  accordionHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  accordionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    marginTop: 15,
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  },
  checkboxInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingVertical: 4,
  },
  addButton: {
    marginTop: 20,
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
  submitButtonText: {
    backgroundColor: '#007BFF',
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
