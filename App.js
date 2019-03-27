import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import Driver from "./screens/Driver";
import Passenger from "./screens/Passenger";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false
    };
  }

  render() {
    //set the state to passer or driver and render that component
    if (this.state.isDriver) {
      return <Driver />;
    }
    if (this.state.isPassenger) {
      return <Passenger />;
    }
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.setState({ isPassenger: true })}
          title="Passenger"
        />
        <Button
          onPress={() => this.setState({ isDriver: true })}
          title="Driver"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  }
});
