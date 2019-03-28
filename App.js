import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Driver from "./screens/Driver";
import Passenger from "./screens/Passenger";
import GenericContainer from "./components/GenericContainer";
import Login from "./screens/Login";
import DriverOrPassenger from "./screens/DriverOrPasenger";

const DriverWithGenericContainer = GenericContainer(Driver);
const PassengerWithGenericContainer = GenericContainer(Passenger);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false,
      token: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    // if user is not authenticate renders the login screen
    if (this.state.token === "") {
      return <Login handleChange={this.handleChange} />;
    }

    if (this.state.isDriver) {
      return <DriverWithGenericContainer token={this.state.token} />;
    }

    if (this.state.isPassenger) {
      return <PassengerWithGenericContainer token={this.state.token} />;
    }

    return <DriverOrPassenger handleChange={this.handleChange} />;
  }
}
