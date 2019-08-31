import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import SeparatorLineView from '../spearator-line-view/spearator-line-view';
import { System } from '../../common';

type Props = {
  goToPage: PropTypes.func, // 跳转到对应tab的方法
  activeTab: PropTypes.number, // 当前被选中的tab下标
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  tabs: PropTypes.array, // 所有Tabs集合
  tabNames: PropTypes.array, // 保存Tab名称
  tabIconTypes: PropTypes.array, // 保存Tab图标类型
  tabIconNames: PropTypes.array, // 保存Tab图标名称
}

export default class ScrollableTabbar extends Component<Props> {
  // 属性类型检查
  static propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    tabs: PropTypes.array, // 所有Tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
    tabIconTypes: PropTypes.array, // 保存Tab图标
    tabIconNames: PropTypes.array, // 保存Tab图标
  };

  // 属性默认值
  static defaultProps = {
    backgroundColor: 'white',
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
  };

  // 处理TabBar的颜色和字体及图标
  renderTabItem(tab, index) {
    const { activeTextColor, inactiveTextColor } = this.props;
    const IconTypes = this.props.tabIconTypes[index];
    const IconNames = this.props.tabIconNames[index];
    const color = this.props.activeTab === index ? activeTextColor : inactiveTextColor; // 判断i是否是当前选中的tab，设置不同的颜色
    return (
      <TouchableOpacity
        key={`tabItem${index}`}
        style={styles.tab}
        onPress={() => this.props.goToPage(index)}
      >
        <View style={styles.tabItem}>
          {IconTypes && IconNames
            ? (
              <IconTypes
                name={IconNames}
                size={26}
                style={{ color }}
              />
            )
            : (
              <View style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: color,
              }}
              />
            )
          }
          <Text style={{ color, fontSize: 11, paddingTop: 5, }}>
            {this.props.tabNames[index]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { backgroundColor } = this.props;
    return (
      <View style={{ backgroundColor }}>
        <SeparatorLineView />
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, index) => this.renderTabItem(tab, index))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: System.window.tabBarDangerHeight,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    paddingTop: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
