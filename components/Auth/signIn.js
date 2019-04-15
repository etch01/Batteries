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
import { themeColor, login } from "../../assets/theme/themeSettings";
const { height, width } = Dimensions.get("window");

import { Input, Button } from "react-native-elements";

export default class Login extends Component {
  state = {};

  render() {
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
            placeholder="User Name"
            leftIcon={{ type: "font-awesome", name: "user", color:login.iconColor,size:16 }}
            labelStyle={{ color: login.textColor }}
            inputStyle={styles.input}
            autoCapitalize="none"
            placeholderTextColor={login.textColor}
            />
            <Input
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock", color:login.iconColor,size:16  }}
            labelStyle={{ color: login.textColor }}
            inputStyle={styles.input}
            autoCapitalize="none"
            placeholderTextColor={login.textColor}
          />
          <TouchableOpacity style={{flexDirection:'row-reverse'}}><Text style={{marginRight:'4%',color:login.textColor,marginTop:'2%'}}>Forgot Password?</Text></TouchableOpacity>
          <View style={styles.buttonGroup}>
          <Button title="Login"
          onPress={()=>this.props.navigation.navigate("Type")}
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
          <Text style={{textAlign:'center',color:login.textColor}}>Already have an account?Sign up</Text>

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
