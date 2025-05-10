import React from 'react';
import { View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
  NavigationContainer,
  
} from "@react-navigation/native";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';

// Импортируйте ваши компоненты
import Games from './components/Games';
import Header from './components/Header';
import Stream from './components/Streams';
import GameStreams from './components/GameStreams';
import StreamerLive from './components/StreamerLive';
import RusStreams from './components/RusStreams'; 
import EngStreams from './components/EngStreams'; 
import TwitchAuth from './components/TwitchAuth';
// Создайте стек-навигацию
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return ( 

    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Games">
      <Stack.Screen name="TwitchAuth" component={TwitchAuth} options={{ title: 'TwitchAuth' }}  />
      <Stack.Screen name="English" component={EngStreams} options={{ title: 'Английский' }}  />
      <Stack.Screen name="Russian" component={RusStreams} options={{ title: 'Русский' }}  />
      <Stack.Screen name="StreamerLive" component={StreamerLive}    options={({ route }) => ({ title: route.params?.userName ?? 'Streamer' })}  />
        <Stack.Screen name="Games" component={Games} options={{ headerShown: false }} />
        <Stack.Screen name="TopStreams" component={Stream} options={{ title: 'Топ стримеров' }} />
        <Stack.Screen name="GameStreams" component={GameStreams}   options={({ route }) => ({ title: route.params.gameName })} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}