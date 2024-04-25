import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";

function DisplayUpdateProfile({ user, photo, setModalPhotoProfile }) {
  return (
    <LinearGradient
      style={styles.subContentProfile}
      colors={["#47A9DA", "#67C8fA", "#C8FBFB", "#FFFFFF"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.5, 0.8, 1]}
    >
      <View style={styles.contentUserName}>
        <Text style={styles.userNameProfile}>
          {user?.firstName} {user?.lastName}
        </Text>
      </View>
      <View style={styles.contentPhotoProfile}>
        {photo !== "" ? (
          <Image
            source={{ uri: photo }}
            style={styles.photoProfile}
            alt="photo"
          />
        ) : (
          <Image
            source={require("../../assets/photo.png")}
            style={styles.photoProfile}
            alt="photo"
          />
        )}
        <TouchableHighlight
          style={styles.updatePhotoIcon}
          onPress={() => setModalPhotoProfile(true)}
        >
          <FontAwesome
            name="camera"
            size={15}
            color="white"
            style={styles.cameraIcon}
          />
        </TouchableHighlight>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  subContentProfile: {
    width: "100%",
    height: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "grey",
  },
  contentUserName: {
    width: "100%",
    marginTop: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  userNameProfile: {
    fontSize: 22,
    fontWeight: "bold",
    color: "whitesmoke",
  },
  contentPhotoProfile: {
    width: 80,
    height: 80,
    position: "relative",
    left: 20,
    alignItems: "center",
    padding: 2,
    borderRadius: 40,
    borderColor: "grey",
    borderWidth: 2,
  },
  photoProfile: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  updatePhotoIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "grey",
    borderRadius: 15,
    zIndex: 5,
    padding: 5,
  },
  cameraIcon: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default DisplayUpdateProfile;
