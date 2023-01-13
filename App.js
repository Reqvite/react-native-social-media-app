import React, { useCallback } from "react";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

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
      <Main />
    </Provider>
  );
}
