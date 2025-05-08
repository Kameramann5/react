import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import FullInfo from "./components/FullInfo";
import {
  createStaticNavigation,
  useNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Главная",
            headerStyle: { backgroundColor: "orange", height: 100 },
            headerTitleStyle: { fontWeight: "400" },
          }}
        />
        <Stack.Screen
          name="FullInfo"
          component={FullInfo}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
