import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default class DriverOrPasenger extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.handleChange("isDriver", true)}
          style={[styles.choiceContainer, { borderBottomWidth: 1 }]}
        >
          <Text style={styles.choiceText}>Driver</Text>
          <Image
            source={require("../images/driver.png")}
            style={styles.selectionImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.handleChange("isPassenger", true)}
          style={styles.choiceContainer}
        >
          <Text style={styles.choiceText}>Passenger</Text>
          <Image
            source={require("../images/passenger.png")}
            style={styles.selectionImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3743"
  },
  choiceText: {
    color: "#FFF",
    fontSize: 32,
    marginBottom: 12,
    fontWeight: "200"
  },
  choiceContainer: {
    flex: 1,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  selectionImage: {
    height: 200,
    width: 200
  }
});
