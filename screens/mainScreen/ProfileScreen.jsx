import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
});

export default ProfileScreen;
