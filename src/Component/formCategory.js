import { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import PickerColor from "./pickerColor";
import { UserContext } from "../Context/UserContext";
import { API } from "../Config/api";

function FormCategory({
  navigation,
  form,
  setForm,
  error,
  setError,
  refetchCategories,
}) {
  const [state, dispatch] = useContext(UserContext);

  const [colorPickerVisible, setColorPickerVisibility] = useState(false);

  const handleColorToggle = () => {
    setColorPickerVisibility(!colorPickerVisible);
  };

  const handleChange = (data, value) => {
    setForm((prevForm) => ({ ...prevForm, [data]: value }));

    if (data === "categoryName") {
      setError((prevError) => ({
        ...prevError,
        categoryName: value.trim() === "" ? "Category name is required" : "",
      }));
    }

    if (data === "bgColor") {
      setError((prevError) => ({
        ...prevError,
        bgColor: value === "" ? "Color is required" : "",
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };

      const messageError = {
        categoryName:
          form.categoryName === "" ? "Category name is required" : "",
        bgColor: form.bgColor === "" ? "Color is required" : "",
      };

      if (!messageError.categoryName && !messageError.bgColor) {
        const body = JSON.stringify(form);

        const response = await API.post("/categories", body, config);
        if (response.status === 201) {
          Alert.alert("", "Category has been added");
          refetchCategories();
          setForm({
            categoryName: "",
            bgColor: "",
          });
          navigation.navigate("AddCategory");
        }
      } else {
        setError(messageError);
      }
    } catch (error) {
      console.log("category failed to add", error);
    }
  };

  return (
    <View>
      <View style={styles.contentInputCategory}>
        <TextInput
          style={styles.textInputCategory}
          placeholder="Category Name"
          maxLength={15}
          onChangeText={(value) => handleChange("categoryName", value)}
          value={form.categoryName}
        />
      </View>
      {error.categoryName && (
        <Text style={styles.errorCategory}>{error.categoryName}</Text>
      )}
      <View style={styles.contentInputCategory}>
        <TextInput
          editable={false}
          style={styles.textInputCategory}
          placeholder="Color"
          value={form.bgColor}
        />
        <TouchableOpacity
          style={styles.btnChooseColor}
          onPress={handleColorToggle}
        >
          <Text style={styles.textBtnChooseColor}> Choose Color</Text>
        </TouchableOpacity>
      </View>
      {error.bgColor && (
        <Text style={styles.errorCategory}>{error.bgColor}</Text>
      )}
      <PickerColor
        form={form}
        handleChange={handleChange}
        colorPickerVisible={colorPickerVisible}
      />
      <TouchableOpacity style={styles.buttonCategory} onPress={handleSubmit}>
        <Text style={styles.textBtnCategory}>Add category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentInputCategory: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
  },
  textInputCategory: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#DCDCDC",
  },
  btnChooseColor: {
    width: "40%",
    height: 50,
    position: "absolute",
    right: 0,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "#DCDCDC",
  },
  textBtnChooseColor: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
    color: "grey",
  },
  errorCategory: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
    fontSize: 11,
    color: "red",
  },
  buttonCategory: {
    width: "80%",
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FF5555",
  },
  textBtnCategory: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
    color: "white",
  },
});

export default FormCategory;
