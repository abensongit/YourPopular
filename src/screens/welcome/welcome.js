import React, { Component } from 'react';
import {
  Easing, Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View
} from 'react-native';
import {
  AnimatedCircularProgress
} from 'react-native-circular-progress';
import {
  NavigationService, RouterConst, System
} from '../../common';
import {
  NavigationBar,
} from '../../components';
import { Images } from '../../resources';
import styles from './welcome-styles';

const TIMEOUT_SECOND_VALUE = 5 * 1000;

type Props = {};
export default class WelcomeScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      fill: '跳过'
    };
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 倒计时定时器
    this.timer = setTimeout(() => {
      NavigationService.navigate(
        RouterConst.RouterAuthorizeScreen,
        this.props
      );
    }, TIMEOUT_SECOND_VALUE);
    // 倒计时圆形条
    this.circularProgress.animate(100, TIMEOUT_SECOND_VALUE, Easing.linear);
    // 状态栏的颜色
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      Platform.OS === 'android' ? StatusBar.setTranslucent(false) : ''; // 设置状态栏透明
      // Platform.OS === 'android' ? StatusBar.setBackgroundColor('rgba(0,0,0,0)', false) : ''; // 设置背景色透明
      StatusBar.setBarStyle('dark-content', true);
    });
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    this.navListener.remove();
    this.timer && clearTimeout(this.timer);
  }

  /**
   * 事件 - 跳过
   * @returns {Promise<void>}
   */
  doJumpOutAsync = async () => {
    await NavigationService.navigate(RouterConst.RouterAuthorizeScreen, this.props);
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
    const navigationBar = this.renderNavigationBar();
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: 'stretch' }}
      >
        {navigationBar}
        <View style={styles.container}>

          {/* 跳过 */}
          <TouchableOpacity
            style={styles.circleButton}
            onPress={this.doJumpOutAsync}
          >
            <AnimatedCircularProgress
              size={38}
              width={2}
              fill={this.state.fill}
              tintColor="#DB3529"
              ref={(ref) => { this.circularProgress = ref; }}
              backgroundColor="#F5F6F6"
              onAnimationComplete={
                () => console.log('onAnimationComplete')
              }
              style={styles.circleProgress}
              rotation={0}
            >
              {
                progress => (
                  <Text style={styles.circleTitle}>
                    { this.state.fill }
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </TouchableOpacity>

          {/* 广告 */}
          <Image
            style={styles.logo}
            source={Images.logo.ic_logo}
          />

        </View>
      </ScrollView>
    );
  }
}
