import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // для навигации
import api from '../api'; // убедитесь, что api настроен для fetch или axios
import Header from './Header';


const Games = () => {
  const [games, setGames] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await api.get('https://api.twitch.tv/helix/games/top?&first=100');
        // result.data.data предполагается структура, как в вебе
        const dataArray = result.data.data;
        const finalArray = dataArray.map(game => {
          const newURL = game.box_art_url
            .replace('{width}', '230')
            .replace('{height}', '300');
          return { ...game, box_art_url: newURL };
        });
        setGames(finalArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.box_art_url }} style={styles.image} />
        <View style={styles.cardBody}>
        
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('GameStreams', {
                gameID: item.id,
                gameName: item.name,
              })
            }
          >
            <Text style={styles.buttonText}>{item.name} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     <Header />
      <Text style={styles.header}>Самые популярные категории</Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // можно настроить в зависимости от дизайна
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
  
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
  },
  cardBody: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#8c3fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Games;
