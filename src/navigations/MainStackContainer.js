/**
 * React Native
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import { RouterConst } from '../common/index';

// 官网介绍
import IntroduceScreen from '../screens/introduce/introduce';


const AppMainStackNavigator = createStackNavigator(
  {
    RouterIntroduceScreen: {
      screen: IntroduceScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: RouterConst.RouterIntroduceScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...getActiveChildNavigationOptions(navigation, screenProps),
    }),
    defaultNavigationOptions: {
      headerBackTitle: '返回',
    },
  }
);

class MainStackContainer extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  // 动态创建堆栈容器
  dynamicCreateMainStackContainer() {
    if (this.mainStackContainer) {
      return this.mainStackContainer;
    }
    this.mainStackContainer = createAppContainer(AppMainStackNavigator);
    return this.mainStackContainer;
  }

  render() {
    const AppMainStackContainer = this.dynamicCreateMainStackContainer();
    return (
      <AppMainStackContainer />
    );
  }
}

export default MainStackContainer;
