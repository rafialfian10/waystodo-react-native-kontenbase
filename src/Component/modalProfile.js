import validator from "validator";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";

import BtnDeletePhoto from "./btnDeletePhoto";
import { API } from "../Config/api";

function ModalProfile({
  state,
  photo,
  user,
  setPhoto,
  form,
  setForm,
  error,
  setError,
  modalProfile,
  setModalProfile,
  refetchUser,
}) {
  const handleChange = (data, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [data]: value,
    }));

    if (data === "firstName") {
      if (value.trim() === "") {
        setError((prevError) => ({
          ...prevError,
          firstName: "First name is required",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          firstName: "",
        }));
      }
    }

    if (data === "lastName") {
      if (value.trim() === "") {
        setError((prevError) => ({
          ...prevError,
          lastName: "Last name is required",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          lastName: "",
        }));
      }
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

    if (data === "phoneNumber") {
      if (value.trim() === "") {
        setError((prevError) => ({
          ...prevError,
          phoneNumber: "Phone is required",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          phoneNumber: "",
        }));
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };

      const messageError = {
        firstName: form.firstName === "" ? "First name is required" : "",
        lastName: form.lastName === "" ? "Last name is required" : "",
        email: form.email === "" ? "Email is required" : "",
        phoneNumber: form.phoneNumber === "" ? "Phone is required" : "",
      };

      if (
        !messageError.firstName &&
        !messageError.lastName &&
        !messageError.email &&
        !messageError.phoneNumber
      ) {
        const body = JSON.stringify(form);

        const response = await API.patch(
          `/Users/${user?._id}`,
          body,
          config
        );
        if (response?.status === 200) {
          Alert.alert("", "Profile has been updated");
          refetchUser();
          setModalProfile(false);
        }
      } else {
        setError(messageError);
      }
    } catch (error) {
      console.log("profile failed to update", error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProfile}
        onRequestClose={() => {
          setModalProfile(!modalProfile);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalProfile(false)}
        >
          <View style={styles.modalViewProfile}>
            <View style={styles.contentInputProfile}>
              <TextInput
                style={styles.textInputProfile}
                placeholder="First name..."
                onChangeText={(value) => handleChange("firstName", value)}
                value={form.firstName}
              />
              {error.firstName && (
                <Text style={styles.errorProfile}>{error.firstName}</Text>
              )}
            </View>
            <View style={styles.contentInputProfile}>
              <TextInput
                style={styles.textInputProfile}
                placeholder="Last name..."
                onChangeText={(value) => handleChange("lastName", value)}
                value={form.lastName}
              />
              {error.lastName && (
                <Text style={styles.errorProfile}>{error.lastName}</Text>
              )}
            </View>
            <View style={styles.contentInputProfile}>
              <TextInput
                style={styles.textInputProfile}
                placeholder="Email..."
                onChangeText={(value) => handleChange("email", value)}
                value={form.email}
              />
              {error.email && (
                <Text style={styles.errorProfile}>{error.email}</Text>
              )}
            </View>
            <View style={styles.contentInputProfile}>
              <TextInput
                style={styles.textInputProfile}
                keyboardType="numeric"
                placeholder="Phone..."
                maxLength={14}
                onChangeText={(value) => handleChange("phoneNumber", value)}
                value={form.phoneNumber}
              />
              {error.phoneNumber && (
                <Text style={styles.errorProfile}>{error.phoneNumber}</Text>
              )}
            </View>
            <View style={styles.contentInputFileProfile}>
              {photo !== "" ? (
                <View>
                  <BtnDeletePhoto setPhoto={setPhoto} setModalProfile={setModalProfile} />
                  <Image
                    source={{ uri: photo }}
                    style={styles.selectedPhoto}
                    alt="upload-photo"
                  />
                </View>
              ) : (
                <View></View>
              )}
              {error.photo && (
                <Text style={styles.errorProfile}>{error.photo}</Text>
              )}
            </View>
            <View style={styles.containerBtnUpdateClose}>
              <TouchableOpacity
                style={styles.btnUpdate}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.textBtnUpdateClose}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalProfile(false)}
              >
                <Text style={styles.textBtnUpdateClose}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalViewProfile: {
    width: "100%",
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentInputProfile: {
    width: "100%",
  },
  textInputProfile: {
    width: "100%",
    borderWidth: 2,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "#A9A9A9",
  },
  errorProfile: {
    width: "100%",
    height: 20,
    alignSelf: "center",
    fontSize: 11,
    color: "red",
  },
  contentInputFileProfile: {
    width: "100%",
    marginTop: 20,
  },
  selectedPhoto: {
    width: "95%",
    height: 200,
    alignSelf: "center",
  },
  containerBtnUpdateClose: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnUpdate: {
    width: 80,
    marginHorizontal: 5,
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#47A9DA",
  },
  btnCancel: {
    width: 80,
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#F94449",
  },
  textBtnUpdateClose: {
    color: "white",
    fontWeight: "800",
  },
});

export default ModalProfile;
