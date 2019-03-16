import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import apiKey from "./api";
import MapStyle from "./mapstyle";
import PolyLine from "@mapbox/polyline";
import _ from "lodash";

export default class App extends Component {
  // set state and constructor
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      locationPredictions: [],
      pointCoords: []
    };
    //using lodash to delay the invoking of the api call, so it wont constly call google api every key press
    this.onChangeDestinationDebounce = _.debounce(
      this.onChangeDestination,
      1000
    );
  }
  // grabs the current location base on gps
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        this.getRouteDirection();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  // calls google api for direction/routes, right now the destination is a fix location for testing, future is to replace destination with "park spots"
  async getRouteDirection() {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
        this.state.latitude
      },${this.state.longitude}&destination=37.78825, -122.438&key=${apiKey}`
    );
    try {
      const json = await response.json();
      // the Api will plot a bunch of points base on your gsp location and your destination input, need to use decode method to convert it into long/lat
      // then the map over the array and set the state to it.
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({ pointCoords });
      // console.log(pointCoords);
      // console.log(json);
    } catch (err) {
      console.error(err);
    }
  }
  //calls google api for destination, right now it will query the google api for your input e.g McDonalds and it willr return all mcdonalds within 2000 meters of your current gps location
  // This can be to later use to grab user input and fetch database in future, the google api just for testing
  async onChangeDestination(destination) {
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
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor="red"
          />
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.438
            }}
            onDragEnd={e => this.setState({ x: e.nativeEvent.coordinate })}
          />
        </MapView>

        <TextInput
          placeholder="Enter destination ..."
          style={styles.destinationInput}
          value={this.state.destination}
          onChangeText={destination => {
            // return (
            this.setState({ destination });
            this.onChangeDestinationDebounce(destination);
            // );
          }}
        />
        {locationPredictions}
        {/* <Button title="Testing" onPress={this.routeLocation(this.state.x)} /> */}
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
  routeButton: {
    backgroundColor: "white"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
