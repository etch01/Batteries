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
import * as firebase from 'firebase'
import { themeColor, login } from "../../assets/theme/themeSettings";
import Loading from '../Loading Page/loading';
const { height, width } = Dimensions.get("window");

import { Input, Button } from "react-native-elements";

export default class Login extends Component {
  state = {
    name:'',
    password:'',
    loading: false
};

signInHandler(email, password) {
  try {
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          this.setState({loading:false});
          this.props.navigation.navigate('Products');
        })
        .catch(error => {
          var err = error.code;
          if (err == "auth/user-disabled") {
            alert("User has been banned.");
          } else if (err == "auth/invalid-email") {
            alert("email is not correct.");
          } else if (err == "auth/user-not-found") {
            alert("Email address doesn't exist.");
          } else if (err == "auth/wrong-password") {
            alert("Incorrect password.");
          }
          this.setState({ loading: false });
        });
    } else {
      alert("email or password cannot be empty.");
    }
  } catch (error) {
    console.log(error.code);
  }
}
//Facebook Login
// async loginWithFacebook() {
//   //ENTER YOUR APP ID
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//     "353512445454546",
//     { permissions: ["email"] }
//   );
//   if (type == "success") {
//     const credential = firebase.auth.FacebookAuthProvider.credential(token);
//     firebase
//       .auth()
//       .signInAndRetrieveDataWithCredential(credential)
//       .then(() => {
//         var user = firebase.auth().currentUser.uid;
//         firebase
//           .database()
//           .ref("users/" + user)
//           .on("value", snap => {
//             if (snap.val() !== null) {
//               this.setState({ loading: true });
//               this.props.navigation.navigate("MainScreen");
//             } else {
//               this.setState({ loading: true });
//               this.props.navigation.navigate("Articles");
//             }
//           });
//       })
//       .catch(err => console.log(err));
//   }
// }

  render() {
    const {loading}= this.state;
    if (loading){
      return <Loading/>
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.upperPart}>
          <View style={styles.loginAndSkipText}>
            <Text style={{ color: "transparent", flex: 1 }}>.</Text>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.skip}>
              <TouchableOpacity style={{ marginRight: "10%" }}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:"center"}}>
          <Image source={require("../../assets/images/capture.png")} />
          <Text style={styles.templateText}>
            Lorem dolor sit amet consectetur adipisicing elit, sed do.
          </Text>
          </View>
        </View>
        <View style={styles.form}>
          <Input
            placeholder="Email address"
            onChangeText={(val)=>this.setState({name:val})}
            leftIcon={{ type: "font-awesome", name: "user", color:login.iconColor,size:16 ,marginBottom:5}}
            labelStyle={{ color: login.textColor }}
            leftIconContainerStyle={{justifyContent:"flex-end"}}
            inputStyle={styles.input}
            autoCapitalize="none"
            inputContainerStyle={{borderBottomColor:login.inputBorderColor}}
            placeholderTextColor={login.textColor}
            />
            <Input
            placeholder="Password"
            onChangeText={(val)=>this.setState({password:val})}
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock", color:login.iconColor,size:16,marginBottom:5  }}
            labelStyle={{ color: login.textColor }}
            leftIconContainerStyle={{justifyContent:"flex-end"}}
            inputStyle={styles.input}
            autoCapitalize="none"
            inputContainerStyle={{borderBottomColor:login.inputBorderColor}}
            placeholderTextColor={login.textColor}
          />
          <TouchableOpacity style={{flexDirection:'row-reverse'}}><Text style={{marginRight:'4%',color:login.textColor,marginTop:'2%'}}>Forgot Password?</Text></TouchableOpacity>
          <View style={styles.buttonGroup}>
          <Button title="Login"
          onPress={()=>this.signInHandler(this.state.name,this.state.password)}
                buttonStyle={styles.button}
                titleStyle={{color:themeColor}}
            />
            <Button title="Login with Facebook"
              icon={{
                  type:"font-awesome",
                name: "facebook",
                size: 15,
                color: "white"
              }}
            />
          </View>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Type")}><Text style={{textAlign:'center',color:login.textColor}}>Already have an account?Sign up</Text></TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColor,
  },
  upperPart: {
    alignItems: "center",
    height:height*.4,
    justifyContent:'space-between'
  },
  loginAndSkipText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop:"5%"
  },
  loginText: {
    color: login.textColor,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  skip: {
    flex: 1,
    flexDirection: "row-reverse"
  },
  skipText: {
    color: login.textColor
  },
  templateText: {
    color: login.textColor,
    marginRight: "10%",
    marginLeft: "10%",
    marginTop:"3%",
    textAlign: "center"
  },
  input: {
      color:'#fff',
      marginLeft:'5%',
      marginTop:"5%"
  },
  buttonGroup:{
    marginLeft:"5%",
    marginRight:"5%",
    marginBottom:"5%",
    marginTop:"3%",
    justifyContent:'space-around',
    height:height*.2
  },
  button:{
      backgroundColor:login.textColor
  }
});
