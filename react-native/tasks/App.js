import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView,StatusBar } from "react-native";
import MainStack from "./navigate";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
 <StatusBar  barStyle="light-content"  backgroundColor="#007BFF" />
      <MainStack />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});