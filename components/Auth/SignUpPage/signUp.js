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
  NetInfo
} from "react-native";
import {themeColor} from '../../../assets/theme/themeSettings';
import firebase from 'firebase';

// import { runInContext } from "vm";

const { width, height } = Dimensions.get("window");

export default class SignUp extends Component {
  state={
    errorMessage:"",
    loading:false,
    name:'',
    email:'',
    password:'',
    gender:'',
    phone:'',
    address:'',
    confirmed:false,
    type:''
  }

  signUpHandler(email, password) {
    //checking if required fields are not empty !
    if (
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
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
              admin:false,
              gender:this.state.gender,
              type:this.state.type,
              dateCreated:today,
            })
            .then(()=>{
              this.setState({ loading: false });
              this.props.navigation.navigate("Type");
            })
            .catch(() => alert("Failed"));
        })
        //Throwing error code
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            this.setState({errorMessage:"Password must be 8 characters or more."});
            this.setState({ loading: false });
          } else if (errorCode == "auth/email-already-in-use") {
            this.setState({errorMessage:"Email already in use."});
            this.setState({ loading: false });
          } else if (errorCode == "auth/invalid-email") {
            this.setState({errorMessage:"Invalid Email address."});
            this.setState({ loading: false });
          } else if (errorCode == "auth/operation-not-allowed") {
            this.setState({errorMessage:"Email is not activated."});
            this.setState({ loading: false });
          } else {
            alert(errorMessage);
          }
        });
    } else if (this.state.password.length < 8) {
      this.setState({errorMessage:"Password is too short"});
    } else {
      //Trowing errors for required fields or password not match
  if (this.state.email == "" && this.state.password == "") {
        this.setState({errorMessage:"Please fill the required fields!"});
      }
    }
  }
//Checking for internet Connection
  authHandler=()=> {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      //alert('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      const status = connectionInfo.type;
      if (status === "wifi" || status === "cellular") {
        this.signUpHandler();
      } else {
        alert("لا يوجد اتصال بالانترنت");
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
            onChangeText={(val)=>this.setState({name:val})}
            style={styles.inputContainer}
            placeholder="Full Name"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={(val)=>this.setState({email:val})}
            placeholder="Email"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={(val)=>this.setState({password:val})}
            placeholder="Password"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={(val)=>this.setState({phone:val})}
            placeholder="Mobile"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={(val)=>this.setState({gender:val})}
            placeholder="Gender"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.inputContainer}
            onChangeText={(val)=>this.setState({address:val})}
            placeholder="Address"
            placeholderTextColor="#fff"
          />
        </View>
        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        <View style={styles.bottom}>
        {
          !this.state.loading ?
          <TouchableOpacity
          onPress={()=>this.signUpHandler(this.state.email,this.state.password)}
           style={styles.myButton}>
            <Text style={styles.bottomText}> Sign Up </Text>
          </TouchableOpacity>
          : <ActivityIndicator size="large"/>
        }

        </View>
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
    borderRadius: 6,
    marginTop: "2%",
    marginBottom: "2%",
  },
  bottomText: {
    color: "#5aaa5a"
  },
  errorText:{
    color:'red',
    marginLeft: "10%",
  }
});
