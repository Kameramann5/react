import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Games from './components/Categories';
import Stream from './components/Top';
import GameStreams from './components/CategoriesInner';
import StreamerLive from './components/StreamerLive';
import RusStreams from './components/RusStreams'; 
import EngStreams from './components/EngStreams'; 
import TwitchAuth from './components/TwitchAuth';
import StreamerSearch from './components/StreamerSearch';
import LoveStreamers from './components/LoveStreamers';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function GamesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Games" component={Games} options={{ headerShown: false }} />
      <Stack.Screen name="StreamerSearch" component={StreamerSearch} options={{ title: 'Поиск' }} />
      <Stack.Screen name="TwitchAuth" component={TwitchAuth} options={{ title: 'Вход' }} />
      <Stack.Screen name="English" component={EngStreams} options={{ title: 'Английский' }} />
      <Stack.Screen name="Russian" component={RusStreams} options={{ title: 'Русский' }} />
      <Stack.Screen
        name="StreamerLive"
        component={StreamerLive}
        options={({ route }) => ({
          headerShown: false,
          title: route.params?.userName ?? 'Streamer',
        })}
      />
      <Stack.Screen
        name="GameStreams"
        component={GameStreams}
        options={({ route }) => ({ title: route.params?.gameName ?? 'Streams' })}
      />
    </Stack.Navigator>
  );
}

const homeName = "Категории";
const TopStreamName = "Топ";
const StreamerSearchName = "Поиск";
const LoveStreamersName = "Любимые";

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === TopStreamName) {
              iconName = focused ? 'swap-vertical' : 'swap-vertical-outline';
            } else if (route.name === StreamerSearchName) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === LoveStreamersName) {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={20} color={color} style={{ marginTop: 1 }} />;
          },
          tabBarActiveTintColor: '#8c3fff',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
          tabBarStyle: { padding: 0, height: 50 },
        })}
      >
        <Tab.Screen
          name={homeName}
          component={GamesStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={TopStreamName}
          component={Stream}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={LoveStreamersName}
          component={LoveStreamers}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={StreamerSearchName}
          component={StreamerSearch}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
