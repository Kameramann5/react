import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import FullTask from "./components/FullITask";

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
            headerStyle: { backgroundColor: "blue", height: 50 },
            headerTitleStyle: { fontWeight: "400",color:"white" },
          }}
        />
        <Stack.Screen
          name="FullTask"
          component={FullTask}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
