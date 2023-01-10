import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import * as Font from "expo-font";
import { useRoute } from "./router";

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = Font.useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  auth.onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
