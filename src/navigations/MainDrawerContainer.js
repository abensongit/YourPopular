import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  SafeAreaView, ScrollView, View,
} from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavDrawerSideMenu, RouterConst, System
} from '../common';
import {
  NavigationBar,
} from '../components';
import MainPopularStackContainer from './MainPopularStackContainer';
import MainMeiTuanStackContainer from './MainMeiTuanStackContainer';


/**
 * 路由配置
 * @type {*[]}
 */
const ROUTE_ARRAY = [
  {
    title: '主页',
    iconName: 'github',
    iconType: AntDesign,
    screen: MainPopularStackContainer,
    route: RouterConst.RouterDrawerPopularNavigator,
  },
  {
    title: '美团',
    iconName: 'alipay-circle',
    iconType: AntDesign,
    screen: MainMeiTuanStackContainer,
    route: RouterConst.RouterDrawerMeiTuanNavigator,
  },
  {
    title: '其它',
    iconName: 'google',
    iconType: AntDesign,
    screen: MainMeiTuanStackContainer,
    route: RouterConst.RouterDrawerOtherNavigator,
  },
];


type Props = {};
class MainDrawerContainer extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  /**
   * 配置抽屉
   */
  routeConfigMaps() {
    const maps = {};
    const { theme } = this.props;
    ROUTE_ARRAY.forEach((item, index) => {
      maps[item.route] = {
        screen: props => <item.screen {...props} theme={theme} />,
        navigationOptions: {
          drawerLabel: item.title,
          drawerIcon: ({ tintColor, focused }) => (
            <item.iconType
              style={{ color: tintColor }}
              size={24}
              name={focused ? item.iconName : item.iconName}
            />
          ),
        },
      };
    });
    return maps;
  }

  /**
   * 动态创建抽屉容器
   * @returns {NavigationContainer}
   */
  dynamicCreateMainDrawerContainer() {
    if (!this.mainDrawerContainer || this.props.theme !== this.theme) {
      this.theme = this.props.theme;
      const routeConfigMap = this.routeConfigMaps();
      const navigationBar = this.renderNavigationBar();
      const initialRouteName = RouterConst.RouterDrawerMeiTuanNavigator;
      this.mainDrawerContainer = createAppContainer(createDrawerNavigator(routeConfigMap,
        {
          initialRouteName,
          overlayColor: 'rgba(0,0,0,0.6)',
          contentOptions: {
            activeTintColor: this.props.theme.themeColor,
          },
          useNativeAnimations: true,
          drawerLockMode: 'unlocked',
          drawerWidth: System.window.width * 0.75,
          contentComponent: props => (
            <View style={{ backgroundColor: '#e9e9ee', flex: 1 }}>
              {navigationBar}
              <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                  {!navigationBar
                    ? (
                      <DrawerItems {...props} />
                    )
                    : (
                      <NavDrawerSideMenu {...props} theme={this.theme} items={ROUTE_ARRAY} initRoute={initialRouteName} />
                    )
                  }
                </SafeAreaView>
              </ScrollView>
            </View>
          ),
        }));
    }
    return this.mainDrawerContainer;
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
        title="常用组件"
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
    // 动态创建抽屉容器
    const AppMainDrawerContainer = this.dynamicCreateMainDrawerContainer();
    return (
      <AppMainDrawerContainer />
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MainDrawerContainer);
