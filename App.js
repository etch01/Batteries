import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './components/navigation/stackNavigator';
import fbConfig from './components/Firebase/config';
import firebase from 'firebase';
firebase.initializeApp(fbConfig);
export default class App extends React.Component {
  render() {
    return (
      <Navigator/>
    );
  }
}

