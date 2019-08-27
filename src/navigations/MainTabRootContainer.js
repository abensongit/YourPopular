
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, StyleSheet, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  RouterConst,
  NavigationService,
  BackHandlerComponent,
} from '../common';
import actions from '../redux/actions';
import MainTabRootNavigator from './MainTabRootNavigator';
import ThemeCustomScreen from '../screens/theme/theme-custom';


type Props = {};
class MainTabRootContainer extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onHardwareBackPressAction });
    // 初始化主题
    this.onThemeInit();
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onHardwareBackPressAction = () => {
    const { dispatch, nav } = this.props;
    if (nav.routes[nav.index].routeName === RouterConst.RouterMainStackNavigator) {
      BackHandler.exitApp();
    } else {
      dispatch(NavigationActions.back());
    }
    return true;
  };

  /**
   * 主题初始化
   */
  onThemeInit() {
    const { onThemeInit } = this.props;
    onThemeInit();
  }

  /**
   * 主题设置
   * @returns {*}
   */
  renderCustomThemeView() {
    const { themeChoiceViewVisible } = this.props;
    return (
      <ThemeCustomScreen
        {...this.props}
        visible={themeChoiceViewVisible}
      />
    );
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    NavigationService.topLevelNavigator = this.props.navigation;
    return (
      <View style={styles.container}>
        <MainTabRootNavigator />
        {this.renderCustomThemeView()}
      </View>
    );
  }
}

const AppMapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme.theme,
  themeChoiceViewVisible: state.theme.themeChoiceViewVisible,
});

const AppMapDispatchToProps = dispatch => ({
  onThemeInit: () => dispatch(actions.onThemeInit()),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MainTabRootContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
