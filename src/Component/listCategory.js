import { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

import { UserContext } from "../Context/UserContext";
import { API } from "../Config/api";

function ListCategory({ categories, refetchCategories }) {
  const [state, dispatch] = useContext(UserContext);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
      };

      const response = await API.delete(`/categories/${id}`, config);
      if (response?.status === 200) {
        Alert.alert("", "Category has been deleted");
        refetchCategories();
      }
    } catch (error) {
      console.log("category failed to delete", error);
    }
  };

  return (
    <View style={styles.containerCategory}>
      {categories?.map((category, i) => {
        return (
          <TouchableOpacity
            key={i}
            onLongPress={() => {
              Alert.alert("Delete Category", `Are you sure?`, [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => handleDelete(category?._id),
                },
              ]);
            }}
          >
            <View
              style={{
                ...styles.contentCategory,
                backgroundColor: category?.bgColor,
              }}
            >
              <Text style={styles.listCategory}>{category?.categoryName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerCategory: {
    width: "80%",
    marginBottom: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 3,
  },
  contentCategory: {
    height: 30,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listCategory: {
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 11,
    fontWeight: "800",
    color: "whitesmoke",
  },
});

export default ListCategory;
