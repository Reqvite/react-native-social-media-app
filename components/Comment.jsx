import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

export const Comment = ({ item }) => {
  const { text, createdAt, photoURL } = item;
  // const messageStatus = uid === auth.currentUser.uid ? "sent" : "received";
  const date = new Date(createdAt).toString();
  console.log(date);
  return (
    <View style={styles.box}>
      <Image
        style={styles.postImg}
        source={{
          uri: photoURL,
        }}
      />
      <View style={styles.messageBox}>
        <Text style={styles.message}>{text}</Text>
        <Text style={styles.message}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageBox: {
    marginLeft: 10,
    marginTop: 10,
    width: 160,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
  },
  message: {},
  postImg: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
});
