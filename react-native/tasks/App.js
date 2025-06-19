import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView,StatusBar } from "react-native";
import MainStack from "./navigate";
import { SwitchProvider } from './components/Settings/SwitchContext';



export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>  
     <SwitchProvider>  
 <StatusBar  barStyle="light-content"  backgroundColor="#007BFF" />
      <MainStack />
      </SwitchProvider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});