import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import {
  StackViewStyleInterpolator
} from 'react-navigation-stack';
import {
  NavigationMainService,
  NavigationPopularService,
  RouterConst,
  System
} from '../common';
import MainPopularTabRootContainer from './MainPopularTabRootContainer';
import SearchModalScreen from '../screens/githubpopular/search/search-modal';
import ThemeCustomModalScreen from '../screens/githubpopular/theme/theme-custom-modal';

// 官网介绍
import IntroduceScreen from '../screens/githubpopular/introduce/introduce';
// 网页控件
import WebBrowserScreen from '../screens/githubpopular/browser/webbrowser';
// 标签设置
import MarksCustomScreen from '../screens/githubpopular/mycenter/marks/marks-custom';
// 标签排序
import MarksSortedScreen from '../screens/githubpopular/mycenter/marks/marks-sorted';
// 语言设置
import LanguagesCustomScreen from '../screens/githubpopular/mycenter/langus/langus-custom';
// 语言排序
import LanguagesSortedScreen from '../screens/githubpopular/mycenter/langus/langus-sorted';
// 关于程序
import AboutScreen from '../screens/githubpopular/mycenter/about/about';
// 关于作者
import AboutAuthorScreen from '../screens/githubpopular/mycenter/about/about-author';
// 最热详情
import PopularTabDetaiScreen from '../screens/githubpopular/popular/popular-tab-detail';
// 趋势详情
import TrendingTabDetaiScreen from '../screens/githubpopular/trending/trending-tab-detail';


/**
 * 主导航容器
 */
const AppMainStackNavigator = createStackNavigator(
  {
    RouterMainPopularTabContainer: {
      screen: MainPopularTabRootContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterIntroduceScreen: {
      screen: IntroduceScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterWebBrowserScreen: {
      screen: WebBrowserScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterMarksCustomScreen: {
      screen: MarksCustomScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterMarksSortedScreen: {
      screen: MarksSortedScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterLanguagesCustomScreen: {
      screen: LanguagesCustomScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterLanguagesSortedScreen: {
      screen: LanguagesSortedScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterAboutScreen: {
      screen: AboutScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterAboutAuthorScreen: {
      screen: AboutAuthorScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterPopularTabDetaiScreen: {
      screen: PopularTabDetaiScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    RouterTrendingTabDetaiScreen: {
      screen: TrendingTabDetaiScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: RouterConst.RouterMainPopularTabContainer,
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


/**
 * 栈导航器[Popular]
 * @type {NavigationContainer}
 */
const MainPopularStackNavigator = createStackNavigator(
  {
    RouterMainPopularStackContainer: AppMainStackNavigator,
    RouterSearchModalScreen: SearchModalScreen,
    RouterThemeCustomModalScreen: ThemeCustomModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


/**
 * Get the current screen from navigation state
 * @param navigationState
 * @returns {*}
 */
function getCurrentRouteName(navigationState: any) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}


type Props = {};
class MainPopularStackContainer extends Component<Props> {
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
  dynamicCreateMainStackContainer() {
    if (this.mainStackContainer) {
      return this.mainStackContainer;
    }
    this.mainStackContainer = createAppContainer(MainPopularStackNavigator);
    return this.mainStackContainer;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 保存抽屉导航容器
    NavigationMainService.topDrawerNavigator = this.props.navigation;
    NavigationPopularService.topDrawerNavigator = this.props.navigation;
    // 配置状态栏为[dark-content]的页面数组
    const darkContentScreens = [
      RouterConst.RouterIntroduceScreen,
    ];
    // 动态创建堆栈容器
    const AppMainStackContainer = this.dynamicCreateMainStackContainer();
    return (
      <AppMainStackContainer
        onNavigationStateChange={(prevState, currentState) => {
          const previousScene = getCurrentRouteName(prevState);
          const currentScene = getCurrentRouteName(currentState);
          if (previousScene !== currentScene) {
            if (darkContentScreens.indexOf(currentScene) >= 0) {
              StatusBar.setBarStyle('dark-content');
            } else {
              StatusBar.setBarStyle('light-content');
            }
          }
        }}
      />
    );
  }
}

export default MainPopularStackContainer;
