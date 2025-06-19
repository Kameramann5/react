import React, { useState, useEffect,useContext   } from "react";
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
import Icon from '@react-native-vector-icons/ionicons';
import { SwitchContext } from './Settings/SwitchContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchBar from "./SearchBar";
import AddTaskModal from './AddTaskModal';
import Pagination from "./Pagination";
import Tasks from './Tasks'; // Импорт компонента списка

export default function Main() {
  const { Minimalizm } = useContext(SwitchContext);
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [foundCount, setFoundCount] = useState(0);



  let itemsPerPage;
  if (Minimalizm) {
    itemsPerPage = 10;
  } else {
    itemsPerPage = 30;
  }



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
      <View   style={styles.containerStyle }>
      <Text style={gStyle.header}>
  Список дел ({news.length})
  {searchTerm.length > 0 && (
    ` (${foundCount > 0 ? foundCount : 'пусто'})`
  )}
</Text>
   
     
    <TouchableOpacity
       onPress={() => navigation.navigate('Settings')}
        activeOpacity={0.7}
      >
        <Icon
        name="settings-outline"
          size={20}
          color="#007BFF"
          style={styles.IoniconsAdd}
        />
          
      </TouchableOpacity>
</View>
       <SearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
        data={sortedNews}
        onCountChange={(count) => setFoundCount(count)}
      />
      
   

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
      
        <Icon
        name="add-circle"
          size={40}
          color="#007BFF"
          style={styles.IoniconsAdd}
        />
          <Text style={[gStyle.title, styles.header]}>Создать задачу</Text>
      </TouchableOpacity>

      {filteredNews.length === 0 ? (
        <Text style={styles.emptyText}>Задач не создано</Text>
      ) : (
        
        <View style={{ flex: 1,}}>
          <Tasks data={currentItems} onItemPress={handleItemPress} deleteArticle={deleteArticle} />
        </View>
      
      )}

      {filteredNews.length > itemsPerPage && (
        <View >
          
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row', alignItems: 'center'
  },
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

  emptyText: {
    textAlign: "center",
    fontSize: 20,
    color: "gray",
    marginTop: 50,
  },

});
