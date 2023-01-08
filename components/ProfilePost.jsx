import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { View, Text, Image, StyleSheet } from "react-native";

export const ProfilePost = ({ item }) => {
  const { photo, title, comments, location, likes } = item;
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
          <EvilIcons name="comment" size={24} color="black" />
          <Text>{comments}</Text>
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
          <Text>{location}</Text>
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
