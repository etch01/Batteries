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
import StarRating from "react-native-star-rating";
import {themeColor} from "../../assets/theme/themeSettings";
import * as firebase from 'firebase'
import Modal from './modal/productsModal';
const { width, height } = Dimensions.get("window");

export default class products extends Component {
  state = {
    products: [
      {
        name: "Vape",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fvape_battery.jpg?alt=media&token=7cd9b958-bd75-42a7-a834-d171360cdac2",
        rate: 5,
        content: "All Vape lithium batteries",
        quantity:1
      },
      {
        name: "Charger",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fcharger.jpg?alt=media&token=71cb150a-253e-466a-a5e6-54e980f08b92",
        rate: 12,
        content: "Any kind of chargers like phone charger, laptop charger, etc... ",
        quantity:1
      },
      {
        name: "Car Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2F068xd-car-battery-1.jpg?alt=media&token=7dd3db1a-f88c-403d-a008-99ed26a93fa9",
        rate: 20,
        content:
          "All car batteries",
          quantity:1
      },
      {
        name: "Phone Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fphone_battery.jpg?alt=media&token=68670b74-8186-4c0c-ab7f-61ce7096dd4c",
        rate: 8,
        content:
          "All phone batteries",
          quantity:1
      },
      {
        name: "Other",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fother.png?alt=media&token=cf6a06cf-c49c-4e33-b9f2-05e26b439263",
        rate: "??",
        content: "Other types of batteries",
        quantity:1
      },
    ],
    cart:[

    ],
    modalVisibility:false,
  };

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
    const {cart,products,modalVisibility} = this.state;
    return (
      <View>
        <Header title="Products" 
        badgeValue={cart.length}
        rightButtonChat={this._modalToggle}
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
