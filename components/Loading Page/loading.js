import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View,Text } from "react-native";
import { themeColor,login } from "../../assets/theme/themeSettings";

export default class loading extends Component {
  render() {
    return (
      <View style={styles.main}>
        <ActivityIndicator
          color="#ffffff"
          size="large"
          style={styles.activityIndicator}
        />
        <Text style={{color:login.textColor}}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator:{

  }
});
