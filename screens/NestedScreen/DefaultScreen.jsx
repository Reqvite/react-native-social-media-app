import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

import { PublicationsPost } from "../../components/PublicationsPost";

import { posts } from "../../data/posts";
import { authSignOutUser } from "../../redux/auth/authOperations";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [allPosts, setAllPosts] = useState([...posts]);

  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <PublicationsPost item={item} navigation={navigation} />
  );

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  useEffect(() => {
    if (route.params) {
      setAllPosts((prevSt) => [route.params, ...prevSt]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.title}>Publications</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.link}
          onPress={signOut}
        >
          <MaterialIcons
            style={styles.logoutIcon}
            name="logout"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.bottomBox}>
        <View style={styles.userBox}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PLI03fmLRu4fSpIl9RqTBwnh4qT6-E0qsw&usqp=CAU",
            }}
            style={styles.userPhoto}
          />
          <View style={styles.userInformation}>
            <Text style={styles.userName}>Docktor Who</Text>
            <Text style={styles.userMail}>email@example.com</Text>
          </View>
        </View>
        <FlatList
          data={allPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{
            marginTop: 10,
            marginBottom: 160,
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    height: 88,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    marginBottom: 11,
  },
  logoutIcon: {
    marginLeft: 103,
    marginBottom: 12,
  },
  bottomBox: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  userInformation: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
  },
  userMail: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
});

export default DefaultPostsScreen;
