import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { Alert, StyleSheet } from "react-native";

import { API } from "../Config/api";

function CheckTodo({
  state,
  todo,
  refetchUser,
  refetchTodos,
  refetchCategories,
}) {
  const [checked, setChecked] = useState(false);

  const handleChecked = async (id, todo) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };

      const updatedChecklist = !todo?.isDone;

      const body = {
        isDone: updatedChecklist,
      };

      const response = await API.patch(`/todos/${id}`, body, config);
      if (response.status === 200) {
        Alert.alert(
          "",
          updatedChecklist ? "Todo has been checked" : "Todo has been unchecked"
        );
        setChecked(updatedChecklist);
        refetchUser();
        refetchTodos();
        refetchCategories();
      }
    } catch (error) {
      console.log("todo failed to checked", error);
    }
  };

  return (
    <Checkbox
      style={styles.checkbox}
      aria-label="Label Checkbox"
      color={todo?.isDone ? '#25D93A' : "#000000"}
      value={todo?.isDone}
      onValueChange={() => handleChecked(todo?._id, todo)}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 35,
    height: 35,
    borderRadius: 50, 
    borderWidth: 2,
  }
})

export default CheckTodo;
