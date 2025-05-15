import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import StreamCard from './StreamCard';
import Pagination from './Pagination'; 
import { gStyle } from '../styles/style';

import api from '../api';

function GameStreams({ route, navigation }) {
  const { gameID, gameName } = route.params || {}; // Передайте параметры при навигации
  const [streamData, setStreamData] = useState([]);
  const [streamersCount, setStreamersCount] = useState(0);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const languages = [
    { label: 'Все', value: 'all' },
    { label: 'Русский', value: 'ru' },
    { label: 'Английский', value: 'en' },
    // Другие языки по необходимости
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(
          `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100`
        );
        let dataArray = result.data.data;

        // Фильтр по языку
        let filteredStreams;
        if (languageFilter === 'all') {
          filteredStreams = dataArray;
        } else {
          filteredStreams = dataArray.filter(
            (stream) => stream.language === languageFilter
          );
        }

        let finalArray = filteredStreams.map((stream) => {
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
  }, [gameID, languageFilter]);

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

  return (
    <View style={gStyle.container}>
      {/* Кнопки языков */}
      <View style={styles.languageButtonsContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.value}
            style={[
              styles.languageButton,
              languageFilter === lang.value && styles.languageButtonActive,
            ]}
            onPress={() => {
              if (lang.value === 'ru') {
                navigation.navigate('Russian', { gameID });
              } else if (lang.value === 'en') {
                navigation.navigate('English', { gameID });
              } else {
                setLanguageFilter(lang.value);
              }
            }}
          >
            <Text
              style={[
                styles.languageButtonText,
                languageFilter === lang.value && styles.languageButtonTextActive,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{streamData.reduce((sum, stream) => sum + stream.viewer_count, 0)}</Text> зрителей смотрят
      </Text>
      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{streamersCount}</Text> стримеров загружено
      </Text>

     
      <FlatList
        nestedScrollEnabled={true}
        data={paginatedData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StreamCard
            item={item}
            onPressStreamer={() =>
              navigation.navigate('StreamerLive', { userName: item.user_login })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 10, // небольшой отступ между строками
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
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
    // чтобы карточки занимали примерно половину ширины
    maxWidth: '48%',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  viewers: {
    fontSize: 14,
    marginBottom: 8,
    color:'gray',
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
  languageButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop:10,
  },
  languageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  languageButtonActive: {
    backgroundColor: '#8c3fff',
  },
  languageButtonText: {
    color: '#000',
  },
  languageButtonTextActive: {
    color: '#fff',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
alignContent:'center'
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
  pageInfo: {  padding: 8,
    fontSize: 16,
  },
});

export default GameStreams;
