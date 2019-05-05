import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {themeColor} from '../../../assets/theme/themeSettings';
// import { runInContext } from "vm";

const { width, height } = Dimensions.get("window");

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/capture.png")}
          />
          <Text style={styles.topText}> Create an Account </Text>
          <Text style={styles.topSecText}>
            You Can Create New Account Here
          </Text>
        </View>
        <View style={styles.middle}>
          <TextInput
            direction="rtl"
            style={styles.inputContainer}
            placeholder="Full Name"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Email"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Password"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Mobile"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Gender"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Address"
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Type")}
           style={styles.myButton}>
            <Text style={styles.bottomText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor
  },
  top: {
    paddingTop: 32,
    width: width,
    height: height * 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  topText: {
    fontSize: 18,
    color: "#fff"
  },
  topSecText: {
    fontSize: 10,
    color: "#fff"
  },
  logo: {

    alignItems: "center"
  },
  middle: {
    width: width,
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "space-around"
  },
  inputContainer: {
    width: width * 0.8,
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },
  bottom: {
    width: width,
    height: height * 0.1,
    alignItems: "center"
  },
  myButton: {
    width: width * 0.8,
    height: height * 0.08,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6
  },
  bottomText: {
    color: "#5aaa5a"
  }
});
