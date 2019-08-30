import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, AsyncStorage, Platform, View,
} from 'react-native';
import {
  NavigationMainService, RouterConst, System,
} from '../../common';
import {
  NavigationBar,
} from '../../components';
import styles from './authorize-styles';

type Props = {};
class AuthorizeScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    this.bootstrapAsync();
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.timer = setTimeout(() => {
      NavigationMainService.navigate(userToken ? RouterConst.RouterMainDrawerNavigator : RouterConst.RouterLoginAuthorizeScreen, this.props);
    }, 0);
  };

  /**
   * 创建导航条控件
   * @returns {*}
   */
  renderNavigationBar() {
    const statusBar = {
      barStyle: 'dark-content',
      backgroundColor: '#ffffff',
    };
    const navigationBar = Platform.OS === System.IOS ? null
      : (
        <NavigationBar
          hide
          statusBar={statusBar}
        />
      );
    return navigationBar;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
        <ActivityIndicator size="large" color={theme.themeColor} />
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(AuthorizeScreen);
