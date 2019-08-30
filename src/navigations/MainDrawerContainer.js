import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  SafeAreaView, ScrollView,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import IconOfAntDesign from 'react-native-vector-icons/AntDesign';
import MainPopularStackContainer from './MainPopularStackContainer';
import ThemeCustomModalScreen from '../screens/mycenter/theme/theme-custom-modal';


/**
 * 栈导航器[Popular]
 * @type {NavigationContainer}
 */
const MainPopularStackNavigator = createStackNavigator(
  {
    RouterMainPopularStackContainer: MainPopularStackContainer,
    RouterThemeCustomModalScreen: ThemeCustomModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


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
      this.mainDrawerContainer = createAppContainer(createDrawerNavigator(
        {
          RouterDrawerPopularNavigator: {
            screen: MainPopularStackNavigator,
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
            <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
              </SafeAreaView>
            </ScrollView>
          ),
        }
      ));
    }
    return this.mainDrawerContainer;
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
