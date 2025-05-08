import React, {useState,useEffect} from 'react';
import { StyleSheet,SafeAreaProvider } from 'react-native';
import { gStyle } from './styles/style';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import MainStack from './navigate';
import Main from './components/Main';



SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'mt-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'mt-light': require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
  })


useEffect(()=>{
    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }
    prepare;
},[])


if(!fontsLoaded) {
return null;
} else {
    SplashScreen.hideAsync();
}
return (
   
      <MainStack />
  
)




}

const styles = StyleSheet.create({



});