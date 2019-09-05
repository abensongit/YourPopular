import React, { Component } from 'react';
import { StyleSheet, View, Linking, Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
  NavigationPopularService, RouterConst
} from '../../../../common';
import {
  ViewUtil
} from '../../../../expand';
import { JsonConfig } from '../../../../resources';
import AboutComponent, { FLAG_ABOUT } from './about-component';


type Props = {};
class AboutMeScreen extends Component<Props> {
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
      flagAbout: FLAG_ABOUT.FLAG_ABOUT_ME,
    }, data => this.setState({ ...data }));
    // 配置数据源
    this.state = {
      data: JsonConfig,
      showTutorial: false,
      showBlog: false,
      showQQ: false,
      showContact: false
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
    if (!menu) return;
    const { theme } = this.props;
    let routerName;
    let params = { theme };
    if (menu.url) {
      routerName = RouterConst.RouterWebBrowserScreen;
      params = {
        title: menu.title,
        url: menu.url,
      };
    }
    if (menu.account && menu.account.indexOf('@') > -1) {
      const url = `mailto://${menu.account}`;
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
      return;
    }
    if (menu.account) {
      Clipboard.setString(menu.account);
      Toast.show(`${menu.title + menu.account}已复制到剪切板。`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
          // calls on toast is appear animation start
        },
        onShown: () => {
          // calls on toast is appear animation end.
        },
        onHide: () => {
          // calls on toast is hide animation start.
        },
        onHidden: () => {
          // calls on toast is hide animation end.
        }
      });
      return;
    }
    if (routerName) {
      NavigationPopularService.navigate(routerName, params);
    }
  }

  /**
   * 分组表格-标题
   * @param data
   * @param isShow
   * @param key
   * @returns {*}
   * @private
   */
  renderGroup(data, isShow, key) {
    const { theme } = this.params;
    const value = this.state[key];
    return ViewUtil.renderCellItem(data.name, theme.themeColor, Ionicons, data.icon, () => {
      this.setState({
        [key]: !value
      });
    }, isShow ? 'ios-arrow-up' : 'ios-arrow-down');
  }

  /**
   * 分组表格-内容
   * @param dict
   * @param isShowAccount
   */
  renderGroupItems(items, isShowAccount) {
    if (!items) return null;
    const { theme } = this.params;
    const views = [];

    for (const index in items) {
      const title = isShowAccount ? `${items[index].title}:${items[index].account}` : items[index].title;
      views.push(
        <View key={index}>
          {ViewUtil.renderCellItem(title, theme.themeColor, null, null, () => this.onClickItemMenu(items[index]),)}
          <View style={styles.spearatorLine} />
        </View>
      );
    }
    return views;
  }

  render() {
    const content = (
      <View>
        {/* 教程 */}
        {this.renderGroup(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
        <View style={styles.spearatorLine} />
        {this.state.showTutorial ? this.renderGroupItems(this.state.data.aboutMe.Tutorial.items) : null}

        {/* 博客 */}
        {this.renderGroup(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
        <View style={styles.spearatorLine} />
        {this.state.showBlog ? this.renderGroupItems(this.state.data.aboutMe.Blog.items) : null}

        {/* 交流 */}
        {this.renderGroup(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
        <View style={styles.spearatorLine} />
        {this.state.showQQ ? this.renderGroupItems(this.state.data.aboutMe.QQ.items, true) : null}

        {/* 联系 */}
        {this.renderGroup(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
        <View style={styles.spearatorLine} />
        {this.state.showContact ? this.renderGroupItems(this.state.data.aboutMe.Contact.items, true) : null}
      </View>
    );
    return this.aboutCommon.render(content, this.state.data.author);
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(AboutMeScreen);


const styles = StyleSheet.create({
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
