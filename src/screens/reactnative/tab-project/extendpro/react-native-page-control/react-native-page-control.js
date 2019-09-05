import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View
} from 'react-native';
import PageControl from 'react-native-page-control';
import {
  Heading1, System
} from '../../../../../common';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../../../common/Variables';


type Props = {};
export default class ReactNativePageControlScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const title = navigation.getParam('title', '标题');
    const theme = navigation.getParam('theme', System.theme);
    return {
      title,
      headerStyle: {
        backgroundColor: theme.navBar.backgroundColor,
      },
      headerTintColor: theme.navBar.titleColor,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: theme.navBar.titleFontSize,
        fontWeight: theme.navBar.titleFontWeight,
      },
      headerRight: (
        <View />
      ),
    };
  };

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
    const offSetX = index * System.window.width;
    this.myScrollView.scrollTo({ x: offSetX, y: 0, animated: true });
  }

  /**
   * 颜色随机颜色
   */
  randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgba(${r},${g},${b},0.8)`;
    return color;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    const pageCount = 5;
    const itemScrollPages = [];
    for (let index = 0; index < pageCount; index++) {
      const itemScrollPage = (
        <View style={[styles.menuItemPage, { backgroundColor: this.randomColor() }]} key={index}>
          <Heading1>{index}</Heading1>
        </View>
      );
      itemScrollPages.push(itemScrollPage);
    }

    return (
      <ScrollView style={styles.container}>
        {/* 列表 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={event => this.onScroll(event)}
          ref={(view) => { this.myScrollView = view; }}
        >
          <View style={styles.menuContainer}>
            {itemScrollPages}
          </View>
        </ScrollView>
        {/* 指示标识 */}
        <PageControl
          style={styles.pageControl}
          numberOfPages={pageCount}
          currentPage={this.state.currentPage}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={theme.tintColor}
          indicatorSize={styles.pageControlIndicator}
          onPageIndicatorPress={index => this.onPageIndicatorTap(index)}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  menuItemPage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: System.window.width,
    height: 180,
  },
  pageControl: {
    margin: 10,
  },
  pageControlIndicator: {
    width: 7,
    height: 7,
  }
});
