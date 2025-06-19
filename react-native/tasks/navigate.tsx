import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import FullTask from "./components/FullITask";
import Settings from './components/Settings';
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
            headerShown: false,
            title: "Главная",
            headerStyle: { backgroundColor: "blue", height: 50 },
            headerTitleStyle: { fontWeight: "400",color:"white" },
          }}
        />
        <Stack.Screen
          name="FullTask"
          component={FullTask}
          options={({ route }) => ({ title: route.params.name })}
        />
          <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Настройки' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
