import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome,AntDesign } from "@expo/vector-icons";
import firebase from 'firebase';
import {themeColor} from '../../../assets/theme/themeSettings';
import { DrawerActions } from 'react-navigation-drawer';
const signOut=(action)=>{
    firebase.auth().signOut().then(function() {
        action
      }).catch(function(error) {
        console.log(error)
      });
}

const drawerContent = (props) => (
    <View style={styles.drawerContainer}>
          <TouchableOpacity onPress={()=>props.navigation.dispatch(DrawerActions.closeDrawer())}>
                <AntDesign name="closecircleo" size={30} color="#ffffff" />
          </TouchableOpacity>
        <View style={styles.imageContainer}>
            <Image style={styles.icon} source={require('../../../assets/images/capture.png')}/>
        </View>
        <View style={styles.buttonsContainer}>
            <View syle={{flex:1,paddingTop: 40}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Rewards')}} style={{flexDirection:'row',padding:20}}>
            <FontAwesome name="gift" size={32} color="#fff" />
            <Text style={styles.txt}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{signOut(props.navigation.navigate('Login'))}} style={{flexDirection:'row',padding:20}}>
            <FontAwesome name="power-off" size={32} color="#fff" />
            <Text style={styles.txt}>Logout</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    drawerContainer:{
        padding: 30,
        flex:1,
        backgroundColor:themeColor
    },
    imageContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonsContainer:{
        flex:1,
        alignItems: 'center',
        paddingTop: '5%',
    },
    txt:{
        color:'#FFFFFF',
        fontWeight: 'bold',
        fontSize:20,
        marginLeft: 10,
    }
});

export default drawerContent;
