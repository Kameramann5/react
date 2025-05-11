import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
} from 'react-native';

import api from '../api';

function RusStreams({ route, navigation }) {
  const { gameID, gameName } = route.params; // Передайте параметры при навигации
  const [streamData, setStreamData] = useState([]);
  const [streamersCount, setStreamersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(
          `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100`
        );
        let dataArray = result.data.data;

        const rusStreams = dataArray.filter(stream => stream.language === 'ru');
        console.log(rusStreams);
        let finalArray = rusStreams.map((stream) => {
          let newURL = stream.thumbnail_url
            .replace('{width}', '400')
            .replace('{height}', '200');
          return { ...stream, thumbnail_url: newURL, description: stream.title };
        });

        // Подсчет уникальных стримеров
        const uniqueStreamers = new Set(finalArray.map((stream) => stream.user_name));
        setStreamersCount(uniqueStreamers.size);

        setStreamData(finalArray);
        setCurrentPage(1); // сброс к первой странице при новом обновлении данных
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    };
    fetchData();
  }, [gameID]);

  // Расчет данных для текущей страницы
  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return streamData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(streamData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const truncateDescription = (description, maxLength = 34) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.thumbnail_url }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.description}>{truncateDescription(item.description)}</Text>
        <Text style={styles.viewers}>{item.viewer_count} зрителей</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StreamerLive', { userName: item.user_name })}
        >
          <Text style={styles.buttonText}>{item.user_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalViewersCount = streamData.reduce((sum, stream) => sum + stream.viewer_count, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Убраны блоки с выбором языка */}

      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{totalViewersCount}</Text> зрителей смотрят
      </Text>
      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{streamersCount}</Text> стримеров загружено
      </Text>

      {/* Отображаем текущие 3 стримера */}
      <FlatList
        data={paginatedData()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      {/* Панель навигации по страницам */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Предыдущая</Text>
        </TouchableOpacity>

        <Text style={styles.pageInfo}>
          {currentPage} / {totalPages}
        </Text>

        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Следующая</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    padding: 16,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#8c3fff',
  },
  list: {
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    maxWidth: '48%',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  viewers: {
    fontSize: 14,
    marginBottom: 8,
    color: 'gray',
  },
  button: {
    backgroundColor: '#8c3fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 8,
    backgroundColor: '#8c3fff',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  pageInfo: {
    padding: 8,
    fontSize: 16,
  },
});

export default RusStreams;
