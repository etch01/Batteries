import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../Auth/signIn";
import SignUp from "../Auth/SignUpPage/signUp";
import Type from "../userType/type";
import Drawer from "./DrawerNavigator";
import Cart from "../Cart/cart";
import Location from "../Location/location";
import BottomTabNav from "./bottomNav";
import Admin from "../Admin/allReuests";
import Map from "../Map/map";

const StackNav = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Type: { screen: Type },
    Drawer: { screen: Drawer },
    Cart: { screen: Cart },
    Location: { screen: Location },
    Admin: { screen: Admin },
    Map: { screen: Map }
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(StackNav);
