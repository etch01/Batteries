import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import firebase from "firebase";

export default class AllReuests extends Component {
  state = {
    allOrders: [],
    pts: 0,
    language: "Arabic"
  };

    //Get user language
    getLanguage = () =>{
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref("users/"+uid).on("value",
      snap=>{
        var language = snap.val().language;
        this.setState({language});
    })
  }

  componentWillMount = () => {
    this.getLanguage();
    var oldArray = [];
    firebase
      .database()
      .ref("orders")
      .on("value", snap => {
        snap.forEach(child => {
          oldArray.push({
            orderID: child.key,
            phone: child.val().phone,
            address: child.val().address,
            name: child.val().user,
            location: {
              lat: child.val().location.latitude,
              long: child.val().location.longitude
            },
            orders: child.val().order
          });
        });
        this.setState({ allOrders: oldArray });
      });
  };

  deleteOrderHandle = id => {
    try {
      const ref = firebase.database().ref("orders/" + id);
      ref.remove();
      alert("Successfully Removed.");
    } catch (err) {
      console.log(err);
    }
  };

  acceptingOrder = (id, Oid) => {
    try {
      const ref = firebase.database().ref("users/" + id + "/points");
      ref.transaction(v => {
        return (v += parseInt(this.state.pts));
      });
      this.deleteOrderHandle(Oid);
      alert("Successfully Updated.");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.allOrders.map((u, i) => {
          return (
            <Card key={i} title={u.name}>
              <View style={styles.user}>
                <Text style={styles.name}>
                  {this.state.language == "Arabic" ? "هاتف:" : "Phone:"}
                  {u.phone}
                </Text>
                <Text style={styles.name}>
                  {this.state.language == "Arabic" ? "العنوان:" : "Address:"}
                  {u.address}
                </Text>
                <Text style={styles.name}>
                  {this.state.language == "Arabic" ? "الموقع:" : "Location:"}
                  {u.location.lat + ", " + u.location.long}
                </Text>
                <Text style={styles.name}>
                  {this.state.language == "Arabic" ? "الطلبات:" : "Orders:"}
                </Text>
                {u.orders.map((elm, ind) => {
                  return (
                    <View style={{ marginTop: 10 }} key={ind}>
                      <Text>
                        {this.state.language == "Arabic"
                          ? "اسم الطلب:"
                          : "Order Name:"}
                        {elm.name}
                      </Text>
                      <Text>
                        {this.state.language == "Arabic"
                          ? "كمية الطلب:"
                          : "Order quantity:"}
                        {elm.rate}
                      </Text>
                    </View>
                  );
                })}
                <TextInput
                  onChangeText={txt => this.setState({ pts: txt })}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1
                  }}
                  placeholder={
                    this.state.language == "Arabic"
                      ? "أضف نقاط إلى المستخدم هنا"
                      : "Add points to user here"
                  }
                />
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    buttonStyle={{ backgroundColor: "tomato" }}
                    onPress={() => this.deleteOrderHandle(u.orderID)}
                    title={
                      this.state.language == "Arabic"
                        ? "رفض وحذف"
                        : "Refuse and delete"
                    }
                  />
                  <Button
                    title={this.state.language == "Arabic" ? "قبول" : "Accept"}
                    onPress={() => this.acceptingOrder(u.name, u.orderID)}
                    buttonStyle={{ backgroundColor: "#039BE5" }}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#039BE5",
    paddingTop: 30
  },
  name: {
    fontSize: 17
  }
});
