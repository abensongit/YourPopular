
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationService, RouterConst
} from '../../common';
import {
  NavigationBar
} from '../../components';
import {
  ViewUtil
} from '../../expand';
import actions from '../../redux/actions';
import styles from './mycenter.styles';
import MENUS from './mycenter-data';


type Props = {};
class MyCenterScreen extends Component<Props> {
  /**
   * 点击表格事件
   * @param menu
   */
  onClickMenuItem(menu) {
    const { theme } = this.props;
    let routerName;
    const params = { theme };
    switch (menu) {
      case MENUS.About: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.Tutorial: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.PopularSetting: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.PopularSortKey: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.PopularRemoveKey: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.LanguageSetting: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.LanguageSortKey: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      case MENUS.ThemeSetting: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
      default: {
        routerName = RouterConst.RouterIntroduceScreen;
        break;
      }
    }
    if (routerName) {
      NavigationService.navigate(routerName, params);
    }
  }

  /**
   * 创建导航条按钮（右侧）
   * @returns {*}
   */
  renderNavBarRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingHorizontal: 5,
          }}
          onPress={() => {
            Alert.alert('分享', '', [{ text: '取消' }, { text: '确定' }]);
          }}
        >
          <Feather
            name="share-2"
            size={22}
            style={{ alignSelf: 'center', color: 'white', }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingLeft: 5, paddingRight: 10, marginRight: 0
          }}
          onPress={() => {
            Alert.alert('设置', '', [{ text: '取消' }, { text: '确定' }]);
          }}
        >
          <Feather
            name="settings"
            size={22}
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
        title="我的"
        hairline
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        rightButton={this.renderNavBarRightButton()}
      />
    );
  }

  /**
   * 生成菜单
   * @param itemMenu
   * @returns {*}
   */
  renderMenu(itemMenu) {
    const { theme } = this.props;
    return ViewUtil.renderMenuItem(itemMenu, theme.themeColor, () => this.onClickMenuItem(itemMenu));
  }

  /**
   * 渲染界面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          {/* 关于 */}
          <TouchableOpacity
            style={styles.menuItemAbout}
            onPress={() => this.onClickMenuItem(MENUS.About)}
          >
            <View style={styles.menuItemAboutLeft}>
              <Ionicons
                name={MENUS.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: theme.themeColor,
                }}
              />
              <Text>GitHub Popular</Text>
            </View>
            <Ionicons
              name="ios-arrow-forward"
              size={22}
              style={{
                alignSelf: 'center',
                color: theme.themeColor,
              }}
            />
          </TouchableOpacity>
          <View style={styles.spearatorLine} />

          {/* 教程 */}
          {this.renderMenu(MENUS.Tutorial)}

          {/* 最热管理 */}
          <Text style={styles.groupTitle}>最热管理</Text>
          {/* 标签设置 */}
          {this.renderMenu(MENUS.PopularSetting)}
          {/* 标签排序 */}
          <View style={styles.spearatorLine} />
          {this.renderMenu(MENUS.PopularSortKey)}
          {/* 标签移除 */}
          <View style={styles.spearatorLine} />
          {this.renderMenu(MENUS.PopularRemoveKey)}

          {/* 趋势管理 */}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/* 语言设置 */}
          {this.renderMenu(MENUS.LanguageSetting)}
          {/* 语言排序 */}
          <View style={styles.spearatorLine} />
          {this.renderMenu(MENUS.LanguageSortKey)}

          {/* 设置 */}
          <Text style={styles.groupTitle}>设置</Text>
          {/* 自定义主题 */}
          {this.renderMenu(MENUS.ThemeSetting)}
          {/* 关于作者 */}
          <View style={styles.spearatorLine} />
          {this.renderMenu(MENUS.AboutAuthor)}
          <View style={styles.spearatorLine} />
          {/* 反馈 */}
          {this.renderMenu(MENUS.FeedbackInfo)}
          <View style={styles.spearatorLine} />
          {this.renderMenu(MENUS.CodePush)}

        </ScrollView>
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({
  onShowThemeChoiceView: visible => dispatch(actions.onShowThemeChoiceView(visible)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MyCenterScreen);
