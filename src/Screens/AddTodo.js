import { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";

import FormTodo from "../Component/formTodo";
import { GetUser } from "../Component/Common/Hooks/getUser";
import { GetTodos } from "../Component/Common/Hooks/getTodos";
import { GetCategories } from "../Component/Common/Hooks/getCategories";
import { UserContext } from "../Context/UserContext";

const AddTodo = ({ navigation }) => {
  const [state, dispatch] = useContext(UserContext);

  const { refetchUser } = GetUser();
  const { refetchTodos } = GetTodos();
  const { categories, refetchCategories } = GetCategories();

  const [title, setTitle] = useState("Add Todo");
  const [form, setForm] = useState({
    userId: state?.user?._id ? [state?.user?._id] : [],
    title: "",
    categoryId: [],
    description: "",
    bgColor: "",
    date: "",
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
});

export default AddTodo;
