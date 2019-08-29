import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import {
  NavigationBar
} from '../../components';
import FavouriteTabScreen from './favourite-tab';

export const FAVOURITE_FLAGS = {
  FLAG_POPULEAR: 'FLAG_POPULEAR',
  FLAG_TRENDING: 'FLAG_TRENDING',
};

type Props = {};
class FavouriteScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.tabItems = ['最热', '趋势'];
    this.tabLabels = [FAVOURITE_FLAGS.FLAG_POPULEAR, FAVOURITE_FLAGS.FLAG_TRENDING];
  }

  /**
   * 配置头部标签页面
   */
  routeConfigMaterialTopTabItemScreens() {
    const tabs = {};
    const { theme } = this.props;
    this.tabItems.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <FavouriteTabScreen {...props} tabLabel={this.tabLabels[index]} theme={theme} />,
        navigationOptions: {
          title: item
        },
      };
    });
    return tabs;
  }

  /**
   * 创建头部标签容器
   * @returns {NavigationContainer}
   */
  renderMaterialTopTabNavigator() {
    if (this.props.theme !== this.theme || !this.topTabNavigator) {
      const routeConfigMap = this.routeConfigMaterialTopTabItemScreens();
      this.theme = this.props.theme;
      this.topTabNavigator = Object.keys(routeConfigMap).length
        ? createAppContainer(createMaterialTopTabNavigator(routeConfigMap,
          {
            tabBarOptions: {
              tabStyle: styles.tabStyle,
              upperCaseLabel: false, // 是否使标签大写，默认为true
              scrollEnabled: false, // 是否支持 选项卡滚动，默认false
              style: {
                height: 35,
                backgroundColor: this.props.theme.themeColor, // TabBar 的背景颜色
              },
              labelStyle: styles.labelStyle, // 文字的样式
              indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
            },
            lazy: true
          }))
        : null;
    }
    return this.topTabNavigator;
  }

  /**
   * 创建导航条控件
   * @returns {*}
   */
  renderNavigationBar() {
    // 状态栏
    const statusBar = {
      barStyle: 'light-content',
      backgroundColor: this.props.theme.themeColor,
    };
    // 导航条
    const navBar = {
      backgroundColor: this.props.theme.themeColor,
    };
    // 标题头
    const titleStyle = {
      color: 'white',
    };
    return (
      <NavigationBar
        title="收藏"
        hairline
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
      />
    );
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 导航和状态栏
    const navigationBar = this.renderNavigationBar();
    // 滚动的标签栏
    const TopTabNavigator = this.renderMaterialTopTabNavigator();
    return (
      <View style={styles.container}>
        {navigationBar}
        {TopTabNavigator && <TopTabNavigator />}
      </View>
    );
  }
}

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(FavouriteScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
  tabStyle: {

  },
  labelStyle: {
    marginTop: 0,
    fontSize: 16,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#ffffff'
  },
});
