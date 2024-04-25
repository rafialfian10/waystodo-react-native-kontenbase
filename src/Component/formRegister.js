import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import validator from "validator";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import { API } from "../Config/api";

function FormRegister({ navigation, form, setForm, error, setError }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (data, value) => {
    setForm({
      ...form,
      [data]: value,
    });

    if (data === "firstName") {
      setError((prevError) => ({
        ...prevError,
        firstName: value.trim() === "" ? "First name is required" : "",
      }));
    }

    if (data === "lastName") {
      setError((prevError) => ({
        ...prevError,
        lastName: value.trim() === "" ? "Last name is required" : "",
      }));
    }

    if (data === "email") {
      if (value.trim() === "") {
        setError((prevError) => ({
          ...prevError,
          email: "Email is required",
        }));
      } else if (!validator.isEmail(value)) {
        setError((prevError) => ({
          ...prevError,
          email: "Please enter a valid email address",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          email: "",
        }));
      }
    }

    if (data === "password") {
      setError((prevError) => ({
        ...prevError,
        password: value.trim() === "" ? "Password is required" : "",
      }));

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

      if (value.trim() !== "" && !passwordRegex.test(value)) {
        setError((prevError) => ({
          ...prevError,
          password:
            "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const messageError = {
        firstName: form.firstName === "" ? "First name is required" : "",
        lastName: form.lastName === "" ? "Last name is required" : "",
        email: form.email === "" ? "Email is required" : "",
        password: form.password === "" ? "Password is required" : "",
      };

      if (
        !messageError.firstName &&
        !messageError.lastName &&
        !messageError.email &&
        !messageError.password
      ) {
        const body = JSON.stringify(form);

        try {
          const response = await API.post("/auth/register", body, config);
          if (response?.status === 200) {
            alert("Register successfully");
            navigation.navigate("Login");
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert(error.response.data.message);
          } else {
            throw error;
          }
        }
      } else {
        setError(messageError);
      }
    } catch (error) {
      console.log("register failed", error);
    }
  };
  return (
    <View>
      <View style={styles.contentTextInputRegister}>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
          value={form.email}
        />
        {error.email && <Text style={styles.errorRegister}>{error.email}</Text>}
      </View>
      <View style={styles.contentTextInputRegister}>
        <TextInput
          style={styles.textInputRegister}
          placeholder="First Name"
          onChangeText={(value) => handleChange("firstName", value)}
          value={form.firstName}
        />
        {error.firstName && (
          <Text style={styles.errorRegister}>{error.firstName}</Text>
        )}
      </View>
      <View style={styles.contentTextInputRegister}>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Last Name"
          onChangeText={(value) => handleChange("lastName", value)}
          value={form.lastName}
        />
        {error.lastName && (
          <Text style={styles.errorRegister}>{error.lastName}</Text>
        )}
      </View>
      <View style={styles.contentTextInputRegister}>
        <TextInput
          style={styles.textInputRegister}
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
          <Text style={styles.errorRegister}>{error.password}</Text>
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonRegister}>
        <Text style={styles.textBtnRegister}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.textRegister}>
        Joined us before?
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.linkRegister}
        >
          {" "}
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTextInputRegister: {
    width: " 80%",
    marginBottom: 15,
    alignSelf: "center",
  },
  textInputRegister: {
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
  errorRegister: {
    width: "100%",
    marginBottom: 15,
    alignSelf: "center",
    fontSize: 11,
    color: "red",
  },
  buttonRegister: {
    width: "80%",
    height: 50,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#FF5555",
  },
  textBtnRegister: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
    color: "white",
  },
  textRegister: {
    textAlign: "center",
  },
  linkRegister: {
    color: "#FF5555",
    fontWeight: "800",
  },
});

export default FormRegister;
