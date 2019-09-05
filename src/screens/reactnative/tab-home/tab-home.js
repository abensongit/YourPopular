import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationReactNativeService, RouterConst,
} from '../../../common';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';
import {
  NavigationBar,
} from '../../../components';


type Props = {};
class TabHomeScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor() {
    super();
    console.disableYellowBox = true;
  }


  /**
   * 创建导航条按钮（左侧）
   * @returns {*}
   */
  renderNavBarLeftButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingLeft: 10, paddingRight: 5, marginLeft: 0
          }}
          onPress={() => {
            NavigationReactNativeService.openDrawer();
          }}
        >
          <Feather
            name="menu"
            size={24}
            style={{ alignSelf: 'center', color: 'white', }}
          />
        </TouchableOpacity>
      </View>
    );
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
        title="首页"
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        leftButton={this.renderNavBarLeftButton()}
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

export default connect(AppMapStateToProps)(TabHomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
});
