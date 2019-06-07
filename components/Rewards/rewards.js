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
import Header from "../Header/miniHeader";
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import {themeColor} from "../../assets/theme/themeSettings";
import * as firebase from 'firebase'
const { width, height } = Dimensions.get("window");

export default class Rewards extends Component {
  state = {
    products: [
      {
        name: "Vape",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fvape_battery.jpg?alt=media&token=7cd9b958-bd75-42a7-a834-d171360cdac2",
        rate: 15,
        content: "Exchange points into New vape battery",
        quantity:1
      },
      {
        name: "Charger",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fcharger.jpg?alt=media&token=71cb150a-253e-466a-a5e6-54e980f08b92",
        rate: 22,
        content: "Exchange points into New Charger ",
        quantity:1
      },
      {
        name: "Car Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2F068xd-car-battery-1.jpg?alt=media&token=7dd3db1a-f88c-403d-a008-99ed26a93fa9",
        rate: 40,
        content:
          "Exchange points into a car battery",
          quantity:1
      },
      {
        name: "Phone Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fphone_battery.jpg?alt=media&token=68670b74-8186-4c0c-ab7f-61ce7096dd4c",
        rate: 30,
        content:
          "Exchange points into New phone battery",
          quantity:1
      },
      {
        name: "Money",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fother.png?alt=media&token=cf6a06cf-c49c-4e33-b9f2-05e26b439263",
        rate: "20",
        content: "Exchange points into Money (1 pound for each 20 point)",
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

  render() {
    const {cart,products,modalVisibility} = this.state;
    return (
      <View>
        <Header title="Rewards" 
        badgeValue={cart.length}
        backButton={()=>this.props.navigation.goBack()}
       />
        <View style={styles.top}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/gift.gif?alt=media&token=55310a28-2073-447f-b52c-156be50c23d9"}}
            style={styles.topImage}
          />
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

  bottom: {
    marginTop: "3%",
    //height: height * 0.4,
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
