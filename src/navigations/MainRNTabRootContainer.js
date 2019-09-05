import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackHandler, StyleSheet, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  RouterConst,
  NavigationReactNativeService,
  BackHandlerComponent,
} from '../common';
import MainTabRootNavigator from './MainRNTabRootNavigator';


type Props = {};
class MainRNTabRootContainer extends Component<Props> {
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
   * 渲染页面
   * @returns {*}
   */
  render() {
    NavigationReactNativeService.topLevelNavigator = this.props.navigation;
    return (
      <View style={styles.container}>
        <MainTabRootNavigator />
      </View>
    );
  }
}

const AppMapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MainRNTabRootContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
