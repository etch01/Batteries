import React from "react";
import { Text, View, Modal, TouchableHighlight, Dimensions, StyleSheet } from "react-native";
const {width,height} = Dimensions.get("window");

const componentName = props => (
    <View style = {styles.container}>
    <Modal animationType = {"slide"} transparent = {false}
       visible = {props.modalVisible}
       onRequestClose = {() => { console.log("Modal has been closed.") } }>
       
       <View style = {styles.modal}>
          <Text style = {styles.text}>Modal is open!</Text>
          
          <TouchableHighlight>
             
             <Text style = {styles.text}>Close Modal</Text>
          </TouchableHighlight>
       </View>
    </Modal>
    
    <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>
       <Text style = {styles.text}>Open Modal</Text>
    </TouchableHighlight>
 </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
     },
     modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
     },
     text: {
        color: '#3f2949',
        marginTop: 10
     }
});

export default componentName;
