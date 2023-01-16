import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PublicationsPost } from "../../components/PublicationsPost";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { fetchPosts } from "../../redux/posts/postsOperations";

const ProfileScreen = ({ navigation }) => {
  const { nickname, userPhoto, userId } = useSelector((state) => state.auth);
  const {
    items: posts,
    allItems: allPosts,
    isLoading,
  } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, [allPosts]);

  const renderItem = ({ item }) => (
    <PublicationsPost item={item} navigation={navigation} />
  );

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Photo_BG.jpg")}
        style={styles.image}
      >
        <View style={styles.profileBox}>
          <View style={styles.photoBox}>
            <Image style={styles.profilePhoto} source={{ uri: userPhoto }} />
          </View>
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
          <Text style={styles.name}>{nickname}</Text>
          {isLoading && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color="#FF6C00"
            />
          )}
          {posts.length === 0 ? (
            <Text style={styles.error}>You don't have any posts yet.</Text>
          ) : (
            <SafeAreaView style={styles.bottomBox}>
              <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{
                  marginTop: 10,
                  marginBottom: 160,
                }}
                showsVerticalScrollIndicator={false}
              />
            </SafeAreaView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  profileBox: {
    flex: 0.85,
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  photoBox: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  profilePhoto: {
    flex: 1,
    borderRadius: 16,
  },
  logoutIcon: {
    marginTop: 22,
    right: 0,
    position: "absolute",
  },
  name: {
    marginTop: 65,
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    textAlign: "center",
  },
  bottomBox: {
    alignSelf: "center",
  },
  error: {
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
  },
  loader: {
    position: "absolute",
    left: 10,
    top: 22,
  },
});

export default ProfileScreen;
