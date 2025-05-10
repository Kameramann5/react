import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CLIENT_ID = 'ciicbxp57ut6cvt2lh4s9b817v8bzt'; // ваш client_id
const REDIRECT_URI = 'myapp://auth'; // схема вашего deep linking
const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=user:read:email`;

export default function TwitchLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const accessToken = 'k7x8bvai7p0ubkwqr5jk2u7xl2h0bi';

  useEffect(() => {
     // Функция для получения логина пользователя
     const fetchUserInfo = async () => {
        try {
          const response = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
              'Client-ID': 'ciicbxp57ut6cvt2lh4s9b817v8bzt', // ваш Client ID
              'Authorization': `Bearer ${accessToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Ошибка при получении данных пользователя');
          }
  
          const data = await response.json();
  
          if (data.data && data.data.length > 0) {
            setUsername(data.data[0].login);
          } else {
            setError('Пользователь не найден');
          }
        } catch (err) {
          setError(err.message);
        }
      };
   fetchUserInfo();



    // Проверяем сохраненное состояние авторизации
    (async () => {
      const savedUser = await AsyncStorage.getItem('twitch_username');
      if (savedUser) {
        setUsername(savedUser);
        setLoggedIn(true);
      }
    })();

    // Обработчик для deep link
    const handleUrl = async (event) => {
      const url = event.url;
      if (url.startsWith(REDIRECT_URI)) {
        // URL вида myapp://auth#access_token=...
        const hashPart = url.split('#')[1]; // получаем часть после #
        const params = new URLSearchParams(hashPart);
        const accessToken = params.get('access_token');
        if (accessToken) {
          await fetchUserInfo(accessToken);
        }
      }
    };

    Linking.addEventListener('url', handleUrl);

    // Проверка, был ли запуск через deep link
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl && initialUrl.startsWith(REDIRECT_URI)) {
        handleUrl({ url: initialUrl });
      }
    })();

    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const userLogin = data.data[0].login;
        setUsername(userLogin);
        setLoggedIn(true);
        await AsyncStorage.setItem('twitch_username', userLogin);
        console.log('Логин Twitch:', userLogin);
      } else {
        Alert.alert('Ошибка', 'Не удалось получить данные пользователя');
      }
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
    }
  };

  const handleLogin = async () => {
    // Открываем браузер для авторизации
    try {
      await Linking.openURL(AUTH_URL);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось открыть браузер');
    }
  };

  const handleReturn = async () => {
    // Очистка данных при выходе
    await AsyncStorage.removeItem('twitch_username');
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View>
          <Text style={styles.welcome}>Привет, {username}!</Text>
          <Button title="Выйти" onPress={handleReturn} />
        </View>
      ) : (
        <View>    
          <Text>Логин пользователя: {username}
          </Text>

        <Button title="Войти через Twitch" onPress={handleLogin} /> </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
