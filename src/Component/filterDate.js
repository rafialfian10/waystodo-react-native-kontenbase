import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function FilterDate({ filterDate, setFilterDate, setSearch, setFilterStatus, setFilterCategory }) {
  const showDatepicker = (currentMode) => {
    DateTimePickerAndroid.open({
      value: filterDate || new Date(),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setFilterDate(currentDate);
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const handleFilterDate = (value) => {
    setFilterDate(value);
    setSearch("");
    setFilterStatus("");
    setFilterCategory("");
  };

  return (
    <View style={styles.subContentFilter}>
      <TouchableOpacity
        style={styles.btnDate}
        onPress={() => {
          showDatepicker("date");
          handleFilterDate();
        }}
      >
        <View style={styles.date}>
          <Text style={styles.textDate}>
            {filterDate ? moment(filterDate).format("YYYY-MM-DD") : "Date"}
          </Text>
          <Icon
            name="calendar"
            size={20}
            color="black"
            style={styles.imgDate}
          />
        </View>
      </TouchableOpacity>
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
  btnDate: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
  },
  date: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textDate: {
    fontSize: 12,
    marginRight: 20,
    color: "#808080",
  },
});

export default FilterDate;
