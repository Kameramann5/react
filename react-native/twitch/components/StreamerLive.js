import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, AppState, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

function StreamerLive({ route, navigation }) {
  const { userName } = route.params;
  const appState = useRef(AppState.currentState);
  const [appIsActive, setAppIsActive] = useState(true);
  const webViewRef = useRef(null);

  // Получаем размеры экрана
  const { width, height } = useWindowDimensions();

  // Определяем ориентацию
  const isLandscape = width > height;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Обновляем стиль панели навигации в зависимости от ориентации
    navigation.setOptions({
      headerShown: !isLandscape, // Скрываем заголовок в горизонтальной ориентации
    });
  }, [isLandscape, navigation]);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setAppIsActive(true);
    } else if (nextAppState.match(/inactive|background/)) {
      setAppIsActive(false);
    }
    appState.current = nextAppState;
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: 'flex' },
        });
      };
    }, [navigation])
  );

  const twitchEmbedUrl = `https://player.twitch.tv/?channel=${userName}&parent=localhost`;
  const twitchChatUrl = `https://www.twitch.tv/embed/${userName}/chat?parent=localhost`;
  const key = appIsActive ? 'active' : 'paused';

  return (
    <View style={styles.container}>
    

      {appIsActive ? (
     
        <View style={[styles.streamContainer, isLandscape ? styles.landscape : styles.portrait]}>
        
        {isLandscape && (   
            <StatusBar hidden={true} />  
             )}
             {!isLandscape && (   
            <StatusBar  backgroundColor="black" barStyle="light-content" />  
             )}
        <View style={[isLandscape ? styles.customHor : styles.customVert]}>
          <WebView 
            key={key}
            ref={webViewRef}
            source={{ uri: twitchEmbedUrl }}
            style={isLandscape ? styles.webviewLandscape : styles.webview}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUser Action={false}
          />
            </View>
          {/* Показываем чат только в портретной ориентации */}
          {!isLandscape && (
         
            <WebView
              source={{ uri: twitchChatUrl }}
              style={styles.chatWebview}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUser Action={false}
            />
    
          )}
        </View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  customVert:{
flex:0,
height:220
},
customHor:{
  flex:1,
 
  },
  container: {
    flex: 1,
  },
  streamContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  portrait: {
    flexDirection: 'column',
  },
  landscape: {
    flexDirection: 'row',
  },
  webview: {
    flex: 2,
  },
  webviewLandscape: {
    flex: 1,
  },
  chatWebview: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default StreamerLive;
