import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";

import FormLogin from "../Component/formLogin";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={styles.containerLogin}>
      <ScrollView>
        <View style={styles.contentLogin}>
          <Image
            source={require("../../assets/login.png")}
            style={styles.imageLogin}
            alt="login"
          />
          <Text style={styles.titleLogin}>Login</Text>
          <FormLogin navigation={navigation} form={form} setForm={setForm} error={error} setError={setError} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
  },
  contentLogin: {
    width: "100%",
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: "whitesmoke",
  },
  imageLogin: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  titleLogin: {
    width: "80%",
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
  },
});

export default Login;
