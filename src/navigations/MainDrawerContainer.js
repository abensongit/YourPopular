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
import IconOfAntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavigationBar,
} from '../components';
import MainPopularStackContainer from './MainPopularStackContainer';


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
   * 动态创建抽屉容器
   * @returns {NavigationContainer}
   */
  dynamicCreateMainDrawerContainer() {
    if (!this.mainDrawerContainer || this.props.theme !== this.theme) {
      this.theme = this.props.theme;
      const navigationBar = this.renderNavigationBar();
      this.mainDrawerContainer = createAppContainer(createDrawerNavigator(
        {
          RouterDrawerPopularNavigator: {
            screen: MainPopularStackContainer,
            navigationOptions: {
              drawerLabel: '主页',
              drawerIcon: ({ tintColor }) => (
                <IconOfAntDesign
                  name="zhihu"
                  size={24}
                  style={{ color: tintColor }}
                />
              ),
            },
          },
        }, {
          contentOptions: {
            activeTintColor: this.props.theme.themeColor,
          },
          contentComponent: props => (
            <View style={{ backgroundColor: '#e9e9ee', flex: 1 }}>
              {navigationBar}
              <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                  <DrawerItems {...props} />
                </SafeAreaView>
              </ScrollView>
            </View>
          ),
        }
      ));
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
