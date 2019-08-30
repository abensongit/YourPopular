import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, Image
} from 'react-native';
import SeparatorLineView from '../spearator-line-view/spearator-line-view';
import { System } from '../../common';

type Props = {
  goToPage: Function, // 跳转到对应tab的方法
  activeTab: Number, // 当前被选中的tab下标
  tabs: Array<Object>, // 所有Tabs集合
  tabNames: Array<String>, // 保存Tab名称
  tabIconNormalNames: Array<Object>, // 保存Tab图标
  tabIconSelectNames: Array<Object>, // 保存Tab图标
}

export default class ScrollableTabbar extends Component<Props> {
  // 处理TabBar的颜色和字体及图标
  renderTabItem(tab, index) {
    const color = this.props.activeTab === index ? '#06c1ae' : '#979797'; // 判断i是否是当前选中的tab，设置不同的颜色
    const source = this.props.activeTab === index ? this.props.tabIconSelectNames[index] : this.props.tabIconNormalNames[index];
    return (
      <TouchableOpacity
        key={`tabItem${index}`}
        style={styles.tab}
        onPress={() => this.props.goToPage(index)}
      >
        <View style={styles.tabItem}>
          <Image
            style={styles.icon}
            source={source}
          />
          <Text style={{ color, fontSize: 11, }}>
            {this.props.tabNames[index]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 4,
    marginBottom: 3,
  },
});
