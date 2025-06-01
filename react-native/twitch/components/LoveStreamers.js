import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert,ActivityIndicator  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StreamerStatus from './StreamerStatus';
import Icon from '@react-native-vector-icons/ionicons';
import { gStyle } from '../styles/style';
import api from '../api'; 

const LoveStreamers = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [streamers, setStreamers] = useState([]);
  const [streamingStatuses, setStreamingStatuses] = useState({});
  const [sortedStreamers, setSortedStreamers] = useState([]);

  const fetchStreamingStatuses = async (streamersList) => {
    const statuses = {};
    const fetchPromises = streamersList.map(async (user) => {
      try {
        const response = await api.get(
          `https://api.twitch.tv/helix/streams?user_login=${user}`
        );
        const data = response.data.data;
        if (data.length > 0) {
          const streamData = data[0];
          statuses[user] = {
            isStreaming: true,
            viewers: streamData.viewer_count,
          };
        } else {
          statuses[user] = {
            isStreaming: false,
            viewers: 0,
          };
        }
      } catch (error) {
        console.error(`Error fetching status for ${user}:`, error);
        statuses[user] = {
          isStreaming: false,
          viewers: 0,
        };
      }
    });

    await Promise.all(fetchPromises); // Ждем завершения всех запросов
    setStreamingStatuses(statuses);

    const sorted = [...streamersList].sort((a, b) => {
      const aStatus = statuses[a]?.isStreaming ? 0 : 1;
      const bStatus = statuses[b]?.isStreaming ? 0 : 1;

      if (aStatus !== bStatus) {
        return aStatus - bStatus;
      } else {
        const aViewers = statuses[a]?.viewers || 0;
        const bViewers = statuses[b]?.viewers || 0;
        return bViewers - aViewers;
      }
    });
    setSortedStreamers(sorted);
  };

  const loadStreamers = async () => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      const list = storedList ? JSON.parse(storedList) : [];
      setStreamers(list);
      if (list.length > 0) {
        await fetchStreamingStatuses(list); // Обновляем статусы при загрузке
      }
    } catch (error) {
      console.error('Ошибка при загрузке списка:', error);
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false только после завершения всех операций
    }
  };

  useEffect(() => {
    loadStreamers();

    const unsubscribe = navigation.addListener('focus', () => {
      loadStreamers(); // Перезагрузка данных при возврате на экран
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

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
              if (updatedStreamers.length > 0) {
                await fetchStreamingStatuses(updatedStreamers); // Обновляем статусы после удаления
              } else {
                setSortedStreamers([]);
              }
            } catch (error) {
              console.error('Ошибка при сохранении списка:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const status = streamingStatuses[item] || { isStreaming: false, viewers: 0 };
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('StreamerLive', { userName: item })}
        >
          <View style={styles.content}>
            <StreamerStatus userName={item} />
            <View>
              <Text style={styles.streamerName}>{item}</Text>
            </View>
            {status.isStreaming ? (
              <View style={styles.counterContainer}>
                <Icon name="eye" size={15} color="gray" />
                <Text style={styles.viewersText}>{status.viewers}</Text>
              </View>
            ) : (
              <View style={styles.counterContainer} />
            )}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteStreamer(item)}
            >
              <Icon name="heart-dislike" size={18} color="#8c3fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={gStyle.container}>
      <Text style={gStyle.header}>Отслеживаемое</Text>
      {loading ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#8c3fff" />
          <Text>Отслеживаемые ещё загружаются...</Text>
        </View>
      ) : (
        <>
          {sortedStreamers.length === 0 ? (
            <Text style={styles.empty}>Список пуст</Text>
          ) : (
            <FlatList
              data={sortedStreamers}
              keyExtractor={(item) => item}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewersText: {
    fontSize: 12,
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
    marginLeft: 10,
    height: 27,
  },
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
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    color: '#222',
    width: '100%',
    height: 27,
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default LoveStreamers;
