import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, StatusBar, View, ViewPropTypes, Platform
} from 'react-native';
import styles from './navigation-bar.styles';

// 状态栏的属性
const StatusBarShape = {
  hidden: PropTypes.bool,
  animated: PropTypes.bool,
  translucent: PropTypes.bool,
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf(['light-content', 'dark-content', 'default']),
};

// 标题栏的属性
const TitleStyleShape = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
};

export default class NavigationBar extends Component {
  // 属性类型检查
  static propTypes = {
    hide: PropTypes.bool,
    hairline: PropTypes.bool,
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleStyle: PropTypes.shape(TitleStyleShape),
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    statusBar: PropTypes.shape(StatusBarShape),
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
  };

  // 属性默认值
  static defaultProps = {
    titleStyle: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    statusBar: {
      hidden: false,
      animated: true, // 指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor,barStyle,hidden
      barStyle: 'light-content', // enum('default', 'light-content', 'dark-content')
      backgroundColor: 'white',
      translucent: Platform.select({
        ios: true,
        android: false,
      }), // 指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”，被状态栏遮住一部分）。
    },
  };

  static getButtonElement(data) {
    return (
      <View style={styles.navBarButton}>
        {data || null}
      </View>
    );
  }

  render() {
    const statusBar = !this.props.statusBar.hidden
      ? (
        <View style={styles.statusBar}>
          <StatusBar {...this.props.statusBar} />
        </View>
      ) : null;

    const titleView = this.props.titleView
      ? this.props.titleView
      : <Text ellipsizeMode="head" numberOfLines={1} style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>;

    const content = this.props.hide ? null
      : (
        <View style={styles.navBar}>
          {NavigationBar.getButtonElement(this.props.leftButton)}
          <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
            {titleView}
          </View>
          {NavigationBar.getButtonElement(this.props.rightButton)}
        </View>
      );
    const hairline = this.props.hide || this.props.hairline ? null : (<View style={styles.spearatorLine} />);
    return (
      <View style={[styles.container, this.props.style ? this.props.style : null]}>
        {statusBar}
        {content}
        {hairline}
      </View>
    );
  }
}
