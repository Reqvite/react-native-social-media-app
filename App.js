import React, { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import { useRoute } from "./router";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const routing = useRoute(true);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
