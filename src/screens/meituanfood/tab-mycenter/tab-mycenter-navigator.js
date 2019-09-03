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

import TabMyCenterMainScreen from './mycenter';


/**
 * 栈导航器[MeiTuan-TabMyCenter]
 * @type {NavigationContainer}
 */
const TabMyCenterStackNavigator = createStackNavigator(
  {
    RouterMeiTuanTabMyCenterStackContainer: {
      screen: TabMyCenterMainScreen,
    },
  },
  {
    initialRouteName: RouterConst.RouterMeiTuanTabMyCenterStackContainer,
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
class TabMyCenterStackContainer extends Component<Props> {
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
    this.mainStackContainer = createAppContainer(TabMyCenterStackNavigator);
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

export default TabMyCenterStackContainer;
