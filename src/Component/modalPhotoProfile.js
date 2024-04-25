import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

function ModalPhotoProfile({
  modalPhotoProfile,
  setModalPhotoProfile,
  handleUpdatePhotoProfile,
  setPhoto,
}) {
  const handleOpenGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      // solve: Key "cancelled" in the image picker result is deprecated, use "canceled" instead,
      delete result.cancelled;

      if (!result.canceled) {
        await handleUpdatePhotoProfile(result.assets[0]);
      }
    } catch (error) {
      console.log("photo failed to select", error);
    }
  };

  const handleOpenCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      // solve: Key "cancelled" in the image picker result is deprecated, use "canceled" instead,
      delete result.cancelled;

      if (!result.canceled) {
        await handleUpdatePhotoProfile(result.assets[0]);
      }
    } catch (error) {
      console.log("camera error bro", error);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      Alert.alert(
        "Delete Photo",
        "Are you sure?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem("photo");
              setPhoto("");
              Alert.alert("", "Photo has been deleted");
              setModalPhotoProfile(false);
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.log("photo failed to delete", error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPhotoProfile}
        onRequestClose={() => {
          setModalPhotoProfile(!modalPhotoProfile);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalPhotoProfile(false)}
        >
          <View style={styles.modalViewPhotoProfile}>
            <TouchableOpacity
              style={styles.btnModalPhotoProfile}
              onPress={handleOpenCamera}
            >
              <FontAwesome name="camera" size={25} color="grey" />
              <Text style={styles.textModalPhotoProfile}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModalPhotoProfile}
              onPress={handleOpenGallery}
            >
              <FontAwesome name="image" size={25} color="grey" />
              <Text style={styles.textModalPhotoProfile}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModalPhotoProfile}
              onPress={handleDeletePhoto}
            >
              <FontAwesome name="trash" size={25} color="red" />
              <Text style={styles.textModalPhotoProfile}>Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalViewPhotoProfile: {
    width: "100%",
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModalPhotoProfile: {
    alignItems: "center",
  },
  textModalPhotoProfile: {
    marginTop: 10,
    fontWeight: "500",
    color: "grey",
  },
});

export default ModalPhotoProfile;
