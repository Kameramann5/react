import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { gStyle } from "../styles/style";
import { Formik } from "formik";

export default function Form({ AddArticle }) {
  return (
    <View>
      <Formik
        initialValues={{ name: "", anons: "", full: "", img: "" }}
        onSubmit={(values, action) => {
          AddArticle(values);
          action.resetForm();
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
            <TextInput
              style={styles.input}
              value={props.values.img}
              placeholder="Укажите фото"
              onChangeText={props.handleChange("img")}
            />
            <Button title="Добавить" onPress={props.handleSubmit} />
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
});
