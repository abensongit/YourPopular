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
// 网页控件
import WebBrowserScreen from '../screens/browser/webbrowser';
// 标签设置
import MarksCustomScreen from '../screens/mycenter/marks/marks-custom';
// 标签排序
import MarksSortedScreen from '../screens/mycenter/marks/marks-sorted';
// 语言设置
import LanguagesCustomScreen from '../screens/mycenter/langus/langus-custom';



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
    RouterWebBrowserScreen: {
      screen: WebBrowserScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterMarksCustomScreen: {
      screen: MarksCustomScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterMarksSortedScreen: {
      screen: MarksSortedScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterLanguagesCustomScreen: {
      screen: LanguagesCustomScreen,
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
    // 配置状态栏为[dark-content]的页面数组
    const darkContentScreens = [
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
            if (darkContentScreens.indexOf(currentScene) >= 0) {
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
