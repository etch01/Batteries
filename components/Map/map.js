import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import * as firebase from "firebase";
import Head from "../Header/header";

export default class Permission extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    userCoords: [
      {
        accuracy: 8.899999618530273,
        altitude: 172.1,
        heading: 0,
        latitude: 29.969851,
        longitude: 31.274881,
        speed: 0
      },
      {
        accuracy: 8.899999618530273,
        altitude: 172.1,
        heading: 0,
        latitude: 29.968773,
        longitude: 31.275783,
        speed: 0
      },
      {
        accuracy: 8.899999618530273,
        altitude: 172.1,
        heading: 0,
        latitude: 29.968271,
        longitude: 31.275183,
        speed: 0
      }
    ],
    order: [],
    language: "Arabic"
  };

  getUserNameFromUID = async uid => {
    const user = firebase.database().ref("users/" + uid);
    const data = await user.on("value", snap => {
      return snap.val().name;
    });
    console.log(data);
  };

  getAllLocations = async () => {
    const dataArray = [];
    var data = await firebase.database().ref("orders/");
    data.on("value", snap => {
      snap.forEach(item => {
        dataArray.push({
          location: item.val().location,
          phone: item.val().phone,
          user: item.val().user
        });
        this.setState({ order: dataArray });
      });
    });
  };

  componentWillMount() {
    this.getAllLocations();
    if (Platform.OS === "android" && !Constants.isDevice) {
      this._getLocationAsync();
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location });
  };

  render() {
    const { order } = this.state;
    let text = this.state.language == "Arabic" ? "انتظار.." : "Waiting..";

    let fitching;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
      return <Text>Error: Location services are disabled</Text>;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      fitching = JSON.parse(text);
    }
    let markers = [...this.state.userCoords];
    const allMarkers = order.map((item, index) => {
      console.log(item);
      return (
        <MapView.Marker
          onPress={() => this.getUserNameFromUID(item.user)}
          description={item.phone}
          title="Hassan" //{this.getUserNameFromUID(item.user)}
          key={index}
          pinColor="#8B0000"
          coordinate={item.location}
        />
      );
    });
    const map = () => {
      if (text !== "Waiting.." || "انتظار..") {
        return (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034
            }}
          >
            <MapView.Marker
              title={this.state.language == "Arabic" ? "أنت" : "You"}
              description={
                this.state.language == "Arabic" ? "موقعك !" : "Your location !"
              }
              image={require("../../assets/images/user.png")}
              coordinate={this.state.location.coords}
            />
            <MapView.Circle
              strokeWidth={1}
              strokeColor="#858585"
              center={this.state.location.coords}
              radius={50}
              fillColor="rgba(255, 0, 0, 0.3);"
            />
            {allMarkers}
          </MapView>
        );
      }
      return (
        <Text style={styles.loadingText}>
          {this.state.language == "Arabic" ? "جار التحميل..." : "Loading..."}
        </Text>
      );
    };

    return (
      <View style={styles.container}>
        <Head title={this.state.language == "Arabic" ? "الخريطة" : "Map"} />
        {map()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingText: {
    marginTop: "70%",
    marginLeft: "40%",
    fontSize: 20
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
