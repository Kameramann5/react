import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../api";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddStreamerButton from './AddStreamerButton'; 
import { gStyle } from '../styles/style';


const StreamerSearch = ({ route, navigation }) => {
  const [streamerName, setStreamerName] = useState("");
  const [streamerData, setStreamerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [streamerList, setStreamerList] = useState([]); // список добавленных стримеров
  const [isStreamerAdded, setIsStreamerAdded] = useState(false); // флаг, добавлен ли стример

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
      const isAdded = streamerList.includes(streamerData.user.login);
      setIsStreamerAdded(isAdded);
    } else {
      setIsStreamerAdded(false);
    }
  }, [streamerData, streamerList]);



  const handleAddStreamer = async () => {
    if (streamerData && streamerData.user) {
      try {
        const storedList = await AsyncStorage.getItem('streamerList');
        let list = storedList ? JSON.parse(storedList) : [];
        
        if (!list.includes(streamerData.user.login)) {
          list.push(streamerData.user.login);
          await AsyncStorage.setItem('streamerList', JSON.stringify(list));
          setStreamerList(list);
          // Используем display_name или login для отображения имени
          const streamerDisplayName = streamerData.user.display_name || streamerData.user.login;
          Alert.alert(
            '', // Пустой заголовок
            `Стример ${streamerDisplayName} добавлен в Отслеживаемое`
          );
        } else {
          Alert.alert(
            '',
            'Этот стример уже отслеживается'
          );
        }
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
      }
    }
  };

  const handleInputChange = (text) => {
    setStreamerName(text);
  };

  const handleSearch = async () => {
    if (!streamerName.trim()) {
      setError("Пожалуйста, введите имя стримера");
      setStreamerData(null);
      return;
    }

    setLoading(true);
    setError("");
    setStreamerData(null);

    try {
      // Получение user_id по имени
      const userResponse = await api.get("/users", {
        params: { login: streamerName },
      });

      if (userResponse.data.data.length === 0) {
        setError("Стример не найден");
        setLoading(false);
        return;
      }

      const user = userResponse.data.data[0];

      // Проверка трансляции
      const streamResponse = await api.get("/streams", {
        params: { user_id: user.id, user_login: user.login },
      });

      const streamInfo = streamResponse.data.data[0] || null;

      setStreamerData({ user, streamInfo });
    } catch (err) {
      console.error(err);
      setError("Ошибка при поиске стримера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={gStyle.container}>
      <Text style={gStyle.header}>Поиск стримера</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите имя стримера"
        value={streamerName}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity
        style={[styles.btnSearch, loading && styles.btnDisabled]}
        onPress={handleSearch}
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? "Поиск..." : "Найти"}</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {streamerData && (
        <View style={styles.resultContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StreamerLive", {
                userName: streamerData.user.login,
              })
            }
          >
            <View>
              <Text style={styles.itemContainerNameTitle}>
                {streamerData.user.display_name}
              </Text>

              <Text style={styles.loginText}>
                Логин: {streamerData.user.login}
              </Text>
              <Text style={styles.loginText}>Дата регистрации: {streamerData.user.created_at}</Text>
          
              <Text style={styles.loginText}>ID: {streamerData.user.id}</Text>
            </View>
          </TouchableOpacity>
       
          <View style={styles.centeredRow}>
            <Text>Статус:</Text>
            {streamerData.streamInfo ? (
              <Octicons name="broadcast" size={24} color="green" />
            ) : (
              <MaterialCommunityIcons
                name="broadcast-off"
                size={24}
                color="red"
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.profileImagebutton}
            onPress={() =>
              navigation.navigate("StreamerLive", {
                userName: streamerData.user.login,
              })
            }
          >
            <Image
              source={{ uri: streamerData.user.profile_image_url }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.loginText}>Описание: {streamerData.user.description}</Text>

          
          <AddStreamerButton
            isAdded={isStreamerAdded}
            onAdd={handleAddStreamer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#8c3fff",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  addedText: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  btnSearch: {
    backgroundColor: "#8c3fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
  },
  itemContainerNameTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#8c3fff",
    textAlign: "center",
  },
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

 
  input: {
    height: 40,
    borderColor: "#8c3fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  loader: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileImagebutton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 45,
    backgroundColor: "#8c3fff",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 30.0,
    elevation: 10,
  },
});

export default StreamerSearch;
