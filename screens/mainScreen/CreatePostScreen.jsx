import { EvilIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as Sharing from "expo-sharing";
import uuid from "react-native-uuid";
import { Camera } from "expo-camera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CameraOptions } from "../../components/CameraOptions";
import { CameraButtons } from "../../components/CameraButtons";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchAllPosts } from "../../redux/posts/postsOperations";

const CreatPostScreen = ({ navigation }) => {
  const { nickname, userId, userPhoto } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState(null);
  const [postPhoto, setPostPhoto] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/640px-HD_transparent_picture.png"
  );
  const [title, setTitle] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState("");
  const [buttonBgColor, setButtonBgColorBgColor] = useState("#F8F8F8");
  const dispatch = useDispatch();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

      if (status !== "granted") {
        return;
      }
      if (
        postPhoto.length !== 0 &&
        title.length !== 0 &&
        inputLocation.length !== 0
      ) {
        setButtonBgColorBgColor("#FF6C00");
      } else {
        setButtonBgColorBgColor("#F8F8F8");
      }
    })();
  }, [postPhoto, title, inputLocation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setPostPhoto(result.assets[0].uri);
    }
  };

  const deletePhoto = () =>
    setPostPhoto(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/640px-HD_transparent_picture.png"
    );

  const handleTypeOfCamera = () =>
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const sharePic = () => {
      Sharing.shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const setNewPostPhoto = async () => {
      setIsLoading(true);
      setPostPhoto(photo.uri);
      setPhoto(undefined);
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const latitude = location?.coords.latitude;
      const longitude = location?.coords.longitude;

      const geoCode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let fullLocation = `${geoCode[0].city},${geoCode[0].country}`;
      setInputLocation(fullLocation);
      setIsLoading(false);
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

  const sendPhoto = async () => {
    if (
      postPhoto.length !== 0 &&
      title.length !== 0 &&
      inputLocation.length !== 0
    ) {
      setIsLoading(true);
      const address = await Location.geocodeAsync(inputLocation);
      const latitude = address[0]?.latitude;
      const longitude = address[0]?.longitude;

      const id = uuid.v4();
      const photoLink = await uploadPhotoToServer(postPhoto);

      const date = new Date().getTime();
      const coords =
        latitude && longitude ? { latitude, longitude } : "noCoords";
      const newPost = {
        createdAt: date,
        photo: photoLink,
        title,
        likes: [],
        comments: 0,
        photoLocation: coords,
        inputLocation,
        id,
        userId,
        userPhoto,
        nickname,
      };
      await setDoc(doc(db, "posts", `${id}`), newPost);

      dispatch(addPost(newPost));
      dispatch(fetchAllPosts());
      clearPost();
      setIsLoading(false);
      navigation.navigate("Publications");
    }

    return;
  };

  const uploadPhotoToServer = async (photo) => {
    const storage = getStorage();
    const id = uuid.v4();
    console.log(id);
    const storageRef = ref(storage, `images/${id}`);
    const resp = await fetch(photo);
    const file = await resp.blob();
    await uploadBytes(storageRef, file);
    const link = await getDownloadURL(ref(storage, `images/${id}`));
    return link;
  };

  const clearPost = () => {
    setLocation("");
    setTitle("");
    setInputLocation("");
    setPostPhoto(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/640px-HD_transparent_picture.png"
    );
    setButtonBgColorBgColor("#F8F8F8");
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  const loaderInput = isLoading && inputLocation.length === 0;
  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.topBox}>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <View
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.bottomBox}
        >
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
            {hasCameraPermission === null ||
              (hasCameraPermission === false && (
                <Text>No access to camera</Text>
              ))}
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Title..."
              style={styles.inputTitle}
              value={title}
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
                value={inputLocation}
                onChangeText={(text) => setInputLocation(text)}
              />
              {loaderInput && (
                <ActivityIndicator
                  style={styles.loactionLoader}
                  size="small"
                  color="#FF6C00"
                />
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btn, { backgroundColor: buttonBgColor }]}
              onPress={sendPhoto}
            >
              <Text style={styles.btnTitle}>
                {isLoading &&
                postPhoto.length !== 0 &&
                title.length !== 0 &&
                inputLocation.length !== 0 ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  "Publish"
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteBtn}
            onPress={clearPost}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignSelf: "center",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  imageLoader: {
    width: 344,
    height: 300,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
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
  loactionLoader: {
    position: "absolute",
    bottom: "20%",
    right: 0,
  },
});

export default CreatPostScreen;
