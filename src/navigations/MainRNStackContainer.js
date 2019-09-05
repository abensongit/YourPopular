import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import {
  StackViewStyleInterpolator
} from 'react-navigation-stack';
import {
  NavigationMainService,
  NavigationReactNativeService,
  RouterConst,
  System
} from '../common';
import MainRNTabRootContainer from './MainRNTabRootContainer';


// 控件
import ItemNativeToJavaScriptScreen from '../screens/reactnative/tab-home/extendpro/native-modules/native-to-javascript';


/**
 * 主导航容器
 */
const MainStackNavigator = createStackNavigator(
  {
    RouterMainRNTabContainer: {
      screen: MainRNTabRootContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    // 控件
    RouterRNExtendItemNativeToJavaScriptScreen: ItemNativeToJavaScriptScreen,
  },
  {
    initialRouteName: RouterConst.RouterMainRNTabContainer,
    defaultNavigationOptions: {
      headerBackTitle: System.theme.navBar.buttonBackTitle,
    },
    navigationOptions: ({ navigation, screenProps }) => ({
      ...getActiveChildNavigationOptions(navigation, screenProps),
    }),
    transitionConfig: () => ({ // 修改页面跳转动画
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
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
class MainRNStackContainer extends Component<Props> {
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
    this.mainStackContainer = createAppContainer(MainStackNavigator);
    return this.mainStackContainer;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 保存抽屉导航容器
    NavigationMainService.topDrawerNavigator = this.props.navigation;
    NavigationReactNativeService.topDrawerNavigator = this.props.navigation;
    // 配置状态栏为[dark-content]的页面数组
    const darkContentScreens = [

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

export default MainRNStackContainer;
