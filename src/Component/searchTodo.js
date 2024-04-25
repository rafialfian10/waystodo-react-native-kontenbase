import { StyleSheet, TextInput } from "react-native";

function SearchTodo({ search, setSearch, setFilterDate, setFilterStatus, setFilterCategory }) {
  const handleSearch = (value) => {
    setSearch(value);
    setFilterDate("");
    setFilterStatus("");
    setFilterCategory("");
  };
  
  return (
    <TextInput
      style={styles.textSearch}
      placeholder="Search List....."
      onChangeText={(value) => handleSearch(value)}
      value={search}
    />
  );
}

const styles = StyleSheet.create({
  textSearch: {
    width: "95%",
    height: 50,
    marginBottom: 10,
    alignSelf: "center",
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 11,
    backgroundColor: "#DCDCDC",
  },
});

export default SearchTodo;
