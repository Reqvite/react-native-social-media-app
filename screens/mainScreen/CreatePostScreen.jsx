import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Camera } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { shareAsync } from "expo-sharing";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";

import { useEffect, useRef, useState } from "react";
import { CameraOptions } from "../../components/CameraOptions";
import { CameraButtons } from "../../components/CameraButtons";

const CreatPostScreen = ({ navigation }) => {
  let cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState(null);
  const [postPhoto, setPostPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPostPhoto(result.assets[0].uri);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleKeyboard = () => {
    Keyboard.dismiss();
    console.log(location);
  };

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const setNewPostPhoto = async () => {
      setPostPhoto(photo.uri);
      setPhoto(undefined);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    const savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const discard = () => setPhoto(undefined);

    return (
      <CameraOptions
        photo={photo.base64}
        setNewPostPhoto={setNewPostPhoto}
        sharePic={sharePic}
        savePhoto={savePhoto}
        discard={discard}
      />
    );
  }

  const handleTypeOfCamera = () =>
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );

  const deletePhoto = () => setPostPhoto("");

  const sendPhoto = () => {
    let photo = postPhoto;
    navigation.navigate("Post", {
      photo,
      title,
      likes: 232,
      comments: 22,
      location: "Ivano-Frankivs'k Region, Ukraine",
      id: "22",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.topBox}>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.imageLoader}>
            <ImageBackground
              style={styles.backgroundImg}
              source={{ uri: postPhoto }}
            >
              <Camera style={styles.camera} ref={cameraRef} type={type} />
              <CameraButtons
                pickImage={pickImage}
                handleTypeOfCamera={handleTypeOfCamera}
                deletePhoto={deletePhoto}
                takePic={takePic}
              />
            </ImageBackground>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Title..."
              style={styles.inputTitle}
              onChangeText={(text) => setTitle(text)}
            />
            <View style={styles.inputPosition}>
              <EvilIcons
                style={styles.inputIcon}
                name="location"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                inlineImageLeft="search_icon"
                placeholder="Location..."
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={sendPhoto}
            >
              <Text style={styles.btnTitle}>Publish</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
    justifyContent: "flex-end",
    alignItems: "center",
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
  bottomBox: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  imageLoader: {
    width: 344,
    height: 300,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    backgroundColor: "red",
  },
  camera: {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  form: {
    marginTop: 0,
  },
  inputTitle: {
    fontFamily: "Montserrat-Bold",
    height: 50,
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E8E8E8",
  },
  input: {
    fontFamily: "Montserrat-Bold",
    height: 50,
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 25,
  },
  inputPosition: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    bottom: "20%",
  },
  btn: {
    height: 51,
    background: "#F6F6F6",
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "#F6F6F6",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#F6F6F6",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 18,
  },
  deleteBtn: {
    height: 51,
    background: "#F6F6F6",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 140,
    ...Platform.select({
      ios: {
        backgroundColor: "#F6F6F6",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#F6F6F6",
        borderColor: "transparent",
      },
    }),
  },
});

export default CreatPostScreen;
