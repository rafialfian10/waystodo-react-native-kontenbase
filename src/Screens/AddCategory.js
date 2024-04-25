import { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";

import FormCategory from "../Component/formCategory";
import ListCategory from "../Component/listCategory";
import { GetCategories } from "../Component/Common/Hooks/getCategories";

const AddCategory = ({ navigation }) => {
  const { categories, refetchCategories } = GetCategories();
  const [form, setForm] = useState({
    categoryName: "",
    bgColor: "",
  });
  const [error, setError] = useState({
    categoryName: "",
    bgColor: "",
  });

  return (
    <SafeAreaView style={styles.containerAddCategory}>
      <ScrollView>
        <View style={styles.categoryContainer}>
          <Text style={styles.titleCategory}>Add Category</Text>
          <FormCategory
            navigation={navigation}
            form={form}
            setForm={setForm}
            error={error}
            setError={setError}
            refetchCategories={refetchCategories}
          />
          <Text style={styles.titleCategory}>List Category</Text>
          <ListCategory
            categories={categories}
            refetchCategories={refetchCategories}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerAddCategory: {
    flex: 1,
  },
  categoryContainer: {
    width: "100%",
  },
  titleCategory: {
    width: "80%",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
  },
});

export default AddCategory;
