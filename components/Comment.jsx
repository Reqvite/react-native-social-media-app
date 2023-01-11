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

export const Comment = () => {
  const messageStatus = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <Viev>
      <Text maxW="75vw" p={5} background="#1663cf" borderRadius={10}></Text>
      <Image
        referrerPolicy="no-referrer"
        ml={2}
        src={photoURL}
        alt={text}
        w="50px"
        h="50px"
        borderRadius="50%"
      />
    </Viev>
  );
};
