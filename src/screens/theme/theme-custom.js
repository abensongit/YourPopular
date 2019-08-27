import React, { Component } from 'react';
import {
  Modal, ScrollView, TouchableHighlight, Text, View
} from 'react-native';
import { connect } from 'react-redux';
import ThemeDao from './theme-dao';
import * as actions from './theme-actions';
import styles from './theme-custom-styles';
import ThemeFactory, { ThemeFlags } from './theme-factory';


type Props = {};
class CustomThemeScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.themeDao = new ThemeDao();
  }

  /**
   * 事件 - 关闭页面
   */
  onHandleCloseTheme() {
    const { onShowThemeChoiceView } = this.props;
    onShowThemeChoiceView(false);
  }

  /**
   * 事件 - 选择主题
   * @param themeKey
   */
  onHandleSelectTheme(themeKey) {
    this.onHandleCloseTheme();
    this.themeDao.save(ThemeFlags[themeKey]);
    const { onThemeChange } = this.props;
    onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
  }

  /**
   * 创建主题Item
   * @param themeKey
   */
  renderThemeItem(themeKey) {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        underlayColor="white"
        onPress={() => this.onHandleSelectTheme(themeKey)}
      >
        <View style={[{ backgroundColor: ThemeFlags[themeKey] }, styles.themeItem]}>
          <Text style={styles.themeText}>{themeKey}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * 创建主题视图列表
   * @returns {Array}
   */
  renderThemeViews() {
    const views = [];
    for (let index = 0, keys = Object.keys(ThemeFlags), len = keys.length; index < len; index += 3) {
      const themeKey1 = keys[index];
      const themeKey2 = keys[index + 1];
      const themeKey3 = keys[index + 2];
      views.push(
        <View key={index} style={{ flexDirection: 'row' }}>
          {this.renderThemeItem(themeKey1)}
          {this.renderThemeItem(themeKey2)}
          {this.renderThemeItem(themeKey3)}
        </View>
      );
    }
    return views;
  }

  /**
   * 创建内容视图
   * @returns {*}
   */
  renderContentView() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => this.onHandleCloseTheme()}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            {this.renderThemeViews()}
          </ScrollView>
        </View>
      </Modal>
    );
  }

  /**
   * 渲染界面
   * @returns {*}
   */
  render() {
    return this.props.visible
      ? (
        <View style={styles.container}>
          {this.renderContentView()}
        </View>
      ) : null;
  }
}

const AppMapStateToProps = state => ({

});

const AppMapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
  onShowThemeChoiceView: visible => dispatch(actions.onShowThemeChoiceView(visible)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(CustomThemeScreen);
