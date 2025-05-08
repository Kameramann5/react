import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  SafeAreaProvider,
} from "react-native";
import { gStyle } from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Form from "./Form";
import EditForm from "./EditForm";

export default function Main() {
  const navigation = useNavigation();
  const [news, setNews] = useState([
    {
      name: "google",
      anons: "hi",
      full: "desc",
      key: "1",
      img: "https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/opengraph_color.png",
    },
    {
      name: "apple",
      anons: "hi",
      full: "desc",
      key: "2",
      img: "https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/opengraph_color.png",
    },
    {
      name: "facebok",
      anons: "hi",
      full: "desc",
      key: "3",
      img: "https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/opengraph_color.png",
    },
  ]);

  const [modalWindow, setModalWindow] = useState(false);
  const AddArticle = (article) => {
    setNews((list) => {
      article.key = Math.random().toString();
      return [article, ...list];
    });
    //скрыть окно
    setModalWindow(false);
  };
  const deleteArticle = (key) => {
    setNews((prevNews) => prevNews.filter((article) => article.key !== key));
  };

  return (
    <View style={gStyle.main}>
      <Modal visible={modalWindow}>
        <View style={gStyle.main}>
          <Ionicons
            name="close-circle"
            size={34}
            color="red"
            style={styles.IoniconsClose}
            onPress={() => setModalWindow(false)}
          />
          <Text style={styles.title}>Форма добавления статей</Text>
          <Form AddArticle={AddArticle} />
        </View>
      </Modal>
      <Ionicons
        name="add-circle"
        size={40}
        color="green"
        style={styles.IoniconsAdd}
        onPress={() => setModalWindow(true)}
      />
      <Text style={[gStyle.title, styles.header]}>Главная страница</Text>

      <FlatList
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("FullInfo", {
                ...item,
                deleteArticle,
                updateArticle: (updatedArticle) => {
                  setNews((prev) =>
                    prev.map((n) =>
                      n.key === item.key ? { ...n, ...updatedArticle } : n
                    )
                  );
                },
              })
            }
          >
            <Image
              style={styles.image}
              source={{
                uri: item.img,
              }}
            />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.anons}>{item.anons}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  IoniconsClose: {
    textAlign: "center",
  },
  IoniconsAdd: {
    textAlign: "center",
    marginBottom: 15,
  },
  header: {
    marginBottom: 30,
  },
  item: {
    width: "100%",
    marginBottom: 30,
  },
  title: {
    fontFamily: "mt-bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  anons: {
    fontFamily: "mt-light",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
  },
});
