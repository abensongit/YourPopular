/**
 * React Native
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
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

// get the current screen from navigation state
function getCurrentRouteName(navigationState: any) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}


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
    // 配置状态栏为[light-content]的页面数组
    const lightContentScreens = [
      RouterConst.RouterIntroduceScreen,
    ];
    const AppMainStackContainer = this.dynamicCreateMainStackContainer();
    return (
      <AppMainStackContainer
        onNavigationStateChange={(prevState, currentState) => {
          const previousScene = getCurrentRouteName(prevState);
          const currentScene = getCurrentRouteName(currentState);
          if (previousScene !== currentScene) {
            if (lightContentScreens.indexOf(currentScene) >= 0) {
              StatusBar.setBarStyle('dark-content');
            } else {
              StatusBar.setBarStyle('light-content');
            }
          }
        }}
      />
    );
  }
}

export default MainStackContainer;
