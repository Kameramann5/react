import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StreamerStatus from './StreamerStatus';
import Ionicons from '@expo/vector-icons/Ionicons';
import { gStyle } from '../styles/style';

const LoveStreamers = ({ navigation }) => {
  const [streamers, setStreamers] = useState([]);

  const loadStreamers = async () => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      setStreamers(storedList ? JSON.parse(storedList) : []);
    } catch (error) {
      console.error('Ошибка при загрузке списка:', error);
    }
  };

  useEffect(() => {
    // Загружаем данные при первом рендере
    loadStreamers();

    // Добавляем слушателя фокуса, чтобы обновлять данные при каждом входе
    const unsubscribe = navigation.addListener('focus', () => {
      loadStreamers();
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Функция для удаления стримера с подтверждением
  const handleDeleteStreamer = (userName) => {
    Alert.alert(
      'Подтверждение',
      `Вы действительно хотите перестать отслеживать "${userName}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const updatedStreamers = streamers.filter((item) => item !== userName);
            try {
              await AsyncStorage.setItem('streamerList', JSON.stringify(updatedStreamers));
              setStreamers(updatedStreamers);
            } catch (error) {
              console.error('Ошибка при сохранении списка:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('StreamerLive', { userName: item })}
      >
        <View style={styles.content}>
          <StreamerStatus userName={item} />
          <Text style={styles.streamerName}>{item}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteStreamer(item)}
          >
            <Ionicons name="heart-dislike" size={24} color="#8c3fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={gStyle.container}>
      <Text style={gStyle.header}>Отслеживаемое</Text>
      {streamers.length === 0 ? (
        <Text style={styles.empty}>Список пуст</Text>
      ) : (
        <FlatList
          data={streamers}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streamerName: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
    color: '#222',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
  },
});

export default LoveStreamers;
