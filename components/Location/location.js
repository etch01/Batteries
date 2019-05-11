import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text
} from "react-native";
import Header from "../Header/header";
import { themeColor } from "../../assets/theme/themeSettings";
import { Feather } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
export default class location extends Component {
  render() {
    return (
      <View>
        <Header
          title="Location"
          backButton={() => this.props.navigation.goBack()}
        />
        <TextInput
          direction="rtl"
          style={styles.inputContainer}
          placeholder="Location"
          placeholderTextColor={themeColor}
        />
        <TextInput
          direction="rtl"
          style={styles.inputContainer}
          placeholder="Mobile No"
          placeholderTextColor={themeColor}
        />
        <View style={{ flexDirection: "row", paddingHorizontal: width * 0.1 }}>
          <TouchableOpacity style={styles.myButton}>
            <Text style={{ color: themeColor }}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.myButton, { flexDirection: "row" }]}>
            <Feather name="map-pin" color={themeColor} />
            <Text style={{ color: themeColor, paddingLeft: 4 }}>
              Get my current location
            </Text>
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
