import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, StatusBar, StyleSheet, View
} from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';
import {
  NavigationBar
} from '../../../components';


type Props = {};
class ThemeCustomModalScreen extends Component<Props> {
  /**
   * 组件渲染完成
   */
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    this.navListener.remove();
  }


  /**
   * 创建导航条控件
   * @returns {*}
   */
  renderNavigationBar() {
    // 状态栏
    const statusBar = {
      barStyle: 'light-content',
      backgroundColor: this.props.theme.themeColor,
    };
    // 导航条
    const navBar = {
      backgroundColor: this.props.theme.themeColor,
    };
    // 标题头
    const titleStyle = {
      color: 'white',
    };
    return (
      <NavigationBar
        title="自定义主题"
        statusBar={statusBar}
        style={navBar}
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
        <View style={styles.content}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="自定义主题-关闭"
          />
        </View>
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(ThemeCustomModalScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
});
