import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import PageControl from 'react-native-page-control';
import { System } from '../../../common';
import HomeMenuCellItem from './home-menu-cell-item';

type Props = {
  menuInfos: Array<Object>,
  onSelect: Function,
}

type State = {
  currentPage: number
}

class HomeMenuCell extends Component<Props, State> {
  /**
   * 构造函数
   */
  constructor(props: Object) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  /**
   * 滚动事件 => ScrollView
   */
  onScroll(event: any) {
    const { x } = event.nativeEvent.contentOffset;
    const currentPage = Math.round(x / System.window.width);

    console.log(`onScroll  ${event.nativeEvent.contentOffset.x}  page ${currentPage}  current ${this.state.currentPage}`);

    if (this.state.currentPage !== currentPage) {
      this.setState({
        currentPage
      });
    }
  }

  /**
   * 标识事件 => pageControl
   */
  onPageIndicatorTap(index:number) {
    console.log(`currentPage ${this.state.currentPage} Index ${index}  `);
    if (this.state.currentPage !== index) {
      this.setState({
        currentPage: index
      });
    }
    // X是水平方向
    // Y是垂直方向
    const offSetX = index * Layout.window.width;
    this.myScrollView.scrollTo({ x: offSetX, y: 0, animated: true });
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { menuInfos, onSelect } = this.props;
    // 菜单Item列表
    const menuItems = menuInfos.map(
      (info, index) => (
        <HomeMenuCellItem
          key={info.title}
          title={info.title}
          icon={info.icon}
          onPress={() => {
            onSelect && onSelect(info, index);
          }}
        />
      )
    );
    // 菜单View列表
    const menuItemPages = [];
    const pageCount = Math.ceil(menuItems.length / 10); // 向上取整
    for (let i = 0; i < pageCount; i++) {
      const pageItems = menuItems.slice(i * 10, i * 10 + 10);
      const menuItemPage = (
        <View style={styles.menuItemPage} key={i}>
          {pageItems}
        </View>
      );
      menuItemPages.push(menuItemPage);
    }

    return (
      <View style={styles.container}>
        {/* 菜单列表 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={event => this.onScroll(event)}
          ref={(view) => { this.myScrollView = view; }}
        >
          <View style={styles.menuContainer}>
            {menuItemPages}
          </View>
        </ScrollView>
        {/* 指示标识 */}
        <PageControl
          style={styles.pageControl}
          numberOfPages={pageCount}
          currentPage={this.state.currentPage}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={System.theme.tintColor}
          indicatorSize={styles.pageControlIndicator}
          onPageIndicatorPress={index => this.onPageIndicatorTap(index)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: System.theme.backgroundColor,
  },
  menuContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  menuItemPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: System.window.width,
  },
  pageControl: {
    margin: 10,
  },
  pageControlIndicator: {
    width: 7,
    height: 7,
  }
});


export default HomeMenuCell;
