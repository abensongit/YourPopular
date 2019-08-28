import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, TouchableOpacity
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationService, RouterConst
} from '../../common';
import {
  NavigationBar
} from '../../components';
import PopularTabScreen from './popular-tab-screen';
import styles from './popular-styles';


type Props = {};
class PopularScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.preTabItems = [];
  }

  /**
   * 配置头部标签页面
   */
  routeConfigMaterialTopTabItemScreens() {
    const tabs = {};
    const { theme } = this.props;
    const tabItems = ['ALL', 'iOS', 'Android', 'Java'];
    this.preTabItems = tabItems;
    tabItems.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabScreen {...props} tabLabel={item} theme={theme} />,
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
              scrollEnabled: true, // 是否支持 选项卡滚动，默认false
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
   * 创建导航条按钮（右侧）
   * @returns {*}
   */
  renderNavBarRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingLeft: 5, paddingRight: 10, marginRight: 0
          }}
          onPress={() => {
            NavigationService.navigate(RouterConst.RouterIntroduceScreen);
          }}
        >
          <Feather
            name="search"
            size={22}
            style={{ alignSelf: 'center', color: 'white', }}
          />
        </TouchableOpacity>
      </View>
    );
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
        title="最热"
        hairline
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        rightButton={this.renderNavBarRightButton()}
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

export default connect(AppMapStateToProps)(PopularScreen);
