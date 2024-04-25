import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { UserContext } from "../Context/UserContext";
import { API, setAuthToken } from "../Config/api";

function FormLogin({ navigation, form, setForm, error, setError }) {
  const [state, dispatch] = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (data, value) => {
    setForm({
      ...form,
      [data]: value,
    });

    if (data === "email") {
      setError((prevError) => ({
        ...prevError,
        email: value.trim() === "" ? "Email is required" : "",
      }));
    }

    if (data === "password") {
      setError((prevError) => ({
        ...prevError,
        password: value.trim() === "" ? "Password is required" : "",
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const messageError = {
        email: form.email === "" ? "Email is required" : "",
        password: form.password === "" ? "Password is required" : "",
      };

      if (!messageError.email && !messageError.password) {
        const body = JSON.stringify(form);

        try {
          const response = await API.post("/auth/login", body, config);
          if (response.status === 200) {
            if (response.data.token) {
              await AsyncStorage.setItem("token", response.data.token);
              setAuthToken(response.data.token);
            }
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: response.data,
            });
            Alert.alert("", "Login successfully");
          }
        } catch (error) {
          Alert.alert("", "Login failed, wrong email or password");
        }
      } else {
        setError(messageError);
      }
    } catch (error) {
      console.log("login failed", error);
    }
  };

  return (
    <View>
      <View style={styles.contentTextInputLogin}>
        <TextInput
          style={styles.textInputLogin}
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
          value={form.email}
        />
        {error.email && <Text style={styles.errorLogin}>{error.email}</Text>}
      </View>
      <View style={styles.contentTextInputLogin}>
        <TextInput
          style={styles.textInputLogin}
          secureTextEntry={!showPassword}
          placeholder="Password"
          onChangeText={(value) => handleChange("password", value)}
          value={form.password}
        />
        <TouchableOpacity
          style={styles.togglePasswordButton}
          onPress={handleTogglePassword}
        >
          <Ionicons
            name={showPassword ? "md-eye" : "md-eye-off"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        {error.password && (
          <Text style={styles.errorLogin}>{error.password}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.textBtnLogin} onPress={handleSubmit}>
          Login
        </Text>
      </TouchableOpacity>
      <Text style={styles.textLogin}>
        New Users?
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.linkLogin}
        >
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTextInputLogin: {
    width: " 80%",
    marginBottom: 15,
    alignSelf: "center",
  },
  textInputLogin: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#DCDCDC",
  },
  togglePasswordButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  errorLogin: {
    width: "100%",
    marginBottom: 15,
    alignSelf: "center",
    fontSize: 11,
    color: "red",
  },
  buttonLogin: {
    width: "80%",
    height: 50,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#FF5555",
  },
  textBtnLogin: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
    color: "white",
  },
  textLogin: {
    textAlign: "center",
  },
  linkLogin: {
    color: "#FF5555",
    fontWeight: "800",
  },
});

export default FormLogin;
