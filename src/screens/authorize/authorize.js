import React, { Component } from 'react';
import {
  ActivityIndicator, AsyncStorage, View
} from 'react-native';
import {
  NavigationService, RouterConst
} from '../../common';
import styles from './authorize-styles';

type Props = {};
export default class AuthorizeScreen extends Component<Props> {
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
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }
}
