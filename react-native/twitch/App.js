import React, {useState,useEffect} from 'react';
import { StyleSheet,SafeAreaProvider,StatusBar  } from 'react-native';
import { gStyle } from './styles/style';
import * as SplashScreen from 'expo-splash-screen'
import MainStack from './navigate';
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
     // Заблокировать ориентацию по умолчанию (например, только портрет)
  useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, []);
return (
      <>
      <StatusBar  barStyle="light-content"  backgroundColor="#8c3fff" />
      <MainStack /> 
      </>
)
}
const styles = StyleSheet.create({
});