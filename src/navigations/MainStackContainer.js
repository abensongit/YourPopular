
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
import MainTabRootContainer from './MainTabRootContainer';

// 官网介绍
import IntroduceScreen from '../screens/introduce/introduce';


/**
 * 主导航容器
 */
const AppMainStackNavigator = createStackNavigator(
  {
    RouterMainTabContainer: {
      screen: MainTabRootContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterIntroduceScreen: {
      screen: IntroduceScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: RouterConst.RouterMainTabContainer,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...getActiveChildNavigationOptions(navigation, screenProps),
    }),
    defaultNavigationOptions: {
      headerBackTitle: '返回',
    },
  }
);


/**
 * Get the current screen from navigation state
 * @param navigationState
 * @returns {*}
 */
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


type Props = {};
class MainStackContainer extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  /**
   * 动态创建堆栈容器
   * @returns {NavigationContainer}
   */
  dynamicCreateMainStackContainer() {
    if (this.mainStackContainer) {
      return this.mainStackContainer;
    }
    this.mainStackContainer = createAppContainer(AppMainStackNavigator);
    return this.mainStackContainer;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 配置状态栏为[light-content]的页面数组
    const lightContentScreens = [
      RouterConst.RouterIntroduceScreen,
    ];
    // 动态创建堆栈容器
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
