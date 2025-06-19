import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,Alert
} from "react-native";

import { Formik } from "formik";
import * as Yup from 'yup'; // Импортируем Yup для валидации
import Icon from '@react-native-vector-icons/ionicons';
import ColorPicker from './ColorPicker';


// Схема валидации
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название обязательное'),
  anons: Yup.string(),
  color: Yup.string(),
  full: Yup.string(),
  img: Yup.string().nullable(),
});



export default function AddTask({ AddArticle }) {
  const [localImage, setLocalImage] = useState(null); // выбранное изображение
  // Состояния аккордеонов
  const [accordionAnons, setAccordionAnons] = useState(false);
  const [accordionFull, setAccordionFull] = useState(false);
  const [accordionImage, setAccordionImage] = useState(false);
  const [accordionColor, setAccordionColor] = useState(false);
  // Начальные чекбоксы
  const [checkboxes, setCheckboxes] = useState([]);

  // Время обновления, обновляется только при сохранении
  const [timeCreated, setTimeCreated] = useState(null);


  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(255);

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;


  
  const colorString = `rgb(${red}, ${green}, ${blue})`;
  const handleSetRedColor = () => {
    setRed(255);
    setGreen(0);
    setBlue(0);
  };
  const handleSetGreenColor = () => {
    setRed(0);
    setGreen(255);
    setBlue(0);
  };
  const handleSetBlueColor = () => {
    setRed(0);
    setGreen(0);
    setBlue(255);
  };
  const handleSetPinkColor = () => {
    setRed(255);
    setGreen(192);
    setBlue(203);
  };
  const handleSetLightBlueColor = () => {
    setRed(135);
    setGreen(206);
    setBlue(235);
  };
  const handleSetYellowColor = () => {
    setRed(255);
    setGreen(255);
    setBlue(0);
  };
  const handleSetOrangeColor = () => {
    setRed(255);
    setGreen(165);
    setBlue(0);
  };
  const handleSetOrangeBlack = () => {
    setRed(0);
    setGreen(0);
    setBlue(0);
  };





  const NameRequired = () => {
    Alert.alert(
      'Ошибка создания',
      'Вы не заполнили название задачи',
      [
        {
          text: 'ок',
          style: 'cancel',
        },
     
      ],
      { cancelable: true }
    );
  };



  
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


  const openImagePicker = (setFieldValue) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchImageLibrary(options, (response) => {
      
      if (response.didCancel) {
        console.log('User  cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri; // Обратите внимание на эту строку
        if (uri) {
          setLocalImage(uri);
          setFieldValue('img', uri);
        }
      }
    });
    
  };



  return (
    <View>
      <Formik
        initialValues={{ name: "", anons: "", full: "", color: "", img: null }}
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
        {(formikProps) => {
          useEffect(() => {
  const newColor = `rgb(${red}, ${green}, ${blue})`;
  formikProps.setFieldValue('color', newColor);
}, [red, green, blue]);

// Улучшенная обработка текста цвета
const handleColorTextChange = (text) => {
  const match = text.match(/rgb$\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);
  if (match) {
    const r = Math.min(255, parseInt(match[1], 10));
    const g = Math.min(255, parseInt(match[2], 10));
    const b = Math.min(255, parseInt(match[3], 10));
    setRed(r);
    setGreen(g);
    setBlue(b);
  }
};
 
          return (
    
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Название */}
            <TextInput
              maxLength={50}
              style={styles.input}
              value={formikProps.values.name}
              placeholder="Название"
              onChangeText={formikProps.handleChange("name")}
              onBlur={formikProps.handleBlur("name")}
            />
            {formikProps.touched.name && formikProps.errors.name && (
              <Text style={styles.errorText}>{formikProps.errors.name}</Text>
            )}

            {/* Остальной код без изменений */}
            {/* Аккордеон для "Анонс" */}
        <Accordion
  title={ accordionAnons ?
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Анонс</Text>
      <Icon
        name="caret-down"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View> 
    :
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Анонс</Text>
      <Icon
        name="caret-up"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View>
  }
  isOpen={accordionAnons}
  toggle={() => setAccordionAnons(!accordionAnons)}
>
              {accordionAnons && (
                <TextInput
                 maxLength={200}
                  style={styles.textarea}
                  value={formikProps.values.anons}
                  placeholder="Введите анонс"
                  onChangeText={formikProps.handleChange("anons")}
                  onBlur={formikProps.handleBlur("anons")}
                  multiline
                />
                
              )}
            </Accordion>
           
        

            {/* Аккордеон для "Описание" */}
            <Accordion
  title={ accordionFull ?
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Описание</Text>
      <Icon
        name="caret-down"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View> 
    :
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Описание</Text>
      <Icon
        name="caret-up"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View>
  }
  isOpen={accordionFull}
  toggle={() => setAccordionFull(!accordionFull)}
>

       
              {accordionFull && (
                <TextInput
                   maxLength={500}
                  style={styles.textarea}
                  value={formikProps.values.full}
                  placeholder="Введите описание"
                  onChangeText={formikProps.handleChange("full")}
                  onBlur={formikProps.handleBlur("full")}
                  multiline
                />
              )}


              
            </Accordion>
           



       {/* Аккордеон для "Цвета" */}
       <Accordion
  title={ accordionColor ?
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Цвет</Text>
      <Icon
        name="caret-down"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View> 
    :
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Цвет</Text>
      <Icon
        name="caret-up"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View>
  }
  isOpen={accordionColor}
  toggle={() => setAccordionColor(!accordionColor)}
>

              {accordionColor && (
              
                 <ColorPicker
        red={red}
        setRed={setRed}
        green={green}
        setGreen={setGreen}
        blue={blue}
        setBlue={setBlue}
        
        // Передаем текущий цвет как строку
        colorValue={colorString}

        // Обработчик изменения текста (можно оставить пустым или реализовать)
        onColorChange={(text) => {}}

       // Передаем функцию для установки красного цвета
       setColorToRed={handleSetRedColor}
       setColorToGreen={handleSetGreenColor}
       setColorToBlue={handleSetBlueColor}
       setColorToPink={handleSetPinkColor}
       setColorToLightBlue={handleSetLightBlueColor}
       setColorToYellow={handleSetYellowColor}
       setColorToOrange={handleSetOrangeColor}
       setColorToBlack={handleSetOrangeBlack}
      />
              )}
            </Accordion>
       

            {/* Аккордеон для "Выбор изображения" */}
            <Accordion
  title={ accordionImage ?
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Изображение</Text>
      <Icon
        name="caret-down"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View> 
    :
    <View style={styles.AccordionContainer}>
      <Text style={styles.AccordionText}>Изображение</Text>
      <Icon
        name="caret-up"
        size={20}
        color="gray"
        style={styles.IoniconsAdd}
      />
    </View>
  }
  isOpen={accordionImage}
  toggle={() => setAccordionImage(!accordionImage)}
>

              {accordionImage && (
                <>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => openImagePicker(formikProps.setFieldValue)}
                  >
                    <Text style={styles.imageButtonText}>Выбрать изображение</Text>
                  </TouchableOpacity>
                  {formikProps.values.img && (
                    <Image
                      source={{ uri: formikProps.values.img }}
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
                    maxLength={100}
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
              <Text style={styles.addButtonText}>＋ Добавить пункт</Text>
            </TouchableOpacity>

            {/* Кнопка отправки */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                // Перед вызовом handleSubmit, проверим ошибку для "name"
                if (formikProps.errors.name) {
                  // Можно показать alert или фокусировать поле
                //  alert(formikProps.errors.name);
                  NameRequired(formikProps.errors.name)
                } else {
                  formikProps.handleSubmit();
                }
              }}
            >
              <Text style={styles.submitButtonText}>Добавить</Text>
            </TouchableOpacity>
          </ScrollView>
          );
        }
        }
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

  AccordionContainer: {
    flexDirection: 'row', alignItems: 'center'
  },
  AccordionText:{
    marginRight: 8,fontWeight:'bold'

  },
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
    borderColor:'#007BFF',
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
    color: 'white',
    fontWeight: 'bold',
    marginBottom:10,
    borderRadius:100,
    paddingHorizontal:15,
    paddingVertical:10
  },
  submitButtonText: {   borderRadius:100,
    backgroundColor: '#007BFF',
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    marginBottom:20
  },
});
