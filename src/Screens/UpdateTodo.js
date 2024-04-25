import { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";

import FormTodo from "../Component/formTodo";
import { GetUser } from "../Component/Common/Hooks/getUser";
import { GetTodos } from "../Component/Common/Hooks/getTodos";
import { GetCategories } from "../Component/Common/Hooks/getCategories";
import { UserContext } from "../Context/UserContext";

const UpdateTodo = ({ navigation, route }) => {
  const [state, dispatch] = useContext(UserContext);

  const todo = route.params.todo;

  const { refetchUser } = GetUser();
  const { refetchTodos } = GetTodos();
  const { categories, refetchCategories } = GetCategories();

  const [title, setTitle] = useState("Update Todo");
  const [form, setForm] = useState({
    userId: state?.user?._id ? [state?.user?._id] : [],
    title: todo?.title || "",
    categoryId: todo?.categoryId?.map((category) => category?._id) || [],
    description: todo?.description || "",
    bgColor: todo?.bgColor || "",
    date: todo?.date ? new Date(todo.date) : new Date() || "",
  });
  const [error, setError] = useState({
    title: "",
    categoryId: "",
    description: "",
    bgColor: "",
    date: "",
  });

  return (
    <SafeAreaView style={styles.containerAddList}>
      <ScrollView>
        <View style={styles.todoContainer}>
          <Text style={styles.titleTodo}>{title}</Text>
          <FormTodo
            navigation={navigation}
            state={state}
            form={form}
            setForm={setForm}
            error={error}
            setError={setError}
            refetchUser={refetchUser}
            refetchTodos={refetchTodos}
            categories={categories}
            refetchCategories={refetchCategories}
            title={title}
            todo={todo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerAddList: {
    flex: 1,
  },
  todoContainer: {
    width: "100%",
  },
  titleTodo: {
    width: "80%",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
  },
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
    fontSize: 14,
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

export default UpdateTodo;
