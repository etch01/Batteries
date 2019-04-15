import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../Auth/signIn';
import Type from '../userType/type';

const StackNav = createStackNavigator(
  {
    Login: { screen: Login },
    Type: { screen: Type },
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
