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
  const { text } = item;
  // const messageStatus = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <View>
      <Text styles={{ color: "black" }}>{text}</Text>
      {/* <Image
        referrerPolicy="no-referrer"
        ml={2}
        src={photoURL}
        alt={text}
        w="50px"
        h="50px"
        borderRadius="50%"
      /> */}
    </View>
  );
};
