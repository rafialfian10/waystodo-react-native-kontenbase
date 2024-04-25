import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

function FilterStatus({
  filterStatus,
  setFilterStatus,
  setSearch,
  setFilterDate,
  setFilterCategory,
}) {
  const handleFilterStatus = (value) => {
    setFilterStatus(value);
    setSearch("");
    setFilterDate("");
    setFilterCategory("");
  };

  return (
    <View style={styles.subContentFilter}>
      <Picker
        style={styles.selectStatus}
        placeholder="Status"
        dropdownIconColor="#000000"
        itemStyle={{ color: "#000000", fontSize: 11 }}
        selectedValue={filterStatus}
        onValueChange={handleFilterStatus}
      >
        <Picker.Item
          label="Status"
          value=""
          color="#000000"
          style={{ fontSize: 12 }}
        />
        <Picker.Item
          label="Checked"
          value="1"
          color="#000000"
          style={{ fontSize: 12 }}
        />
        <Picker.Item
          label="Unchecked"
          value="0"
          color="#000000"
          style={{ fontSize: 12 }}
        />
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
  selectStatus: {
    height: "100%",
    color: "#808080",
  },
});

export default FilterStatus;
