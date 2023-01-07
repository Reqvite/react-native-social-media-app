import { View, Text, StyleSheet } from "react-native";

const PostScreen = () => {
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

export default PostScreen;
