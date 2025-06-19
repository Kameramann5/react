import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView,StatusBar } from "react-native";
import MainStack from "./navigate";
import { SwitchProvider } from './components/Settings/SwitchContext';
import { TasksProvider } from './Context/TasksContext';



export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>  
      <TasksProvider>  
     <SwitchProvider>  
 <StatusBar  barStyle="light-content"  backgroundColor="#007BFF" />
      <MainStack />
      </SwitchProvider>
      </TasksProvider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});