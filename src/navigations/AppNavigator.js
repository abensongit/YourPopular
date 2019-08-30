import {
  connect
} from 'react-redux';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {
  RouterConst
} from '../common';
import WelcomeScreen from '../screens/githubpopular/welcome/welcome';
import AuthorizeScreen from '../screens/githubpopular/authorize/authorize';
import LoginAuthorizeScreen from '../screens/githubpopular/authorize/login-authorize';
import MainDrawerContainer from './MainDrawerContainer';

/**
 * 1.创建导航器
 */
export const AppRootNavigator = createSwitchNavigator(
  {
    RouterWelcomeScreen: {
      screen: WelcomeScreen
    },
    RouterAuthorizeScreen: {
      screen: AuthorizeScreen
    },
    RouterLoginAuthorizeScreen: {
      screen: LoginAuthorizeScreen
    },
    RouterMainDrawerContainer: {
      screen: MainDrawerContainer
    },
  },
  {
    initialRouteName: RouterConst.RouterWelcomeScreen
  }
);

/**
 * 2.设置根路由
 */
export const AppInitRouteName = RouterConst.RouterWelcomeScreen;

/**
 * 3.创建根组件
 */
export const AppRootContainer = createAppContainer(AppRootNavigator);

/**
 * 4.初始化 react-navigation 与 redux 的中间件，
 * 该方法的一个很大的作用就是为 createReduxContainer 的 key 设置 actionSubscribers (行为订阅者)
 * 设置订阅者 @https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在 @https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 */
export const AppMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root'
);

/**
 * 5.导航状态 State 到组件 Props 的映射关系
 * 接收所有 reducer 的总 state，返回一个 state 对象，
 * Redux 将这个 state 的内容放到 connect 包含的 AppNavigation 组件的 props 里。
 */
const AppMapStateToProps = state => ({
  state: state.nav,
});

/**
 * 6.将根导航器组件传递给 createReduxContainer 函数,
 * 并返回一个将 navigation state 和 dispatch 函数作为 props 的新组件；
 * 注意：要在 createReactNavigationReduxMiddleware 之后执行
 */
const AppWithNavigationState = createReduxContainer(AppRootContainer, 'root');

/**
 * 7.连接 React 组件与 Redux store
 */
export default connect(AppMapStateToProps)(AppWithNavigationState);
