import React from "react";
import { StyleSheet, View, Text } from "react-native";

function DisplayInfoProfile({ user }) {
  return (
    <View style={styles.contentDataProfile}>
      <View style={styles.subContentDataProfile}>
        <Text style={styles.textKey}>First Name : </Text>
        <Text style={styles.textValue}>{user?.firstName}</Text>
      </View>
      <View style={styles.subContentDataProfile}>
        <Text style={styles.textKey}>Last Name : </Text>
        <Text style={styles.textValue}>{user?.lastName}</Text>
      </View>
      <View style={styles.subContentDataProfile}>
        <Text style={styles.textKey}>Email : </Text>
        <Text style={styles.textValue}>{user?.email}</Text>
      </View>
      <View style={styles.subContentDataProfile}>
        <Text style={styles.textKey}>Phone : </Text>
        <Text style={styles.textValue}>{user?.phoneNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentDataProfile: {
    width: "90%",
    marginTop: 70,
    alignSelf: "center",
  },
  subContentDataProfile: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    borderWidth: 2,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "#A9A9A9",
  },
  textKey: {
    fontSize: 14,
    fontWeight: "700",
  },
  textValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A9A9A9",
  },
});

export default DisplayInfoProfile;
