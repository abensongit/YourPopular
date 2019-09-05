import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createAppContainer, createBottomTabNavigator, BottomTabBar
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import TabHomeScreen from '../screens/reactnative/tab-home/tab-home';
import TabProjectScreen from '../screens/reactnative/tab-project/tab-project';
import TabSettingScreen from '../screens/reactnative/tab-setting/tab-setting';


/**
 * 配置 Tabbar RouteConfigMap
 */
const TAB_ITEM_ARR = {
  RouterRNTabHomeScreen: {
    screen: TabHomeScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '控件',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-basketball' : 'ios-basketball'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  RouterRNTabProjectScreen: {
    screen: TabProjectScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '项目',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-list-box' : 'ios-list-box'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  RouterRNTabSettingScreen: {
    screen: TabSettingScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '设置',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-options' : 'ios-options'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
};


/**
 * 创建 TabBarComponent 控件
 */
class TabBarComponent extends Component {
  render() {
    return (
      <BottomTabBar
        {... this.props}
        activeTintColor={this.props.theme.themeColor}
      />
    );
  }
}

/**
 * 创建 MainTabNavigator 控件
 */
type Props = {};
class MainTabNavigator extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  /**
   * 动态创建底部容器
   * @returns {NavigationContainer}
   */
  dynamicCreateMainTabContainer() {
    // 如果已存在，则返回
    if (this.mainTabContainer) {
      return this.mainTabContainer;
    }
    // 动态配置底部标签栏
    const {
      RouterRNTabHomeScreen, RouterRNTabProjectScreen, RouterRNTabSettingScreen
    } = TAB_ITEM_ARR;
    const tabItems = {
      RouterRNTabHomeScreen, RouterRNTabProjectScreen, RouterRNTabSettingScreen
    };
    const tabNavigator = createBottomTabNavigator(tabItems, {
      tabBarComponent: props => <TabBarComponent {...props} theme={this.props.theme} />
    });
    // 保存创建底部容器
    this.mainTabContainer = createAppContainer(tabNavigator);
    return this.mainTabContainer;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const AppMainTabContainer = this.dynamicCreateMainTabContainer();
    return (
      <AppMainTabContainer />
    );
  }
}

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(AppMapStateToProps)(MainTabNavigator);
