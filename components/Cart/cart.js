import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import Header from "../Header/header";
import { themeColor } from "../../assets/theme/themeSettings";
import StarRating from "react-native-star-rating";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default class cart extends Component {
  state = {
    products: [
    ],
  };

  componentWillMount=()=>{
    this.setState({products:this.props.navigation.state.params});
  }

  increaseQuantityHandler=(currentQuantity,itemName,index)=>{
    const {products} = this.state;
    const newArray = [...products];
    newArray[index].quantity = currentQuantity + 1;
    this.setState({products:newArray});
  }

  decreaseQuantityHandler=(currentQuantity,itemName,index)=>{
    const {products} = this.state;
    const newArray = [...products];
    if (newArray[index].quantity!=1){
      newArray[index].quantity = currentQuantity - 1;
    }else{
      newArray.splice(index,1);
    }
    this.setState({products:newArray});
  }

  render() {
    const {products} = this.state;
    if(this.state.products.length==0){
      return (
        <View>
        <Header
          title="Cart"
          backButton={() => this.props.navigation.goBack()}
          rightButtonLogout={()=>{
            firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}

        />
        <View style={{alignItems:'center',color:themeColor,justifyContent:'center'}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>The cart is empty.</Text>

        </View>
        </View>
        )
    }
    return (
      <View>
        <Header
          title="Cart"
          backButton={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <FlatList
            data={this.state.products}
            renderItem={({ item, index }) => (
              <View style={styles.cartCon}>
                <View style={styles.imageCon}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/310.jpg")}
                  />
                </View>
                <View style={styles.productCon}>
                  <View style={styles.productData}>
                    <View>
                      <Text style={{ color: themeColor, fontWeight: "800" }}>
                        {item.name}
                      </Text>
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
                      <Text numberOfLines={3}>{item.content} </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                      onPress={()=>this.decreaseQuantityHandler(item.quantity,item.name,index)}
                      >
                        <Feather
                          name="minus-circle"
                          size={32}
                          color={themeColor}
                        />
                      </TouchableOpacity>
                      <Text style={{ paddingHorizontal: 12 }}>{item.quantity}</Text>
                      <TouchableOpacity onPress={()=>this.increaseQuantityHandler(item.quantity,item.name,index)}>
                        <Feather
                          name="plus-circle"
                          size={32}
                          color={themeColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.productIcon}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around"
                      }}
                    >
                      <TouchableOpacity>
                        <FontAwesome
                          name="heart"
                          size={24}
                          color={themeColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons name="md-cart" size={24} color="grey" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.myButton}
                    onPress={()=>this.props.navigation.navigate('Location',products)}
                    >
                      <Text style={{ color: themeColor, fontWeight: "800" }}>
                        Execute
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cartCon: {
    height: height * 0.24,
    width: width,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  imageCon: {
    width: width * 0.36,
    height: height * 0.24,
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  productCon: {
    width: width * 0.7,
    height: height * 0.24,
    flexDirection: "row"
  },
  image: {
    resizeMode: "cover",
    width: width * 0.36 - 32,
    height: height * 0.24 - 48,
    borderColor: themeColor,
    borderRadius: 8,
    borderWidth: 1
  },
  productData: {
    width: width * 0.4,
    height: height * 0.24,
    paddingVertical: 24,
    justifyContent: "space-between"
  },
  productIcon: {
    width: width * 0.24,
    height: height * 0.24,
    paddingRight: 16,
    paddingVertical: 24
  },
  myButton: {
    paddingHorizontal: 8,
    marginTop: 24,
    borderColor: themeColor,
    borderWidth: 2,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  }
});