import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";

function BtnDeletePhoto({ setPhoto, setModalProfile }) {
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
              setPhoto("")
              Alert.alert("", "Photo has been deleted");
              setModalProfile(false);
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
    <TouchableOpacity
      style={styles.deletePhoto}
      onPress={handleDeletePhoto}
    >
      <MaterialIcons name="cancel" size={26} color="red" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deletePhoto: {
    position: "absolute",
    top: -10,
    right: -5,
    zIndex: 1,
  },
});

export default BtnDeletePhoto;
