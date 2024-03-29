import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { themeColor, login } from "../../assets/theme/themeSettings";
const { height, width } = Dimensions.get("window");
import Constants from "expo-constants";

export default class Type extends Component {
  state = {
    language: "Arabic"
  };

  componentWillMount=()=>{
        this.setState({language:this.props.navigation.state.params})
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.upperPart}>
          <Image
            style={styles.icon}
            source={require("../../assets/images/capture.png")}
          />
          <Text style={styles.typeText}>
            {this.state.language == "Arabic"
              ? "فرد / شركة"
              : "An Individual / Company"}
          </Text>
          <Text style={styles.smallText}>
            {this.state.language == "Arabic"
              ? "يرجى اختيار نوع الحساب الخاص بك"
              : "Please select your user type"}
          </Text>
        </View>
        <View style={styles.twoTypes}>
          <TouchableOpacity
            style={styles.image1Container}
            onPress={() =>
              this.props.navigation.navigate("SignUp", { type: "individual",language:this.state.language  })
            }
          >
            <Image
              style={styles.twoIcons}
              source={require("../../assets/images/user.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.image1Container}
            onPress={() =>
              this.props.navigation.navigate("SignUp", { type: "company",language:this.state.language })
            }
          >
            <Image
              style={styles.twoIcons}
              source={require("../../assets/images/co.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColor,
    paddingTop: Constants.statusBarHeight
  },
  upperPart: {
    marginTop: StatusBar.currentHeight,
    height: height / 3.8,
    alignItems: "center",
    justifyContent: "space-around"
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  typeText: {
    color: login.textColor,
    fontWeight: "bold",
    fontSize: 20
  },
  smallText: {
    color: login.textColor
  },
  image1Container: {
    width: "45%",
    height: "45%",
    flex: 1
  },
  twoTypes: {
    alignItems: "center",
    height: height / 2,
    justifyContent: "space-around",
    marginTop: "5%"
  },
  twoIcons: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
