import React, { Component } from "react";
import {
  TextInput,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Keyboard
} from "react-native";
import MapView from "react-native-maps";
import apiKey from "./api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      locationPredictions: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  async onChangeDestination(destination) {
    this.setState({ destination });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}&location=${
      this.state.latitude
    },${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      // console.log(json);
      this.setState({
        locationPredictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  pressedPrediction(prediction) {
    console.log(prediction);
    Keyboard.dismiss();
    this.setState({
      locationPredictions: [],
      destination: prediction.description
    });
    Keyboard;
  }
  render() {
    const locationPredictions = this.state.locationPredictions.map(
      prediction => (
        <TouchableHighlight
          key={prediction.id}
          onPress={() => this.pressedPrediction(prediction)}
        >
          <Text style={styles.locationSuggestion}>
            {prediction.description}
          </Text>
        </TouchableHighlight>
      )
    );
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        />
        <TextInput
          placeholder="Enter destination ..."
          style={styles.destinationInput}
          value={this.state.destination}
          onChangeText={destination => this.onChangeDestination(destination)}
        />
        {locationPredictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  destinationInput: {
    borderWidth: 0.5,
    borderColor: "grey",
    height: 40,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white"
  },
  locationSuggestion: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
