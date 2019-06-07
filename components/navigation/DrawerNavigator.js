import { Dimensions } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Products from '../Products/products';
import CustomDrawerContentComponent from './DrawerContent/customeDrawerContent';
import Rewards from '../Rewards/rewards';

const { width } = Dimensions.get("window");

const DrawerNavigation = createDrawerNavigator(
  {
    Products: {
      screen: Products,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Rewards: {
      screen: Rewards,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
  },

  {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: "right",
    drawerWidth: width * 0.7
  }
);

const drawerContainer = createAppContainer(DrawerNavigation);
export default drawerContainer;
