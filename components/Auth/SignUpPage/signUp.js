import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  NetInfo,
  Modal
} from "react-native";
import { Button } from "react-native-elements";
import { themeColor } from "../../../assets/theme/themeSettings";
import firebase from "firebase";
import { FontAwesome } from "@expo/vector-icons";

// import { runInContext } from "vm";

const { width, height } = Dimensions.get("window");

export default class SignUp extends Component {
  state = {
    errorMessage: "",
    loading: false,
    modalVisible: false,
    //signup state
    name: "",
    email: "",
    password: "",
    gender: "Gender",
    phone: "",
    address: "",
    confirmed: false,
    type: "",
    language: "Arabic"
  };

  signUpHandler(email, password) {
    //checking if required fields are not empty !
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      //Sign Up with Mail and password as parameters
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        //Adding user data to the current uid in database
        .then(() => {
          //getting today's date
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1; //January is 0!
          var yyyy = today.getFullYear();

          if (dd < 10) {
            dd = "0" + dd;
          }

          if (mm < 10) {
            mm = "0" + mm;
          }

          today = mm + "/" + dd + "/" + yyyy;
          //getting current user for the uid
          var user = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("users/" + user)
            .set({
              name: this.state.name,
              email: this.state.email,
              phone: this.state.phone,
              confirmed: this.state.confirmed,
              admin: false,
              language:this.state.language,
              points: 0,
              gender: this.state.gender,
              type:
                this.props.navigation.state.params.type == "" ||
                this.props.navigation.state.params.type == undefined
                  ? this.state.type
                  : this.props.navigation.state.params.type,
              dateCreated: today
            })
            .then(() => {
              this.setState({ loading: false });
              this.props.navigation.navigate("Type");
            })
            .catch(() => alert("Failed"));
        })
        //Throwing error code
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (this.state.language=="English"){
            if (errorCode == "auth/weak-password") {
              this.setState({
                errorMessage: "Password must be 8 characters or more."
              });
              this.setState({ loading: false });
            } else if (errorCode == "auth/email-already-in-use") {
              this.setState({ errorMessage: "Email already in use." });
              this.setState({ loading: false });
            } else if (errorCode == "auth/invalid-email") {
              this.setState({ errorMessage: "Invalid Email address." });
              this.setState({ loading: false });
            } else if (errorCode == "auth/operation-not-allowed") {
              this.setState({ errorMessage: "Email is not activated." });
              this.setState({ loading: false });
            } else {
              alert(errorMessage);
            }
          }else{
            if (errorCode == "auth/weak-password") {
              this.setState({
                errorMessage: "الرقم السري 8 حروف او اكثر."
              });
              this.setState({ loading: false });
            } else if (errorCode == "auth/email-already-in-use") {
              this.setState({ errorMessage: "البريد الالكتروني مستخدم." });
              this.setState({ loading: false });
            } else if (errorCode == "auth/invalid-email") {
              this.setState({ errorMessage: "البريد الالكتروني غير موجود." });
              this.setState({ loading: false });
            } else if (errorCode == "auth/operation-not-allowed") {
              this.setState({ errorMessage: "البريد الالكتروني غير مفعل." });
              this.setState({ loading: false });
            } else {
              alert(errorMessage);
            }
          }

        });
    } else {
      //Trowing errors for required fields or password not match
      if (this.state.email == "" && this.state.password == "") {
        if (this.state.language=="English"){
          this.setState({ errorMessage: "Please fill the required fields!" });
        }else{
          this.setState({ errorMessage: "من فضلك املأ الحقول المطلوبه!" });
        }
      }
    }
  }

  //Gender Modal visibility switch
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //Checking for internet Connection
  authHandler = () => {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      //alert('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      const status = connectionInfo.type;
      if (status === "wifi" || status === "cellular") {
        this.signUpHandler();
      } else {
        alert("لا يوجد اتصال بالانترنت");
      }
    });
  };

  componentWillMount = () => {
    this.setState({language:this.props.navigation.state.params.language});
    if (this.props.navigation.state.params.language == "Arabic") {
      this.setState({ gender: "النوع" });
    } else {
      this.setState({ gender: "Gender" });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  render() {
    var inputDirection = "left";
    if (this.state.language == "Arabic") {
      inputDirection = "right";
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/capture.png")}
          />
          <Text style={styles.topText}>
            {this.state.language == "Arabic"
              ? "انشاء حساب"
              : "Create an Account"}
          </Text>
          <Text style={styles.topSecText}>
            {this.state.language == "Arabic"
              ? "يمكنك إنشاء حساب جديد هنا"
              : "You Can Create New Account Here"}
          </Text>
        </View>
        <View style={styles.middle}>
          <TextInput
            direction="rtl"
            onChangeText={val => this.setState({ name: val })}
            style={styles.inputContainer}
            placeholder={
              this.state.language == "Arabic" ? "الاسم بالكامل" : "Full Name"
            }
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={val => this.setState({ email: val })}
            placeholder={
              this.state.language == "Arabic" ? "البريد الإلكتروني" : "Email"
            }
            placeholderTextColor="#fff"
          />
          <TextInput
            style={{
              width: width * 0.8,
              color: "#fff",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              textAlign: inputDirection
            }}
            onChangeText={val => this.setState({ password: val })}
            secureTextEntry={true}
            placeholder={
              this.state.language == "Arabic" ? "كلمه السر" : "Password"
            }
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={val => this.setState({ phone: val })}
            placeholder={
              this.state.language == "Arabic"
                ? "رقم الهاتف المحمول"
                : "Mobile number"
            }
            placeholderTextColor="#fff"
          />

          <TouchableOpacity
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
            style={{ flexDirection: "row", width: width * 0.8 }}
          >
            <TextInput
              style={{
                width: width * 0.8,
                color: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
                textAlign: inputDirection
              }}
              onChangeText={val => this.setState({ gender: val })}
              placeholder={this.state.gender}
              placeholderTextColor="#fff"
            />
            <FontAwesome
              style={{ marginTop: "2%", marginLeft: "-4%" }}
              name="angle-down"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.inputContainer}
            onChangeText={val => this.setState({ address: val })}
            placeholder={
              this.state.language == "Arabic" ? "العنوان" : "The address"
            }
            placeholderTextColor="#fff"
          />
        </View>
        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        <View style={styles.bottom}>
          {!this.state.loading ? (
            <TouchableOpacity
              onPress={() =>
                this.signUpHandler(this.state.email, this.state.password)
              }
              style={styles.myButton}
            >
              <Text style={styles.bottomText}>
                {this.state.language == "Arabic" ? "تسجيل" : "Sign Up"}
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <Modal
          animationType="slide"
          style={{ width: 100, height: 100, backgroundColor: "black" }}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "30%",
                justifyContent: "space-around",
                width: "100%",
                paddingLeft: "20%",
                paddingRight: "20%",
                backgroundColor: "rgb(255, 255, 255, 0.8)"
              }}
            >
              <Button
                buttonStyle={{ backgroundColor: "#ffffff" }}
                titleStyle={{ color: "black" }}
                title={this.state.language == "Arabic" ? "ذكر" : "Male"}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.state.language == "Arabic"
                    ? this.setState({ gender: "ذكر" })
                    : this.setState({ gender: "Male" });
                }}
              />
              <Button
                buttonStyle={{ backgroundColor: "#ffffff" }}
                title={this.state.language == "Arabic" ? "أنثى" : "Female"}
                titleStyle={{ color: "black" }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.state.language == "Arabic"
                    ? this.setState({ gender: "أنثي" })
                    : this.setState({ gender: "Female" });
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    alignItems: "center",
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain"
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
    borderRadius: 6,
    marginTop: "2%",
    marginBottom: "2%"
  },
  bottomText: {
    color: "#5aaa5a"
  },
  errorText: {
    color: "red",
    marginLeft: "10%"
  }
});
