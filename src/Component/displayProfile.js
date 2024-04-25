import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import BtnUpdateProfile from "./btnUpdateProfile";
import BtnLogout from "./btnLogout";

function DisplayProfile({ navigation, state, user, todos, photo, dispatch }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseDropdown}>
      <View style={styles.contentProfile1}>
        <View style={styles.contentProfile2}>
          <Text style={styles.textUserName}>Hi {user?.firstName}</Text>
          <Text style={styles.lists}>{todos?.length} Lists</Text>
        </View>
        <TouchableOpacity
          style={styles.contentBtnProfile}
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          {photo !== "" ? (
            <Image source={{ uri: photo }} style={styles.photo} alt="photo" />
          ) : (
            <Image
              source={require("../../assets/photo.png")}
              style={styles.photo}
              alt="photo"
            />
          )}
        </TouchableOpacity>
        {dropdownOpen && (
          <View style={styles.dropdown}>
            <BtnUpdateProfile
              navigation={navigation}
              handleCloseDropdown={handleCloseDropdown}
            />
            <BtnLogout
              navigation={navigation}
              state={state}
              dispatch={dispatch}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contentProfile1: {
    width: "90%",
    height: 80,
    marginVertical: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 2,
  },
  contentProfile2: {
    height: 80,
    display: "flex",
    justifyContent: "center",
  },
  contentBtnProfile: {
    top: 5,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  textUserName: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
    fontSize: 25,
    fontWeight: "800",
    color: "#565656",
  },
  lists: {
    color: "#8a8989",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: "grey",
    borderWidth: 1,
  },
  dropdown: {
    width: 150,
    position: "absolute",
    top: 80,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default DisplayProfile;
