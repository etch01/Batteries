import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import {themeColor,login} from '../../assets/theme/themeSettings';
const { height, width } = Dimensions.get("window");

export default class Type extends Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.upperPart}>
            <Image style={styles.icon} source={require('../../assets/images/capture.png')}/>
            <Text style={styles.typeText}>An Individual / Company</Text>
            <Text style={styles.smallText}>Please select your user.</Text>
        </View>
        <View style={styles.twoTypes}>
            <Image style={styles.twoIcons} source={require('../../assets/images/user.png')}/>
            <Image style={styles.twoIcons} source={require('../../assets/images/co.png')}/>
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
    upperPart:{
        marginTop:StatusBar.currentHeight,
        height:height/3.8,
        alignItems: 'center',
        justifyContent:'space-around'
    },
    icon:{
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    typeText:{
        color:login.textColor,
        fontWeight: 'bold',
        fontSize:20
    },
    smallText:{
        color:login.textColor,
    },
    twoTypes:{
        alignItems:'center',
        height:height/2,
        justifyContent:'space-around',
        marginTop:'5%'
    },
    twoIcons:{
        width: "45%",
        height: "45%",
        resizeMode: 'contain'
    },
});