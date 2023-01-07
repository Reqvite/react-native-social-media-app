import { View, Text, StyleSheet } from "react-native";

const CreatePostScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>CreatePost</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
});

export default CreatePostScreen;
