import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RouterConst from './RouterConst';
import System from './System';
import { COLOR_BACKGROUND_WHITE } from './Variables';


type Props = {}
class NavDrawerSideMenu extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      routeIndex: 0,
    };
    this.items = [
      {
        navOptionName: '主页',
        navOptionIconType: AntDesign,
        navOptionThumb: 'github',
        screenToNavigate: RouterConst.RouterDrawerPopularNavigator,
      },
      {
        navOptionName: '美团',
        navOptionIconType: AntDesign,
        navOptionThumb: 'alipay-circle',
        screenToNavigate: RouterConst.RouterDrawerMeiTuanNavigator,
      },
      {
        navOptionName: '其它',
        navOptionIconType: AntDesign,
        navOptionThumb: 'google',
        screenToNavigate: RouterConst.RouterDrawerOtherNavigator,
      },
    ];
  }

  /**
   * 路由导航
   * @param route
   * @param index
   * @returns {Function}
   */
  navigateToScreen = (route, index) => () => {
    this.setState({
      routeIndex: index
    });
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.closeDrawer();
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.items.map((item, index) => {
            const focused = this.state.routeIndex === index;
            return (
              <View
                key={index.toString()}
                style={{ backgroundColor: focused ? '#E0DBDB' : COLOR_BACKGROUND_WHITE }}
              >
                <TouchableOpacity
                  style={styles.item}
                  onPress={this.navigateToScreen(item.screenToNavigate, index)}
                >
                  <item.navOptionIconType
                    size={28}
                    name={item.navOptionThumb}
                    style={[styles.icon, { color: focused ? theme.tintColor : '#767676' }]}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: focused ? 'bold' : 'normal',
                      color: focused ? theme.tintColor : '#262626',
                    }}
                  >
                    {item.navOptionName}
                  </Text>
                </TouchableOpacity>
                <View style={styles.line} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default NavDrawerSideMenu;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  line: {
    height: System.layout.onePixel,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
