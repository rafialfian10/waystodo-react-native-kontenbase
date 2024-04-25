import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

import CheckTodo from "./checkTodo";
import { API } from "../Config/api";

function TodoMap({
  navigation,
  state,
  todo,
  refetchUser,
  refetchTodos,
  refetchCategories,
}) {
  const titleLength = todo?.title
    ? todo.title.length > 20
      ? todo.title.slice(0, 20) + "..."
      : todo.title
    : "";
  const descriptionLength = todo?.description
    ? todo.description.length > 35
      ? todo.description.slice(0, 35) + "..."
      : todo.description
    : "";

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };

      const response = await API.delete(`/todos/${id}`, config);
      if (response?.status === 200) {
        Alert.alert("", "Todo has been deleted");
        refetchUser();
        refetchTodos();
        refetchCategories();
      }
    } catch (error) {
      console.log("todo failed to delete ", error);
    }
  };

  return (
    <View style={styles.containerTodos}>
      <Text
        style={{
          ...styles.textHold,
          backgroundColor: todo?.bgColor,
        }}
      >
        Hold
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.push("DetailTodo", {
            id: todo?._id,
            todo: todo,
          })
        }
        onLongPress={() => {
          Alert.alert("Delete or Update Todo", `Are you sure?`, [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => handleDelete(todo?._id),
            },
            {
              text: "Update",
              onPress: () => navigation.push("UpdateTodo", { todo: todo }),
            },
          ]);
        }}
      >
        <View
          style={{
            ...styles.subContainerTodos,
            backgroundColor: todo?.bgColor,
          }}
        >
          <View style={styles.contentTodo}>
            <Text style={styles.todoTitle}>{titleLength}</Text>
            <Text style={styles.todoDesc}>{descriptionLength}</Text>
            <View style={styles.contentDate}>
              <Icon
                name="calendar"
                size={20}
                color="black"
                style={styles.imgDate}
              />
              <Text style={styles.todoDate}>
                {moment(todo?.date).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
          <View style={styles.containerCategories}>
            <View style={styles.contentCheckbox}>
              {todo?.categoryId.map((category, i) => (
                <View key={i} style={styles.contentCategory}>
                  <Text style={styles.categoryTitle}>
                    {category?.categoryName}
                  </Text>
                </View>
              ))}
              <View style={styles.checkbox}>
                <CheckTodo
                  state={state}
                  todo={todo}
                  refetchUser={refetchUser}
                  refetchTodos={refetchTodos}
                  refetchCategories={refetchCategories}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHold: {
    width: "auto",
    marginRight: 10,
    paddingHorizontal: 5,
    paddingTop: 3,
    alignSelf: "flex-end",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 10,
    color: "#000000",
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  containerTodos: {
    width: "95%",
    alignSelf: "center",
  },
  subContainerTodos: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  contentTodo: {
    width: "70%",
  },
  todoTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  todoDesc: {
    marginBottom: 10,
    fontSize: 12,
  },
  contentDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imgDate: {
    width: 20,
    height: 20,
  },
  todoDate: {
    marginLeft: 10,
    fontSize: 12,
  },
  containerCategories: {
    width: "30%",
  },
  contentCheckbox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  contentCategory: {
    width: "100%",
    backgroundColor: "#DCDCDC",
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryTitle: {
    height: 30,
    padding: 0,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    fontWeight: "800",
    color: "#000000",
  },
  checkbox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

export default TodoMap;
