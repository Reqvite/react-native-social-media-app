import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const ProfilePost = ({ item, navigation }) => {
  const { photo, title, comments, inputLocation, likes, photoLocation } = item;
  return (
    <>
      <Image
        source={{
          uri: photo,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.informationBox}>
        <View style={styles.spanBox}>
          <TouchableOpacity
            style={styles.spanBox}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Comments")}
          >
            <EvilIcons name="comment" size={24} color="black" />
            <Text>{comments}</Text>
          </TouchableOpacity>
          <AntDesign
            style={styles.spanLikeIcon}
            name="like2"
            size={20}
            color="black"
          />
          <Text>{likes}</Text>
        </View>
        <View style={styles.spanBox}>
          <EvilIcons name="location" size={24} color="black" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Map", { photoLocation })}
          >
            <Text>{inputLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 32,
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginTop: 8,
  },
  informationBox: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 343,
  },
  spanBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  spanLikeIcon: {
    marginLeft: 27,
  },
});
