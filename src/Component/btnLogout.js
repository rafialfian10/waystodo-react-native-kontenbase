import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import { API } from "../Config/api";

function BtnLogout({ navigation, state, dispatch }) {
  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };
      const response = await API.post("/auth/logout", config);

      if (response?.status === 200) {
        await AsyncStorage.removeItem("token");
        // await AsyncStorage.removeItem("photo");
        dispatch({
          type: "LOGOUT",
          payload: {},
        });
        Alert.alert("", "Logout successfully");
        navigation.navigate("Index");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.BtnLogout}>
      <Text style={styles.textBtnLogout}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  BtnLogout: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  textBtnLogout: {
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

export default BtnLogout;
