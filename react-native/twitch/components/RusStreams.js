import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import api from '../api';
import StreamCard from './StreamCard'; // импортируем новый компонент
import { gStyle } from '../styles/style';


function RusStreams({ route, navigation }) {
  const { gameID, gameName } = route.params;
  const [streamData, setStreamData] = useState([]);
  const [streamersCount, setStreamersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(
          `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=100&language=ru`
        );
        let dataArray = result.data.data;

        let finalArray = dataArray.map((stream) => {
          let newURL = stream.thumbnail_url
            .replace('{width}', '400')
            .replace('{height}', '200');
          return { ...stream, thumbnail_url: newURL, description: stream.title };
        });

        const uniqueStreamers = new Set(finalArray.map((stream) => stream.user_name));
        setStreamersCount(uniqueStreamers.size);
        setStreamData(finalArray);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    };
    fetchData();
  }, [gameID]);

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

  const totalViewersCount = streamData.reduce((sum, stream) => sum + stream.viewer_count, 0);

  return (
    <ScrollView contentContainerStyle={gStyle.container}>
      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{totalViewersCount}</Text> зрителей смотрят
      </Text>
      <Text style={styles.subHeader}>
        <Text style={styles.bold}>{streamersCount}</Text> стримеров загружено
      </Text>

      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
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
