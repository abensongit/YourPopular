import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, StyleSheet, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  RouterConst,
  NavigationPopularService,
  BackHandlerComponent,
} from '../common';
import MainTabRootNavigator from './MainPopularTabRootNavigator';
import ThemeCustomScreen from '../screens/githubpopular/theme/theme-custom';


type Props = {};
class MainPopularTabRootContainer extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onHardwareBackPressAction });
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
    if (nav.routes[nav.index].routeName === RouterConst.RouterMainDrawerContainer) {
      BackHandler.exitApp();
    } else {
      dispatch(NavigationActions.back());
    }
    return true;
  };

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
    NavigationPopularService.topLevelNavigator = this.props.navigation;
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

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MainPopularTabRootContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
