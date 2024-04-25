import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

function FilterCategory({
  categories,
  filterCategory,
  setFilterCategory,
  setSearch,
  setFilterDate,
  setFilterStatus,
}) {
  const handleFilterCategory = (value) => {
    setFilterCategory(value);
    setSearch("");
    setFilterDate("");
    setFilterStatus("");
  };

  return (
    <View style={styles.subContentFilter}>
      <Picker
        style={styles.selectCategory}
        placeholder="Category"
        dropdownIconColor="#000000"
        itemStyle={{ color: "#000000", fontSize: 11 }}
        selectedValue={filterCategory}
        onValueChange={handleFilterCategory}
      >
        <Picker.Item
          label="Category"
          value=""
          color="#000000"
          style={{ fontSize: 12 }}
        />
        {categories?.map((category, i) => {
          return (
            <Picker.Item
              key={i}
              label={category?.categoryName}
              value={category?._id}
              color="#000000"
              style={{ fontSize: 12 }}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  subContentFilter: {
    width: "32%",
    height: 50,
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    color: "#999999",
    backgroundColor: "#DCDCDC",
  },
  selectCategory: {
    height: "100%",
    color: "#808080",
  },
});

export default FilterCategory;
