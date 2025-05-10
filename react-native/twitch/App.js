import React, {useState,useEffect} from 'react';
import { StyleSheet,SafeAreaProvider } from 'react-native';
import { gStyle } from './styles/style';
import * as SplashScreen from 'expo-splash-screen'
import MainStack from './navigate';

export default function App() {

return (
      <MainStack /> 
)
}
const styles = StyleSheet.create({
});