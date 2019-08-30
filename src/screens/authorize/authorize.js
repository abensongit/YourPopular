import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, AsyncStorage, View
} from 'react-native';
import {
  NavigationService, RouterConst
} from '../../common';
import styles from './authorize-styles';
import actions from '../../redux/actions';

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
      NavigationService.navigate(userToken ? RouterConst.RouterMainStackNavigator : RouterConst.RouterLoginAuthorizeScreen, this.props);
    }, 500);
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    return (
      <View style={styles.container}>
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
