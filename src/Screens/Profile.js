import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import DisplayUpdateProfile from "../Component/displayUpdateProfile";
import DisplayInfoProfile from "../Component/displayInfoProfile";
import ModalProfile from "../Component/modalProfile";
import ModalPhotoProfile from "../Component/modalPhotoProfile";
import { GetUser } from "../Component/Common/Hooks/getUser";
import { UserContext } from "../Context/UserContext";
import { UserPhotoContext } from "../Context/userPhotoContext";

const Profile = () => {
  const [state, dispatch] = useContext(UserContext);
  const { photo, setPhoto } = useContext(UserPhotoContext);

  const { user, isLoadingUser, refetchUser } = GetUser();

  const [modalProfile, setModalProfile] = useState(false);
  const [modalPhotoProfile, setModalPhotoProfile] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleUpdatePhotoProfile = async (result) => {
    try {
      const photo = await AsyncStorage.setItem("photo", result.uri);
      setPhoto(photo);
      Alert.alert("", "Profile photo has been updated");
      setModalProfile(false);
      setModalPhotoProfile(false);
    } catch (error) {
      console.log("photo failed to upload", error);
    }
  };

  useEffect(() => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  }, [user]);

  return (
    <SafeAreaView style={styles.containerDetailUser}>
      {isLoadingUser ? (
        <ActivityIndicator style={styles.loadingProfile} />
      ) : (
        <View style={styles.containerProfile}>
          <View style={styles.contentProfile}>
            <TouchableOpacity
              style={styles.hamburger}
              onPress={() => setModalProfile(true)}
            >
              <MaterialCommunityIcons name="menu" size={26} color="#808080" />
            </TouchableOpacity>
            <DisplayUpdateProfile user={user} photo={photo} setModalPhotoProfile={setModalPhotoProfile} />
            <DisplayInfoProfile user={user} />
            <ModalProfile
              state={state}
              photo={photo}
              user={user}
              setPhoto={setPhoto}
              form={form}
              setForm={setForm}
              error={error}
              setError={setError}
              modalProfile={modalProfile}
              setModalProfile={setModalProfile}
              refetchUser={refetchUser}
            />
            <ModalPhotoProfile
              setPhoto={setPhoto}
              modalPhotoProfile={modalPhotoProfile}
              setModalPhotoProfile={setModalPhotoProfile}
              handleUpdatePhotoProfile={handleUpdatePhotoProfile}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerDetailUser: {
    flex: 1,
  },
  loadingProfile: {
    flex: 1,
  },
  containerProfile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentProfile: {
    width: "100%",
    flex: 1,
  },
  hamburger: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default Profile;
