import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { gStyle } from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from "./SearchBar";
import Form from "./Form";
import EditForm from "./EditForm";
import Pagination from "./Pagination"; 


export default function Main() {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // состояние поиска
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;



  // Загрузка данных из AsyncStorage при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('news');
        if (storedData !== null) {
          setNews(JSON.parse(storedData));
        } 
                // Если данных нет, можно оставить список пустым

      } catch (e) {
        console.error("Ошибка загрузки данных из AsyncStorage", e);
      }
    };

    loadData();
  }, []);

  // Сохраняем список дел в AsyncStorage при его изменении
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('news', JSON.stringify(news));
      } catch (e) {
        console.error("Ошибка сохранения данных в AsyncStorage", e);
      }
    };

    saveData();
  }, [news]);



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

// Фильтрация по поисковому запросу
  const filteredNews = news.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// Расчет общего количества страниц
const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

// Получение текущих элементов
const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = filteredNews.slice(startIndex, startIndex + itemsPerPage);

const handlePageChange = (page) => {
  setCurrentPage(page);
};



  return (
    <View style={gStyle.main}>
      <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
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

    



      <TouchableOpacity style={styles.deleteButton} onPress={deleteArticle} activeOpacity={0.7}>
      <Text style={[gStyle.title, styles.header]}>Список задач ({news.length})</Text>
        <Ionicons
        name="add-circle"
        size={40}
        color="green"
        style={styles.IoniconsAdd}
        onPress={() => setModalWindow(true)}
      />
      </TouchableOpacity>



      {filteredNews.length === 0 ? (
        <Text style={styles.emptyText}>Задач не создано</Text>
      ) : (
        <FlatList
          data={currentItems}
          keyExtractor={(item) => item.key}
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
        
      )}
      {filteredNews.length > 0 && (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
)}
    </View>
  );
}
const styles = StyleSheet.create({
  IoniconsClose: {
    textAlign: "center",
  },
  item: {
    width: "100%",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ccc',
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
  emptyText: {
    textAlign: "center",
    fontSize: 20,
    color: "gray",
    marginTop: 50,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    justifyContent:'center',
    marginBottom:20,
  },
});
