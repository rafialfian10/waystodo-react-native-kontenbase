import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import moment from "moment";

const DetailTodo = ({ route, navigation }) => {
  const { id, todo } = route.params;

  return (
    <SafeAreaView
      style={{
        ...styles.containerDetail,
        backgroundColor: todo?.bgColor,
      }}
    >
      <ScrollView>
        <View style={styles.contentDetail}>
          <Text style={styles.titleDetailList}>{todo?.title}</Text>
          <Text style={styles.dateDetailList}>
            {moment(todo?.date).format("YYYY-MM-DD")}
          </Text>
          <Text style={styles.descDetailList}>{todo?.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerDetail: {
    flex: 1,
    padding: 20,
  },
  contentDetail: {
    flex: 1,
    width: "100%",
    height: 660,
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "whitesmoke",
  },
  titleDetailList: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  dateDetailList: {
    marginBottom: 20,
    paddingVertical: 5,
    color: "black",
  },
  descDetailList: {
    textAlign: "justify",
    fontSize: 16,
    color: "black",
  },
});

export default DetailTodo;
