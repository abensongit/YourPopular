import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import {
  StackViewStyleInterpolator
} from 'react-navigation-stack';
import {
  RouterConst, System
} from '../../../common';

import TabNearbyMainScreen from './nearby';


/**
 * 栈导航器[MeiTuan-TabNearby]
 * @type {NavigationContainer}
 */
const TabNearbyStackNavigator = createStackNavigator(
  {
    RouterMeiTuanTabNearbyStackContainer: {
      screen: TabNearbyMainScreen,
    },
  },
  {
    initialRouteName: RouterConst.RouterMeiTuanTabNearbyStackContainer,
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


type Props = {};
class TabNearbyStackContainer extends Component<Props> {
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
  dynamicCreateTabHomeStackContainer() {
    if (this.mainStackContainer) {
      return this.mainStackContainer;
    }
    this.mainStackContainer = createAppContainer(TabNearbyStackNavigator);
    return this.mainStackContainer;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 动态创建堆栈容器
    const AppStackContainer = this.dynamicCreateTabHomeStackContainer();
    return (
      <AppStackContainer />
    );
  }
}

export default TabNearbyStackContainer;
