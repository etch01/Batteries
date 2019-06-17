import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import * as firebase from "firebase";
import { themeColor, login } from "../../assets/theme/themeSettings";
import Loading from "../Loading Page/loading";
import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");

import { Input, Button } from "react-native-elements";

export default class Login extends Component {
  state = {
    name: "",
    password: "",
    loading: false,
    errorMessage: "",
    language: "Arabic"
  };

  componentWillMount = () => {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Products");
      } else {
        this.setState({ loading: false });
        
      }
    });
  };

  //check if there is already a user
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var uid = firebase.auth().currentUser.uid;
        if (user.providerData[0].providerId == "facebook.com") {
          //firebase.database().ref('users/'+uid).on('value',(snap)=>{
          firebase
            .database()
            .ref("users/" + uid)
            .set({
              name: user.providerData[0].displayName,
              email: user.providerData[0].email,
              phone: "",
              confirmed: true,
              admin: false,
              gender: "not defined",
              type: "individual",
              dateCreated: ""
            })
            .catch(error => console.log(error));
        }
      }
    });
  };

  //sign in function
  signInHandler(email, password) {
    try {
      if (this.state.email !== "" && this.state.password !== "") {
        this.setState({ loading: true });
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(data => {
            this.setState({ loading: false });
            this.props.navigation.navigate("Products");
          })
          .catch(error => {
            var err = error.code;
            if (this.state.language=="English"){
              if (err == "auth/user-disabled") {
                this.setState({ errorMessage: "User has been banned." });
              } else if (err == "auth/invalid-email") {
                this.setState({ errorMessage: "email is not correct." });
              } else if (err == "auth/user-not-found") {
                this.setState({ errorMessage: "Email address doesn't exist." });
              } else if (err == "auth/wrong-password") {
                this.setState({ errorMessage: "Incorrect password." });
              }
            }else{
              if (err == "auth/user-disabled") {
                this.setState({ errorMessage: "تم حظر المستخدم." });
              } else if (err == "auth/invalid-email") {
                this.setState({ errorMessage: "البريد الالكتروني غير صحيح." });
              } else if (err == "auth/user-not-found") {
                this.setState({ errorMessage: "البريد الالكتروني غير موجود." });
              } else if (err == "auth/wrong-password") {
                this.setState({ errorMessage: "الرقم السري غير صحيح ." });
              }
            }
            this.setState({ loading: false });
          });
      } else {
        if (this.state.language=="English"){
          this.setState({ errorMessage: "Email or password cannot be empty." });
        }else{
          this.setState({ errorMessage: "املأ الخانات المطلوبه." });
        }
      }
    } catch (error) {
      if (error.code) {
        this.setState({ errorMessage: error.code });
      } else {
        this.setState({ errorMessage: error });
      }
    }
  }

  //Facebook Login
  loginWithFacebook = async () => {
    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "2246510685464924",
      { permissions: ["email"] }
    );
    if (type == "success") {
      this.setState({ loading: true });
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          this.setState({ loading: false });
          var user = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("users/" + user)
            .on("value", snap => {
              if (snap.val() !== null) {
                this.setState({ loading: true });
              } else {
                this.setState({ loading: true });
              }
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  };

  selectEnglish = () => {
    this.setState({ language: "English",errorMessage:"" });
  };

  selectArabic = () => {
    this.setState({ language: "Arabic",errorMessage:"" });
  };

  render() {
    var inputDirection = "left";
    if (this.state.language=="Arabic"){
      inputDirection = "right"
    };
    const { loading } = this.state;
    if (loading) {
      return <Loading loadingMessage={this.state.language=="English"?"Loading...":"جار التحميل"}/>;
    }
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.upperPart}>
          <View style={styles.loginAndSkipText}>
            <View style={{ width: width * 0.3 }} />
            <Text style={styles.loginText}>
              {this.state.language == "Arabic" ? "تسجيل الدخول" : "Login"}
            </Text>
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
                      fontWeight:
                        this.state.language == "English" ? "900" : "500"
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
                      fontWeight:
                        this.state.language == "Arabic" ? "900" : "500"
                    }
                  ]}
                >
                  عربى
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: "center", height: height / 3 }}>
            <Image
              style={{
                flex: 1,
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={require("../../assets/images/capture.png")}
            />
            <Text style={styles.templateText} />
          </View>
        </View>
        <View style={styles.form}>
          <Input
            placeholder={
              this.state.language == "Arabic"
                ? "البريدالالكترونى"
                : "Email address"
            }
            onChangeText={val => this.setState({ name: val })}
            leftIcon={{
              type: "font-awesome",
              name: "user",
              color: login.iconColor,
              size: 16,
              marginBottom: 5
            }}
            labelStyle={{ color: login.textColor }}
            leftIconContainerStyle={{ justifyContent: "flex-end" }}
            inputStyle={styles.input}
            autoCapitalize="none"
            inputContainerStyle={{ borderBottomColor: login.inputBorderColor }}
            placeholderTextColor={login.textColor}
          />
          <Input
            placeholder={
              this.state.language == "Arabic" ? "كلمه السر" : "Password"
            }
            onChangeText={val => this.setState({ password: val })}
            secureTextEntry={true}
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: login.iconColor,
              size: 16,
              marginBottom: 5
            }}
            labelStyle={{ 
              color: login.textColor,
             }}
            leftIconContainerStyle={{ justifyContent: "flex-end" }}
            textAlign={inputDirection}
            inputStyle={styles.input}
            autoCapitalize="none"
            inputContainerStyle={{ borderBottomColor: login.inputBorderColor }}
            placeholderTextColor={login.textColor}
          />
          <Text style={{ color: "red", margin: "3%" }}>
            {this.state.errorMessage}
          </Text>

          <View style={styles.buttonGroup}>
            <Button
              title={this.state.language == "Arabic" ? "تسجيل الدخول" : "Login"}
              onPress={() =>
                this.signInHandler(this.state.name, this.state.password)
              }
              buttonStyle={styles.button}
              titleStyle={{ color: themeColor }}
            />
            <Button
              title={
                this.state.language == "Arabic"
                  ? "تسجيل الدخول باستخدام الفيسبوك"
                  : "Login with Facebook"
              }
              onPress={this.loginWithFacebook}
              icon={{
                type: "font-awesome",
                name: "facebook",
                size: 15,
                color: "white"
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Type",this.state.language)}
          >
            <Text style={{ textAlign: "center", color: login.textColor }}>
              {this.state.language == "Arabic"
                ? "ليس لديك حساب؟ اشترك الان"
                : "don't have an account? Sign up now"}
            </Text>
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
    alignItems: "center",
    height: height * 0.4,
    justifyContent: "space-between"
  },
  loginAndSkipText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: "5%"
  },
  loginText: {
    color: login.textColor,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },
  skip: {
    width: width * 0.3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  skipText: {
    color: login.textColor,
    fontSize: 12
  },
  templateText: {
    color: login.textColor,
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "3%",
    textAlign: "center"
  },
  input: {
    color: "#fff",
    marginLeft: "5%",
    marginTop: "5%"
  },
  buttonGroup: {
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    marginTop: "3%",
    justifyContent: "space-around",
    height: height * 0.2
  },
  button: {
    backgroundColor: login.textColor
  }
});
