import { StyleSheet, TouchableOpacity, Text } from "react-native";

function BtnUpdateProfile({ navigation, handleCloseDropdown }) {
  return (
    <TouchableOpacity
      onPress={() => {navigation.navigate("Profile"); handleCloseDropdown()}}
      style={{
        ...styles.BtnProfile,
        activeBackgroundColor: "#47A9DA",
      }}
    >
      <Text style={styles.textBtnProfile}>Profile</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  BtnProfile: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  textBtnProfile: {
    width: "100%",
    padding: 5,
    textAlign: "center",
    color: "grey",
    fontWeight: "800",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "grey",
  },
});

export default BtnUpdateProfile;
