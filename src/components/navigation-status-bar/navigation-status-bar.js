import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar, View, Platform,
} from 'react-native';
import styles from './navigation-status-bar-styles';

export default class NavigationStatusBar extends Component {
  // 属性类型检查
  static propTypes = {
    hidden: PropTypes.bool,
    animated: PropTypes.bool,
    translucent: PropTypes.bool,
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['light-content', 'dark-content', 'default']),
  };

  // 属性默认值
  static defaultProps = {
    hidden: false,
    animated: true, // 指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor,barStyle,hidden
    barStyle: 'light-content', // enum('default', 'light-content', 'dark-content')
    backgroundColor: 'white',
    translucent: Platform.select({
      ios: true,
      android: false,
    }), // 指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”，被状态栏遮住一部分）。
  };

  /**
   * 渲染界面
   * @returns {*}
   */
  render() {
    const statusBar = !this.props.statusBar.hidden
      ? (
        <View style={styles.statusBar}>
          <StatusBar {...this.props.statusBar} />
        </View>
      ) : null;
    return (
      <View style={[styles.container, this.props.style ? this.props.style : null]}>
        {statusBar}
      </View>
    );
  }
}
