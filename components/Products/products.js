import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Header from "../Header/header";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-rating";
import StarRating from "react-native-star-rating";
import {themeColor} from "../../assets/theme/themeSettings";

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
        image: "../../assets/301.png",
        rate: 4.3,
        content: "Some text some text some text"
      },
      {
        name: "Charger",
        image: "../../assets/302.png",
        rate: 3.3,
        content: "Some text some text some text Some text some text some text "
      },
      {
        name: "Car Batteries",
        image: "../../assets/303.png",
        rate: 5,
        content:
          "Some text some text some text Some text some text some text Some text some text some text "
      },
      {
        name: "Phone Batteries",
        image: "../../assets/304.png",
        rate: 4.3,
        content:
          "Some text some text some text Some text some text some text Some text some text some text Some text some text some text"
      }
    ]
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {
    return (
      <View>
        <Header title="Products" />
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
                <View style={styles.botCom}>
                  <View style={styles.botImgCon}>
                    <Image
                      source={require("../../assets/310.jpg")}
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
                        <TouchableOpacity>
                          <Ionicons name="md-cart" size={32} color={themeColor} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <FontAwesome name="heart" size={24} color="grey" />
                        </TouchableOpacity>
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
                </View>
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
