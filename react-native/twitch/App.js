import React, {useState,useEffect} from 'react';
import { StyleSheet,SafeAreaProvider } from 'react-native';
import { gStyle } from './styles/style';
import * as SplashScreen from 'expo-splash-screen'
import MainStack from './navigate';
import { AuthProvider } from './components/AuthContext';
export default function App() {

return (
      <AuthProvider>  
      <MainStack /> 
      </AuthProvider>
)
}
const styles = StyleSheet.create({
});