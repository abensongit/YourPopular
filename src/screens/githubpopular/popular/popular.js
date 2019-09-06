import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationMainService, NavigationPopularService, RouterConst
} from '../../../common';
import {
  NavigationBar
} from '../../../components';
import {
  ArrayUtil,
} from '../../../expand';
import PopularTabScreen from './popular-tab';
import actions from '../../../redux/actions';

type Props = {};
class PopularScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    const { onLoadMarks } = this.props;
    onLoadMarks();
    this.preTabItems = [];
  }

  /**
   * 配置头部标签页面
   */
  routeConfigMaterialTopTabItemScreens() {
    const tabs = {};
    const { tabItems, theme } = this.props;
    this.preTabItems = tabItems;
    tabItems.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => <PopularTabScreen {...props} tabLabel={item.name} theme={theme} />,
          navigationOptions: {
            title: item.name
          },
        };
      }
    });
    return tabs;
  }

  /**
   * 创建头部标签容器
   * @returns {NavigationContainer}
   */
  renderMaterialTopTabNavigator() {
    if (this.props.theme !== this.theme || !this.topTabNavigator || !ArrayUtil.isEqual(this.preTabItems, this.props.tabItems)) {
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
   * 创建导航条按钮（左侧）
   * @returns {*}
   */
  renderNavBarLeftButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingLeft: 10, paddingRight: 5, marginLeft: 0
          }}
          onPress={() => {
            NavigationMainService.openDrawer();
          }}
        >
          <Feather
            name="menu"
            size={24}
            style={{ alignSelf: 'center', color: 'white', }}
          />
        </TouchableOpacity>
      </View>
    );
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
            NavigationPopularService.navigate(RouterConst.RouterSearchModalScreen);
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
        leftButton={this.renderNavBarLeftButton()}
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
  tabItems: state.marks.marks,
});

const AppMapDispatchToProps = dispatch => ({
  onLoadMarks: () => dispatch(actions.onLoadMarks())
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(PopularScreen);


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
