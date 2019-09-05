import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View,
} from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';
import {
  NavigationBar,
} from '../../../components';


type Props = {};
class TabProjectScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  /**
   * 创建导航条控件
   * @returns {*}
   */
  renderNavigationBar() {
    // 状态栏
    const statusBar = {
      barStyle: 'light-content',
      backgroundColor: this.props.theme.tintColor,
    };
    // 导航条
    const navBar = {
      backgroundColor: this.props.theme.tintColor,
    };
    // 标题头
    const titleStyle = {
      color: 'white',
    };
    return (
      <NavigationBar
        title="项目"
        style={navBar}
        statusBar={statusBar}
        titleStyle={titleStyle}
      />
    );
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(AppMapStateToProps)(TabProjectScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
});
