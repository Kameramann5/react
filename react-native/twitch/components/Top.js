import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import api from "../api"; // предположим, что это axios или подобный api
import { useNavigation } from '@react-navigation/native';
import { gStyle } from '../styles/style';
import AddStreamerButton from './AddStreamerButton2'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

function Stream() {
  
  const [channels, setChannels] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [streamersCount, setStreamersCount] = useState(0);
  const navigation = useNavigation(); 
  const [isStreamerAdded, setIsStreamerAdded] = useState(false); // флаг, добавлен ли стример
  const [streamerData, setStreamerData] = useState(null);
  const [streamerList, setStreamerList] = useState([]); // список добавленных стримеров


  const languages = [
    { label: 'Все', value: 'all' },
    { label: 'Русский', value: 'ru' },
    { label: 'Английский', value: 'en' },
    // Другие языки по необходимости
  ];

  // Загружаем список добавленных стримеров при монтировании и при изменениях
  useEffect(() => {
    loadStreamerList();
  }, []);

  const loadStreamerList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      const list = storedList ? JSON.parse(storedList) : [];
      setStreamerList(list);
    } catch (error) {
      console.error('Ошибка при загрузке списка:', error);
    }
  };
  // Обновляем флаг, когда streamData или список меняется
  useEffect(() => {
    if (streamerData && streamerData.user) {
      const isAddedForChannel = streamerList.includes(item.user_login);

      setIsStreamerAdded(isAdded);
    } else {
      setIsStreamerAdded(false);
    }
  }, [streamerData, streamerList]);


  const handleAddStreamer = async (login) => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      let list = storedList ? JSON.parse(storedList) : [];
      
      if (!list.includes(login)) {
        list.push(login);
        await AsyncStorage.setItem('streamerList', JSON.stringify(list));
        setStreamerList(list);
        // Можно показывать уведомление
      } else {
        // Стример уже есть
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("https://api.twitch.tv/helix/streams?first=100");
        let dataArray = result.data.data;

        // Получаем массив game_id
        let gameIDs = [...new Set(dataArray.map(stream => stream.game_id))];

        // Формируем запрос к API для имён игр
        let baseURL = "https://api.twitch.tv/helix/games?";
        let queryParams = gameIDs.map(id => `id=${id}`).join("&");
        let finalURL = `${baseURL}${queryParams}`;

        const gameNamesResult = await api.get(finalURL);
        let gameNameArray = gameNamesResult.data.data;

        // Обогащаем стримы именами игр и изменяем URL миниатюры
        const enrichedStreams = dataArray.map(stream => {
          const game = gameNameArray.find(name => name.id === stream.game_id);
          const gameName = game ? game.name : "Unknown";

          // Заменяем параметры в URL миниатюры
          const thumbnail_url = stream.thumbnail_url
            .replace("{width}", "400")
            .replace("{height}", "200");

          return {
            ...stream,
            gameName,
            thumbnail_url,
            description: stream.title,
          };
        });

        // Фильтр по языку
        const filteredStreams = (languageFilter === 'all')
          ? enrichedStreams
          : enrichedStreams.filter(
              (stream) => stream.language === languageFilter
            );

        // Подсчет уникальных стримеров
        const uniqueStreamers = new Set(filteredStreams.map((stream) => stream.user_name));
        setStreamersCount(uniqueStreamers.size);

        setChannels(filteredStreams);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [languageFilter]);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={gStyle.container}>
      <Text style={gStyle.header}>Топ стримеров </Text>
      <View style={styles.languageButtonsContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.value}
            style={[
              styles.languageButton,
              languageFilter === lang.value && styles.languageButtonActive,
            ]}
            onPress={() => setLanguageFilter(lang.value)}
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

      {channels.map((channel, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: channel.thumbnail_url }} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.title}>
            {index + 1}. {channel.user_name}</Text>
            <Text style={styles.description}>{channel.description}</Text>

            <Text style={styles.gameName}>{channel.gameName}</Text>


            <View   style={styles.viewContainer}>
            <View    style={styles.viewContainerInner} >  
      <Ionicons name="eye" size={15} color="gray" /> 
       <Text style={styles.viewContainerInnerText}>{channel.viewer_count}</Text>
      </View>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => openLink(`https://twitch.tv/${channel.user_name}`)}
            >
              <Text style={styles.buttonText}> {channel.user_name}</Text>
            </TouchableOpacity> */}
            <AddStreamerButton
  isAdded={streamerList.includes(channel.user_login)}
  onAdd={() => handleAddStreamer(channel.user_login)}
/>
</View>


             <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('StreamerLive', { userName: channel.user_login })}
>  
<Text style={styles.buttonText}>{channel.user_name }</Text>
</TouchableOpacity>



          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainerInnerText: {
    fontSize:13,
      },
      viewContainerInner: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        gap:5
      },
      viewContainer: {
        flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom:10,
    alignContent:'space-between',
    gap:10
      },

  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameName: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  viewers: {
    fontSize: 14,
    color: '#777',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#8c3fff',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },

  languageButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    alignContent: 'center',
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
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});

export default Stream;
