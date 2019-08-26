/**
 * React Native
 * https://github.com/facebook/react-native
 */

import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { RouterConst } from '../common';
import WelcomeScreen from '../screens/welcome/welcome';
import AuthorizeScreen from '../screens/authorize/authorize';
import MainStackContainer from './MainStackContainer';

export const AppRootNavigator = createSwitchNavigator(
  {
    RouterWelcomeScreen: {
      screen: WelcomeScreen
    },
    RouterAuthorizeScreen: {
      screen: AuthorizeScreen
    },
    RouterMainStackNavigator: {
      screen: MainStackContainer
    },
  },
  {
    initialRouteName: RouterConst.RouterWelcomeScreen
  }
);

export default createAppContainer(AppRootNavigator);
