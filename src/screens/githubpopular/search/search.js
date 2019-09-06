import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View
} from 'react-native';
import Toast from 'react-native-root-toast';
import {
  NavigationPopularService, RouterConst, COLOR_BACKGROUND_DEFAULT
} from '../../../common';
import {
  RefreshListView, RefreshState, NavigationBar
} from '../../../components';
import {
  SysUtil
} from '../../../expand';
import actions from '../../../redux/actions';
import SearchTableCell from './search-table-cell';
import PopularFavouriteDao from '../popular/popular-favourite-dao';

const PAGE_SIZE = 10;


type Props = {};
class SearchModalScreen extends Component<Props> {
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
        <View style={styles.content} />
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(SearchModalScreen);


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
