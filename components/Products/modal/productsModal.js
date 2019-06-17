import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import { themeColor } from "../../../assets/theme/themeSettings";
import firebase from "firebase";

const { width, height } = Dimensions.get("window");

export default class NoteModal extends Component {
  state = {
    note: "",
    loading: false,
    language: "Arabic"
  };

  addNoteToDatabase = () => {
    try {
      this.setState({ loading: true });
      const user = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("notes/")
        .push()
        .set({
          message: this.state.note,
          uid: user
        })
        .then(() => {
          this.setState({ loading: false });
          alert("Thank You.");
        });
    } catch (ex) {
      this.setState({ loading: false });
      console.log(ex);
    }
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

    componentWillMount=()=>{
      this.getLanguage();
    }

  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.props.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: "100%", height: "90%" }}
              resizeMode="contain"
              source={{
                uri:
                  "https://3.imimg.com/data3/XK/AU/MY-2619877/colorful-sticky-notes-500x500.jpg"
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                title={this.state.language == "Arabic" ? "أرسل" : "Submit"}
                onPress={this.addNoteToDatabase}
                buttonStyle={{ backgroundColor: themeColor }}
                loading={this.state.loading}
              />
              <Button
                title={this.state.language == "Arabic" ? "إلغاء" : "Cancel"}
                onPress={this.props.toggleModal}
                buttonStyle={{ backgroundColor: "tomato" }}
              />
            </View>
            <TextInput
              style={styles.children}
              placeholder={
                this.state.language == "Arabic"
                  ? "اكتب ملاحظتك هنا"
                  : "Write your note here"
              }
              placeholderTextColor="#ffffff"
              onChangeText={txt => this.setState({ note: txt })}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ede3f2"
  },
  children: {
    position: "absolute",
    marginTop: "45%",
    marginLeft: "20%"
  }
});
