import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";

import FormRegister from "../Component/formRegister";

const Register = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  return (
    <SafeAreaView style={styles.containerRegister}>
      <ScrollView>
        <View style={styles.contentRegister}>
          <Image
            source={require("../../assets/login.png")}
            style={styles.imageRegister}
            alt="register"
          />
          <Text style={styles.titleRegister}>Register</Text>
          <FormRegister navigation={navigation} form={form} setForm={setForm} error={error} setError={setError} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerRegister: {
    flex: 1,
  },
  contentRegister: {
    width: "100%",
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
  },
  imageRegister: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  titleRegister: {
    width: "80%",
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
  },
});

export default Register;
