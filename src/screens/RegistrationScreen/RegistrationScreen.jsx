import React from "react";

import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default RegistrationScreen = () => (
  <ImageBackground>
    <Text style={styles.title}>React Native</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
