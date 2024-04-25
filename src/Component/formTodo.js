import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import PickerColor from "./pickerColor";
import { API } from "../Config/api";

function FormTodo({
  navigation,
  state,
  form,
  setForm,
  error,
  setError,
  refetchUser,
  refetchTodos,
  categories,
  refetchCategories,
  title,
  todo,
}) {
  const [colorPickerVisible, setColorPickerVisibility] = useState(false);

  const handleColorToggle = () => {
    setColorPickerVisibility(!colorPickerVisible);
  };

  const handleChange = (data, value) => {
    setForm((prevForm) => ({ ...prevForm, [data]: value }));

    if (data === "title") {
      setError((prevError) => ({
        ...prevError,
        title: value.trim() === "" ? "Title is required" : "",
      }));
    }

    if (data === "categoryId") {
      const categoryIdArray = Array.isArray(value) ? value : [value];
      setForm((prevForm) => ({ ...prevForm, categoryId: categoryIdArray }));
      setError((prevError) => ({ ...prevError, categoryId: "" }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [data]: value }));
    }

    if (data === "bgColor") {
      setError((prevError) => ({
        ...prevError,
        bgColor: value.trim() === "" ? "Color is required" : "",
      }));
    }

    if (data === "date") {
      setError((prevError) => ({
        ...prevError,
        date: !value ? "Date is required" : "",
      }));
    }

    if (data === "description") {
      setError((prevError) => ({
        ...prevError,
        description: value.trim() === "" ? "Description is required" : "",
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
        title: form.title === "" ? "Title is required" : "",
        categoryId: form.categoryId.length === 0 ? "Category is required" : "",
        bgColor: form.bgColor === "" ? "Color is required" : "",
        date: form.date === "" ? "Date is required" : "",
        description: form.description === "" ? "Description is required" : "",
      };

      if (
        !messageError.title &&
        !messageError.categoryId &&
        !messageError.bgColor &&
        !messageError.date &&
        !messageError.description
      ) {
        const categoryIdArray = Array.isArray(form.categoryId)
          ? form.categoryId
          : [form.categoryId];
        const updatedForm = { ...form, categoryId: categoryIdArray };
        const body = JSON.stringify(updatedForm);

        if (title === "Add Todo") {
          const response = await API.post("/todos", body, config);
          if (response?.status === 201) {
            Alert.alert("", "List has been added");
            refetchUser();
            refetchTodos();
            refetchCategories();
            setForm({
              userId: state?.user?._id ? [state?.user?._id] : [],
              title: "",
              categoryId: [],
              description: "",
              bgColor: "",
              date: "",
            });
            navigation.navigate("ListTodo");
          }
        } else {
          const response = await API.patch(
            `/todos/${todo?._id}`,
            body,
            config
          );
          if (response?.status === 200) {
            Alert.alert("", "List has been updated");
            refetchUser();
            refetchTodos();
            refetchCategories();
            setForm({
              userId: state?.user?._id ? [state?.user?._id] : [],
              title: "",
              categoryId: [],
              description: "",
              bgColor: "",
              date: "",
            });
            navigation.navigate("ListTodo");
          }
        }
      } else {
        setError(messageError);
      }
    } catch (error) {
      console.log("todo failed to add or update", error);
    }
  };

  const showDatepicker = (currentMode) => {
    DateTimePickerAndroid.open({
      value: form.date || new Date(),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || form.date || new Date();
        setForm({ ...form, date: currentDate });
        handleChange("date", currentDate);
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  return (
    <View>
      <View style={styles.contentInputTodo}>
        <TextInput
          style={styles.textInputTodo}
          placeholder="Title"
          onChangeText={(value) => handleChange("title", value)}
          value={form.title}
        />
      </View>
      {error.title && <Text style={styles.errorTodo}>{error.title}</Text>}
      <View style={styles.containerSelectCategory}>
        <Picker
          style={styles.selectCategory}
          placeholder="Select Category"
          selectedValue={form.categoryId[0]}
          onValueChange={(value, index) => {
            setForm((prevForm) => ({ ...prevForm, categoryId: [value] }));
            handleChange("categoryId", value);
          }}
        >
          <Picker.Item
            style={styles.option}
            label="Select Category"
            value={[]}
          />
          {categories?.map((category, i) => (
            <Picker.Item
              key={i}
              style={styles.option}
              label={category?.categoryName}
              value={category?._id}
            />
          ))}
        </Picker>
      </View>
      {error.categoryId && (
        <Text style={styles.errorTodo}>{error.categoryId}</Text>
      )}
      <View style={styles.dateInput}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showDatepicker("date")}
        />
        <Text style={styles.textDate}>
          {form.date ? form.date.toLocaleDateString() : "Date"}
        </Text>
        <Icon name="calendar" size={20} color="black" style={styles.imgDate} />
      </View>
      {error.date && <Text style={styles.errorTodo}>{error.date}</Text>}
      <View style={styles.containerDescription}>
        <TextInput
          style={styles.contentDescription}
          multiline={true}
          numberOfLines={6}
          placeholder="Description"
          onChangeText={(value) => handleChange("description", value)}
          value={form.description}
        />
      </View>
      {error.description && (
        <Text style={styles.errorTodo}>{error.description}</Text>
      )}
      <View style={styles.contentInputTodo}>
        <TextInput
          editable={false}
          style={styles.textInputTodo}
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
      {error.bgColor && <Text style={styles.errorTodo}>{error.bgColor}</Text>}
      <PickerColor
        form={form}
        handleChange={handleChange}
        colorPickerVisible={colorPickerVisible}
      />
      <TouchableOpacity style={styles.buttonTodo} onPress={handleSubmit}>
        <Text style={styles.textBtnTodo}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentInputTodo: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
  },
  textInputTodo: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#DCDCDC",
  },
  containerSelectCategory: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#DCDCDC",
  },
  selectCategory: {
    height: 50,
    color: "grey",
    overflow: "hidden",
  },
  option: {
    fontSize: 14,
    color: "#000000",
  },
  errorTodo: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
    fontSize: 11,
    color: "red",
  },
  dateInput: {
    width: "80%",
    height: 50,
    position: "relative",
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    color: "red",
    backgroundColor: "#DCDCDC",
  },
  dateButton: {
    width: "100%",
    height: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    zIndex: 10,
  },
  textDate: {
    width: "100%",
    paddingHorizontal: 15,
    color: "grey",
  },
  imgDate: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
  },
  containerDescription: {
    width: "80%",
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#DCDCDC",
  },
  contentDescription: {
    width: "100%",
    textAlignVertical: "top",
    padding: 15,
    borderRadius: 10,
    fontSize: 15,
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
  containerColor: {
    width: "80%",
    height: 400,
    alignSelf: "center",
    borderRadius: 10,
  },
  colorPicker: {
    width: "100%",
    height: "100%",
  },
  textColorPicker: {
    width: "100%",
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "grey",
  },
  buttonTodo: {
    width: "80%",
    height: 50,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FF5555",
  },
  textBtnTodo: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "800",
    color: "white",
  },
});

export default FormTodo;
