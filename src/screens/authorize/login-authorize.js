import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, AsyncStorage, Image, ScrollView, StatusBar, View
} from 'react-native';
import { Images } from '../../resources';
import {
  NavigationService, RouterConst
} from '../../common';
import {
  TouchableOpacityButton
} from '../../components';
import styles from './login-authorize-styles';
import actions from '../../redux/actions';

type Props = {};
class LoginAuthorizeScreen extends Component<Props> {
  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 设置状态栏
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    this.navListener.remove();
    this.timer && clearTimeout(this.timer);
  }

  signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'UserTokenValue');
    NavigationService.navigate(RouterConst.RouterMainStackNavigator, this.props);
  };

  registerAsync = async () => {
    await AsyncStorage.setItem('userToken', 'UserTokenValue');
    NavigationService.navigate(RouterConst.RouterMainStackNavigator, this.props);
  };

  handleLoginAction = (completeHandle) => {
    this.timer = setTimeout(() => {
      completeHandle();
      Alert.alert('登录成功', '', [{ text: '确定' }]);
      this.signInAsync();
    }, 1500);
  };

  handleRegisterAction = (completeHandle) => {
    this.timer = setTimeout(() => {
      completeHandle();
      Alert.alert('注册成功', '', [{ text: '取消' }, { text: '确定' }]);
      this.registerAsync();
    }, 1500);
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'stretch' }}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image
              style={styles.icon_logo}
              source={Images.logo.ic_logo}
            />
          </View>
          <View style={styles.button_login}>
            <TouchableOpacityButton
              title="登 录"
              subTitle="正在登录..."
              backgroundColor={theme.themeColor}
              onPress={this.handleLoginAction}
            />
          </View>
          <View style={styles.button_register}>
            <TouchableOpacityButton
              title="注 册"
              subTitle="正在注册..."
              backgroundColor={theme.themeColor}
              onPress={this.handleRegisterAction}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(LoginAuthorizeScreen);
