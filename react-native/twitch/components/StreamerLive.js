// StreamerLive.js
import React, { useEffect  } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from '@react-navigation/native';


function StreamerLive({ route,navigation }) {
  const { userName } = route.params;
  useFocusEffect(
    React.useCallback(() => {
      // скрывать табы
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
      return () => {
        // показывать табы обратно при уходе с экрана
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'flex' },
        });
      };
    }, [navigation])
  );
  useEffect(() => {
    // Разблокировать ориентацию, разрешая любой поворот при входе
    ScreenOrientation.unlockAsync();

    // При размонтировании снова заблокировать ориентацию
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // URL трансляции на Twitch
  const twitchEmbedUrl = `https://player.twitch.tv/?channel=${userName}&parent=localhost`; // замените localhost на ваш домен, если нужно

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <WebView
        source={{ uri: twitchEmbedUrl }}
        style={styles.webview}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default StreamerLive;
