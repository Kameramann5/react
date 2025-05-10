// StreamerLive.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {WebView} from 'react-native-webview';
function StreamerLive({ route }) {
  const { userName } = route.params;

  // URL трансляции на Twitch
  const twitchEmbedUrl = `https://player.twitch.tv/?channel=${userName}&parent=yourdomain.com`; // замените yourdomain.com на ваш домен или используйте свой
  // или можно просто открыть через браузер

  return (
    <View style={styles.container}>
      {/* Встроенный плеер Twitch */}
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
