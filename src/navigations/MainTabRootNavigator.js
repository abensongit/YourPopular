
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createAppContainer, createBottomTabNavigator, BottomTabBar
} from 'react-navigation';

import IconOfIonicons from 'react-native-vector-icons/Ionicons';
import IconOfAntDesign from 'react-native-vector-icons/AntDesign';
import IconOfFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOfMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import EventBus from 'react-native-event-bus';
import * as EventTypes from '../common/EventTypes';

import PopularScreen from '../screens/popular/popular';
import TrendingScreen from '../screens/trending/trending';
import FavouriteScreen from '../screens/favourite/favourite';
import MyCenterScreen from '../screens/mycenter/mycenter';


const TAB_ITEM_ARR = {
  RouterPopularScreen: {
    screen: PopularScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <IconOfAntDesign
          name={focused ? 'github' : 'github'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  RouterTrendingScreen: {
    screen: TrendingScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <IconOfIonicons
          name={focused ? 'md-trending-up' : 'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  RouterFavouriteScreen: {
    screen: FavouriteScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <IconOfMaterialIcons
          name={focused ? 'favorite' : 'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  RouterMyCenterScreen: {
    screen: MyCenterScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <IconOfFontAwesome
          name={focused ? 'user-circle' : 'user-circle'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
};

class MainTabNavigator extends Component {
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
      RouterPopularScreen, RouterTrendingScreen, RouterFavouriteScreen, RouterMyCenterScreen
    } = TAB_ITEM_ARR;
    const tabItems = {
      RouterPopularScreen, RouterTrendingScreen, RouterFavouriteScreen, RouterMyCenterScreen
    };
    const tabNavigator = createBottomTabNavigator(tabItems, {
      tabBarComponent: props => <TabBarComponent theme={this.props.theme} {...props} />
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
      <AppMainTabContainer
        onNavigationStateChange={(prevState, newState, action) => {
          EventBus.getInstance().fireEvent(EventTypes.EVENT_BOTTOM_TAB_CHANGE_SELECT, {
            // 发送底部tab切换的事件
            from: prevState.index,
            to: newState.index
          });
        }}
      />
    );
  }
}

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

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

// 订阅 state
export default connect(AppMapStateToProps)(MainTabNavigator);
