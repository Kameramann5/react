// В начале файла
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { gStyle } from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchBar from "./SearchBar";
import AddTaskModal from './AddTaskModal';
import Pagination from "./Pagination";
import Tasks from './Tasks'; // Импорт компонента списка

export default function Main() {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  // Загрузка данных из AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('news');
        if (storedData !== null) {
          setNews(JSON.parse(storedData));
        }
      } catch (e) {
        console.error("Ошибка загрузки данных из AsyncStorage", e);
      }
    };
    loadData();
  }, []);

  // Сохранение данных
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

  const handleAddTask = (article) => {
    setNews((list) => {
      article.key = Math.random().toString();
      return [article, ...list];
    });
    setAddModalVisible(false);
  };

  const deleteArticle = (key) => {
    setNews((prevNews) => prevNews.filter((article) => article.key !== key));
  };

  // Фильтрация и сортировка
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated)
  );
  const filteredNews = sortedNews.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemPress = (item) => {
    navigation.navigate("FullTask", {
      ...item,
      deleteArticle,
      updateArticle: (updatedArticle) => {
        setNews((prev) =>
          prev.map((n) => (n.key === item.key ? { ...n, ...updatedArticle } : n))
        );
      },
    });
  };

  return (
    <SafeAreaView style={gStyle.main}>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAddTask}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[gStyle.title, styles.header]}>Список задач ({news.length})</Text>
        <Ionicons
          name="add-circle"
          size={40}
          color="blue"
          style={styles.IoniconsAdd}
        />
      </TouchableOpacity>

      {filteredNews.length === 0 ? (
        <Text style={styles.emptyText}>Задач не создано</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Tasks data={currentItems} onItemPress={handleItemPress} deleteArticle={deleteArticle} />
        </View>
      )}

      {filteredNews.length > 0 && (
        <View style={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ваши стили
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  header: {
    // добавьте нужные стили
  },
  IoniconsAdd: {
    // нужные стили
  },
  emptyText: {
    textAlign: "center",
    fontSize: 20,
    color: "gray",
    marginTop: 50,
  },
  paginationContainer: {
    // стили для пагинации
  },
});
