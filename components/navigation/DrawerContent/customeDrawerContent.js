import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { themeColor, login } from "../../../assets/theme/themeSettings";
import { DrawerActions } from "react-navigation-drawer";

const { width, height } = Dimensions.get("window");

const signOut = action => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      action;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default class DrawerContent extends Component {
  state = {
    name: "",
    points: 0,
    language: "Arabic"
  };

        //Get user language
        getLanguage = () =>{
          const uid = firebase.auth().currentUser.uid;
          firebase.database().ref("users/"+uid).on("value",
          snap=>{
            var language = snap.val().language;
            this.setState({language});
        })
      }

  componentWillMount = () => {
    this.getLanguage();
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", snap => {
        if (snap.val().points == null || snap.val().points == undefined) {
          this.setState({ name: snap.val().name });
        } else {
          this.setState({ name: snap.val().name, points: snap.val().points });
        }
      });
  };

  //updateUserLanguage
  updateUserLanguage=(lang)=>{
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users/"+uid).update({
      language:lang
    })
  }

  selectEnglish = () => {
    this.updateUserLanguage("English");
    this.setState({ language: "English" });
  };

  selectArabic = () => {
    this.updateUserLanguage("Arabic");
    this.setState({ language: "Arabic" });
  };

  render() {
    return (
      <View style={styles.drawerContainer}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.closeDrawer())
          }
        >
          <AntDesign name="closecircleo" size={30} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.welcome}>
          <Text style={{ color: "#FFFFFF", fontSize: 30 }}>
            {this.state.language == "Arabic" ? "مرحبا" : "Welcome"}
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20
            }}
          >
            {this.state.name !== "" ? this.state.name : "User"}
          </Text>
        </View>
        <View style={styles.skip}>
          <TouchableOpacity
            style={{
              hitSlop: { top: 12, left: 12, bottom: 12, right: 12 }
            }}
            onPress={this.selectEnglish}
          >
            <Text
              style={[
                styles.skipText,
                {
                  fontWeight: this.state.language == "English" ? "900" : "500"
                }
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              hitSlop: { top: 12, left: 12, bottom: 12, right: 12 }
            }}
            onPress={this.selectArabic}
          >
            <Text
              style={[
                styles.skipText,
                {
                  fontWeight: this.state.language == "Arabic" ? "900" : "500"
                }
              ]}
            >
              عربى
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.icon}
            source={require("../../../assets/images/capture.png")}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View syle={{ flex: 1, paddingTop: 40 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Rewards");
              }}
              style={{ flexDirection: "row", padding: 20 }}
            >
              <FontAwesome name="gift" size={32} color="#fff" />
              <Text style={styles.txt}>
                {this.state.language == "Arabic" ? "المكافآت" : "Rewards"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signOut(this.props.navigation.navigate("Login"));
              }}
              style={{ flexDirection: "row", padding: 20 }}
            >
              <FontAwesome name="power-off" size={32} color="#fff" />
              <Text style={styles.txt}>
                {this.state.language == "Arabic" ? "تسجيل الخروج" : "Logout"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: "5%", flexDirection: "column-reverse" }}>
            <Text style={{ color: "#ffffff" }}>
              {this.state.language == "Arabic"
                ? "لديك حاليا: "
                : "You currently have: "}
              {this.state.points}
              {this.state.language == "Arabic" ? " نقاط" : " points"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 30,
    flex: 2,
    backgroundColor: themeColor
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsContainer: {
    flex: 2,
    alignItems: "center",
    paddingTop: "5%"
  },
  txt: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10
  },
  welcome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    alignItems: "center",
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  skip: {
    width: width * 0.3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    alignSelf: "center"
  },
  skipText: {
    color: login.textColor,
    fontSize: 12
  }
});
