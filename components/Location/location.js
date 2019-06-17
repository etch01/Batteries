import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";
import { Constants, Location, Permissions, Notifications } from "expo";
import Header from "../Header/miniHeader";
import { themeColor } from "../../assets/theme/themeSettings";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";

const { height, width } = Dimensions.get("window");
export default class location extends Component {
  state = {
    location: [],
    phone: "",
    address: "",
    editAddressInput: true,
    addressInputPlaceholder: "Location",
    loading: false,
    locationLoading: false,
    errorMessage: "",
    language: "English"
  };

  //Getting Location of the current User.
  _getLocationAsync = async () => {
    this.setState({ locationLoading: true });
    //asking user for permission on using location service
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      if(this.state.language=="English"){
        this.setState({
          errorMessage: "Permission to access location was denied",
          locationLoading: false
        });
      }
      else{
        this.setState({
          errorMessage: "الدخول علي الموقع الحالي مطلوب",
          locationLoading: false
        });
      }
    }
    //adding high accuracy for new andriod systems
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({
      location: location.coords,
      editAddressInput: false,
      addressInputPlaceholder: this.state.language=="English"?"We got your location":"حصلنا علي موقعك الحالي",
      locationLoading: false
    });
  };

  componentWillMount=()=>{
          //Get user language
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref("users/"+uid).on("value",
        snap=>{
          var language = snap.val().language;
          if (snap.val().language == "Arabic"){
            this.setState({language,addressInputPlaceholder:"العنوان"});
          }else{
            this.setState({language,addressInputPlaceholder:"Address"});
          }
      })
  }

  confirmingTheOrder = () => {
    if (this.state.phone == "") {
      if(this.state.language=="English"){
        this.setState({ errorMessage: "Phone number is required." });
      }else{
        this.setState({ errorMessage: "رقم الهاتف الزامي." });
      }
    } else {
      this.setState({ loading: true, errorMessage: "" });
      const uid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("orders/")
        .push()
        .set({
          user: uid,
          location:
            this.state.location === undefined || this.state.location.length == 0
              ? { latitude: 0, longitude: 0 }
              : this.state.location,
          address: this.state.address,
          phone: this.state.phone,
          order: this.props.navigation.state.params
        })
        .then(() => {
          this.setState({ loading: false });
          if (this.state.language=="English"){
            Alert.alert(
              "Success",
              "Order placed successfully ! we will contact you soon."
            );
          }
          else{
            Alert.alert(
              "شكرا لك",
              "تم تنفيذ طلبك بنجاح و سنتواصل معك في اقرب وقت."
            );
          }
          this.props.navigation.navigate("Products", { cart: [] });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error);
        });
        if (this.state.language=="English"){
          Alert.alert(
            "Success",
            "Order placed successfully ! we will contact you soon."
          );
        }
        else{
          Alert.alert(
            "شكرا لك",
            "تم تنفيذ طلبك بنجاح و سنتواصل معك في اقرب وقت."
          );
        }
      this.props.navigation.navigate("Products");
    }
  };

  render() {
    return (
      <View>
        <Header
          title={this.state.language=="Arabic"?"تأكيد الطلبات":"Confirm"}
          backButton={() => this.props.navigation.goBack()}
        />
        <TextInput
          onChangeText={val => this.setState({ address: val })}
          direction="rtl"
          style={styles.inputContainer}
          placeholder={this.state.addressInputPlaceholder}
          placeholderTextColor={themeColor}
          editable={this.state.editAddressInput}
        />
        <TextInput
          onChangeText={val => this.setState({ phone: val })}
          direction="rtl"
          style={styles.inputContainer}
          placeholder={this.state.language=="Arabic"?"رقم التليفون":"Mobile No"}
          placeholderTextColor={themeColor}
        />
        <Text style={{ color: "red", alignSelf: "center", marginTop: 5 }}>
          {this.state.errorMessage}
        </Text>
        <View style={{ flexDirection: "row", paddingHorizontal: width * 0.1 }}>
          <TouchableOpacity
            style={styles.myButton}
            onPress={this.confirmingTheOrder}
          >
            {this.state.loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: themeColor }}>
                {this.state.language == "Arabic" ? "تأكيد" : "Confirm"}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.myButton, { flexDirection: "row" }]}
            onPress={this._getLocationAsync}
          >
            <Feather name="map-pin" color={themeColor} />
            {this.state.locationLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: themeColor, paddingLeft: 4 }}>
                {this.state.language == "Arabic"
                  ? "احصل على موقعي الحالي"
                  : "Get my current location"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height: height * 0.08,
    width: width * 0.8,
    color: themeColor,
    borderBottomColor: themeColor,
    borderBottomWidth: 1,
    alignSelf: "center"
  },
  myButton: {
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginTop: 16,
    borderColor: themeColor,
    borderWidth: 1,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  }
});
