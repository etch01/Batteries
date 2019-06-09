import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Header from "../Header/header";
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import Loading from '../Loading Page/loading';
import {themeColor} from "../../assets/theme/themeSettings";
import * as firebase from 'firebase'
import Modal from './modal/productsModal';
const { width, height } = Dimensions.get("window");

export default class products extends Component {
  state = {
    products: [

    ],
    cart:[

    ],
    modalVisibility:false,
    loading: false,
  };

  //refresh on navigation
  refresh=()=>{
    
  }

  componentWillReceiveProps=()=>{
    this.setState({cart:[]});
  }

  componentWillMount=()=>{
    this.setState({loading:true});
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users/"+uid).on("value",elements=>{
      if (elements.val().admin){
        this.setState({loading:false});
        this.props.navigation.navigate("Admin");
      }
    })
    firebase.database().ref("categories").on("value",(snap)=>{
      this.setState({products:snap.val().allBatteries,loading:false})
    })
  }
  //Fill the cart
  addingProductToCart=(product)=>{
    const {cart} = this.state;
    const newArray = [...cart];
    if(cart.includes(product)){
      Alert.alert("Already added","Your item is already in the cart ")
    }
    else{
      newArray.push(product);
      this.setState({cart:newArray})
    }
  }

_modalToggle=()=>{
  this.setState({modalVisibility:!this.state.modalVisibility})
}
  render() {
    const {cart,products,modalVisibility,loading} = this.state;
    if (loading){
      return <Loading/>
    }
    return (
      <View>
        <Header title="Products" 
        badgeValue={cart.length}
        rightButtonChat={this._modalToggle}
        menu={() =>
          this.props.navigation.toggleDrawer()
        }
        rightButtonCart={()=>this.props.navigation.navigate('Cart',cart)}
       />
        <View style={styles.top}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/deadBattery.gif?alt=media&token=ead1ef24-d8ac-4faa-9c84-d78e0054d735"}}
            style={styles.topImage}
          />
        </View>
        <View style={styles.middle}>
          <View
            style={{ height: 32, paddingVertical: 6, paddingHorizontal: 12 }}
          >
            <Text style={{ color: themeColor, fontSize: 20, fontWeight: "700" }}>
               Batteries we accept:
            </Text>
          </View>
        <ScrollView horizontal={true}>
          <FlatList
            horizontal={true}
            data={this.state.products}
            renderItem={({ item, index }) => (
              <View style={styles.midCom}>
                <Image
                  source={{uri:item.image}}
                  style={styles.midImage}
                />
                <View
                  style={{
                    width: width * 0.3 - 12
                  }}
                >
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <ScrollView>
          <FlatList
            data={this.state.products}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={()=>this.addingProductToCart(item)} style={styles.botCom}>
                <View style={styles.botImgCon}>
                  <Image
                    source={{uri:item.image}}
                    style={styles.botImage}
                  />
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: width * 0.7 - 40
                    }}
                  >
                    <View>
                      <Text style={{ color: themeColor, fontSize: 24 }}>
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 60,
                        justifyContent: "space-between"
                      }}
                    >
                      <View >
                        <Ionicons name="md-cart" size={32} color={themeColor} />
                      </View>
                      <View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.3
                    }}
                  >
                  <Text>Points:{item.rate}</Text>
                  </View>
                  <View
                    style={{
                      width: width * 0.7 - 40
                    }}
                  >
                    <Text>{item.content}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ height: 40 }} />
        </ScrollView>
          <Modal isModalVisible={this.state.modalVisibility}
                    toggleModal={this._modalToggle}
                    />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    height: height * 0.3,
    width: width
  },
  topImage: {
    resizeMode: "cover",
    height: height * 0.3,
    width: width
  },
  middle: {
    height: height * 0.24,
    width: width
  },
  midCom: {
    height: height * 0.24 - 30,
    width: width * 0.3,
    flexDirection: "column",
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  midImage: {
    resizeMode: "cover",
    height: height * 0.2 - 24,
    width: width * 0.3,
    borderRadius: 8,
    borderColor: themeColor,
    borderWidth: 1
  },
  bottom: {
    marginTop: "3%",
    height: height * 0.4,
    width: width
  },
  botCom: {
    width: width,
    height: height * 0.2,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  botImgCon: {
    height: height * 0.2 - 24,
    width: width * 0.3
  },
  botImage: {
    resizeMode: "cover",
    height: height * 0.2 - 24,
    width: width * 0.3,
    borderRadius: 8,
    borderColor: themeColor,
    borderWidth: 1
  }
});
