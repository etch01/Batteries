import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {themeColor} from '../../assets/theme/themeSettings';
// import { FontAwesome5 } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default props => {
  return (
    <View style={styles.cont}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerView}>
        <View style={{ width: width * 0.25 }}>
          <TouchableOpacity onPress={props.backButton}>
            <Ionicons name="md-list" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.txt}>{props.title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            width: width * 0.25,
            justifyContent: "space-between"
          }}
        >
          <View>
            <TouchableOpacity onPress={props.backButton}>
              <Feather name="search" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={props.backButton}>
              <MaterialIcons name="chat-bubble" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={props.backButton}>
              <Ionicons name="md-cart" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    marginBottom: 6,
    flex: 1,
    marginHorizontal: 12,
    marginTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight + 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cont: {
    flexDirection: "row",
    backgroundColor: themeColor
  },
  txt: {
    fontSize: 20,
    color: "#fff"
  }
});
