import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../Auth/signIn';
import SignUp from '../Auth/SignUpPage/signUp';
import Type from '../userType/type';
import Products from '../Products/products';

const StackNav = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Type: { screen: Type },
    Products: { screen: Products },
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
