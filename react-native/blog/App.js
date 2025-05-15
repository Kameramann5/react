import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigate";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "mt-bold": require("./assets/fonts/montserrat/Montserrat-Bold.ttf"),
    "mt-light": require("./assets/fonts/montserrat/Montserrat-Light.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Можно показать лоадер
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

    
      <MainStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
