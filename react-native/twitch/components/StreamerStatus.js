import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../api'; // ваш api с настроенными headers для Twitch
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

const StreamerStatus = ({ userName }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamerInfo = async () => {
      try {
        // Получаем информацию о пользователе (аватарка)
        const userResponse = await api.get(
          `https://api.twitch.tv/helix/users?login=${userName}`
        );
        const userData = userResponse.data.data;
        if (userData.length > 0) {
          setAvatarUrl(userData[0].profile_image_url);
        }

        // Проверяем, стримит ли пользователь
        const streamResponse = await api.get(
          `https://api.twitch.tv/helix/streams?user_login=${userName}`
        );
        const streamData = streamResponse.data.data;
        setIsStreaming(streamData.length > 0);
      } catch (error) {
        console.error('Error fetching streamer info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreamerInfo();
  }, [userName]);

  if (loading) {
    return <ActivityIndicator size="small" color="#9146FF" />;
  }

  return (
    <View style={styles.container}>
      {avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          style={[
            styles.avatar,
            {
              borderColor: isStreaming ? 'green' : 'red', // меняем цвет обводки
              borderWidth: 3, // толщина обводки
            },
          ]}
        />
      )}
    
    </View>
  );
};

const styles = StyleSheet.create({
 

  container: {
    alignItems: 'center',
    marginVertical: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 0,
  },
});

export default StreamerStatus;
