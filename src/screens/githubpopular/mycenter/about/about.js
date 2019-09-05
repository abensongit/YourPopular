import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import AboutComponent, { FLAG_ABOUT } from './about-component';
import {
  NavigationPopularService, RouterConst
} from '../../../../common';
import {
  ViewUtil
} from '../../../../expand';
import MENUS from '../mycenter-data';
import { JsonConfig } from '../../../../resources';


type Props = {};
class AboutScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutComponent({
      ...this.params,
      navigation: this.props.navigation,
      flagAbout: FLAG_ABOUT.FLAG_ABOUT,
    }, data => this.setState({ ...data }));
    // 配置数据源
    this.state = {
      data: JsonConfig,
    };
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount();
  }

  componentWillUnmount() {
    this.aboutCommon.componentWillUnmount();
  }

  /**
   * 点击表格事件
   * @param menu
   */
  onClickItemMenu(menu) {
    const { theme } = this.props;
    let routerName;
    let params = { theme };
    switch (menu) {
      case MENUS.Tutorial: {
        routerName = RouterConst.RouterWebBrowserScreen;
        params = {
          title: '教程',
          url: 'https://coding.m.imooc.com/classindex.html?cid=304',
        };
        break;
      }
      case MENUS.AboutAuthor: {
        routerName = RouterConst.RouterAboutAuthorScreen;
        break;
      }
      case MENUS.FeedbackInfo: {
        const url = 'mailto://crazycodeboy@gmail.com';
        Linking.canOpenURL(url)
          .then((support) => {
            if (!support) {
              console.log(`Can't handle url: ${url}`);
            } else {
              Linking.openURL(url);
            }
          })
          .catch((e) => {
            console.error('An error occurred', e);
          });
        break;
      }
      default: {
        routerName = RouterConst.RouterWebBrowserScreen;
        params = {
          title: '百度一下',
          url: 'https://www.baidu.com',
        };
        break;
      }
    }
    if (routerName) {
      NavigationPopularService.navigate(routerName, params);
    }
  }

  /**
   * 生成菜单
   * @param itemMenu
   * @returns {*}
   */
  renderMenu(itemMenu) {
    const { theme } = this.props;
    return ViewUtil.renderMenuItem(itemMenu, theme.themeColor, () => this.onClickItemMenu(itemMenu));
  }

  render() {
    const content = (
      <View>
        {this.renderMenu(MENUS.Tutorial)}
        <View style={styles.spearatorLine} />
        {this.renderMenu(MENUS.AboutAuthor)}
        <View style={styles.spearatorLine} />
        {this.renderMenu(MENUS.FeedbackInfo)}
      </View>
    );
    return this.aboutCommon.render(content, this.state.data.app);
  }
}

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(AboutScreen);


const styles = StyleSheet.create({
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
