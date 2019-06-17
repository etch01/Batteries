import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Header from "../Header/miniHeader";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { themeColor } from "../../assets/theme/themeSettings";
import * as firebase from "firebase";
const { width, height } = Dimensions.get("window");

export default class Rewards extends Component {
  state = {
    products: [],
    cart: [],
    loading: false,
    modalVisibility: false,
    language: "Arabic",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/batteries-5b258.appspot.com/o/gift.gif?alt=media&token=55310a28-2073-447f-b52c-156be50c23d9"
  };

          //Get user language
          getLanguage = () =>{
            const uid = firebase.auth().currentUser.uid;
            firebase.database().ref("users/"+uid).on("value",
            snap=>{
              var language = snap.val().language;
              this.setState({language,loading:true});
          })
        }

  componentWillMount = () => {
    this.getLanguage();
    firebase
      .database()
      .ref("rewards")
      .on("value", snap => {
        this.setState({ products: snap.val().rewards, loading: false });
      });
  };

  render() {
    const { cart } = this.state;
    return (
      <View>
        <Header
          title={this.state.language == "Arabic" ? "المكافآت" : "Rewards"}
          badgeValue={cart.length}
          backButton={() => this.props.navigation.goBack()}
        />
        <View style={styles.top}>
          <Image
            source={{ uri: this.state.headerImage }}
            style={styles.topImage}
          />
        </View>
        <View style={styles.bottom}>
          <FlatList
            data={this.state.products}
            renderItem={({ item, index }) => (
              <View
                style={styles.botCom}
              >
                <View style={styles.botImgCon}>
                  <Image source={{ uri: item.image }} style={styles.botImage} />
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
                      <View>
                        <AntDesign
                          name="checkcircleo"
                          size={32}
                          color={themeColor}
                        />
                      </View>
                      <View />
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.3
                    }}
                  >
                    <Text>
                      {this.state.language == "Arabic" ? "النقاط:" : "Points:"}
                      {item.points}
                    </Text>
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
    height: height * 0.62,
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
