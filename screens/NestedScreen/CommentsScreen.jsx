import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import uuid from "react-native-uuid";
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

import { Comment } from "../../components/Comment";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { fetchPostCommnets } from "../../redux/posts/postsOperations";

const CommentsScreen = ({ route }) => {
  const user = useSelector((state) => state.auth.nickname);
  const userId = useSelector((state) => state.auth.userId);
  const photoURL = useSelector((state) => state.auth.userPhoto);
  const comments = useSelector((state) => state.posts.comments);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const renderItem = ({ item }) => <Comment item={item} />;
  useEffect(() => {
    dispatch(fetchPostCommnets(route.params.id));
  }, []);

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendMessage = async () => {
    const date = new Date().getTime();
    const id = uuid.v4();
    if (message === "") return;

    const newMessage = {
      id: id,
      text: message,
      createdAt: date,
      uid: userId,
      postId: route.params.id,
      // photoURL,
    };

    await setDoc(doc(db, "comments", `${user}_${id}`), newMessage);
    dispatch(fetchPostCommnets(route.params.id));
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View style={styles.container}>
        <View style={styles.topBox} />
        <SafeAreaView style={styles.bottomBox}>
          <Image
            style={styles.postImg}
            source={{
              uri: route.params.photo,
            }}
          />
          <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{
              marginTop: 10,
              marginBottom: 160,
            }}
          />
          <View style={styles.commentForm}>
            <TextInput
              placeholder="Write your comment..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={styles.input}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.sendBtn}
              onPress={sendMessage}
            >
              <Feather name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  bottomBox: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  postImg: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  commentForm: {
    position: "relative",
  },
  input: {
    marginTop: 15,
    height: 50,
    padding: 10,
    paddingRight: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F8F8F8",
    borderRadius: 100,
  },
  sendBtn: {
    position: "absolute",
    width: 38,
    height: 38,
    bottom: 8,
    right: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
