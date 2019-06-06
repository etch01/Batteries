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
    rating: [
      { name: "Vape", rating: 4 },
      { name: "Charger", rating: 3 },
      { name: "Car Battery", rating: 5 },
      { name: "Vape", rating: 3 },
      { name: "Charger", rating: 1 },
      { name: "Car Battery", rating: 4 }
    ],
    products: [
      {
        name: "Vape",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fvape_battery.jpg?alt=media&token=7cd9b958-bd75-42a7-a834-d171360cdac2",
        rate: 4.3,
        content: "Some text some text some text",
        quantity:1
      },
      {
        name: "Charger",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fcharger.jpg?alt=media&token=71cb150a-253e-466a-a5e6-54e980f08b92",
        rate: 3.3,
        content: "Some text some text some text Some text some text some text ",
        quantity:1
      },
      {
        name: "Car Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2F068xd-car-battery-1.jpg?alt=media&token=7dd3db1a-f88c-403d-a008-99ed26a93fa9",
        rate: 5,
        content:
          "Some text some text some text Some text some text some text Some text some text some text ",
          quantity:1
      },
      {
        name: "Phone Batteries",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fphone_battery.jpg?alt=media&token=68670b74-8186-4c0c-ab7f-61ce7096dd4c",
        rate: 4.3,
        content:
          "Some text some text some text Some text some text some text Some text some text some text Some text some text some text",
          quantity:1
      },
      {
        name: "Other",
        image: "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/batteries%2Fother.png?alt=media&token=cf6a06cf-c49c-4e33-b9f2-05e26b439263",
        rate: 4.8,
        content: "Other type of batteries",
        quantity:1
      },
    ],
    cart:[

    ],
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

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
    const {cart,products} = this.state;
    return (
      <View>
        <Header title="Products" 
        badgeValue={cart.length}
        rightButtonCart={()=>this.props.navigation.navigate('Cart',cart)}
       />
        <View style={styles.top}>
          <Image
            source={require("../../assets/MaskGroup2.png")}
            style={styles.topImage}
          />
        </View>
        <View style={styles.middle}>
          <View
            style={{ height: 32, paddingVertical: 6, paddingHorizontal: 12 }}
          >
            <Text style={{ color: themeColor, fontSize: 20, fontWeight: "700" }}>
              Best Seller
            </Text>
          </View>
          <ScrollView horizontal={true}>
            <FlatList
              horizontal={true}
              data={this.state.rating}
              renderItem={({ item, index }) => (
                <View style={styles.midCom}>
                  <Image
                    source={require("../../assets/310.jpg")}
                    style={styles.midImage}
                  />
                  <View
                    style={{
                      alignItems: "center",
                      width: width * 0.3 - 12
                    }}
                  >
                    <Text style={{ color: themeColor }}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      width: width * 0.3 - 12
                    }}
                  >
                    <StarRating
                      starSize={16}
                      disabled={false}
                      fullStarColor="gold"
                      emptyStar={"ios-star-outline"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      maxStars={5}
                      rating={item.rating}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                    />
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
                      <StarRating
                        starSize={16}
                        disabled={false}
                        fullStarColor="gold"
                        emptyStar={"ios-star-outline"}
                        fullStar={"ios-star"}
                        halfStar={"ios-star-half"}
                        iconSet={"Ionicons"}
                        maxStars={5}
                        rating={item.rate}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                      />
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
    height: height * 0.1,
    width: width * 0.3 - 12,
    borderRadius: 8,
    borderColor: themeColor,
    borderWidth: 1
  },
  bottom: {
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
