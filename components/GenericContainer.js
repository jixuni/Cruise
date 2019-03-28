import React, { Component } from "react";
import { Keyboard, PermissionsAndroid, Platform } from "react-native";
import PolyLine from "@mapbox/polyline";
import apiKey from "../google_api_key";

function genericContainer(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null,
        pointCoords: [],
        destination: "",
        routeResponse: {}
      };
      this.getRouteDirections = this.getRouteDirections.bind(this);
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
    }

    async checkAndroidPermissions() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Taxi App",
            message:
              "Taxi App needs to use your location to show routes and get taxis"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    }

    async componentDidMount() {
      //Get current location and set initial region to this
      let granted = false;
      if (Platform.OS === "ios") {
        granted = true;
      } else {
        granted = await this.checkAndroidPermissions();
      }
      if (granted)
        this.watchId = navigator.geolocation.watchPosition(
          position => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          error => console.log(error),
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );
    }

    async getRouteDirections(destinationPlaceId, destinationName) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${
            this.state.latitude
          },${
            this.state.longitude
          }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
        );
        console.log(response);
        const json = await response.json();
        console.log(json);
        const points = PolyLine.decode(json.routes[0].overview_polyline.points);
        const pointCoords = points.map(point => {
          return { latitude: point[0], longitude: point[1] };
        });
        this.setState({
          pointCoords,
          routeResponse: json
        });
        Keyboard.dismiss();
        return destinationName;
      } catch (error) {
        console.error(error);
      }
    }

    render() {
      return (
        <WrappedComponent
          getRouteDirections={this.getRouteDirections}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          pointCoords={this.state.pointCoords}
          destination={this.state.destination}
          routeResponse={this.state.routeResponse}
        />
      );
    }
  };
}

export default genericContainer;
