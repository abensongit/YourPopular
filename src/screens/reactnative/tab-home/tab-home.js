import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InteractionManager,
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
  NavigationBar, RefreshListView, RefreshState,
} from '../../../components';
import JsonData from './tab-home-data';
import TabHomeCell from './tab-home-cell';
import { onLoad, onLoadMore } from './tab-home-action';

const PAGE_SIZE = 10;

type Props = {
  navigation: any,
}

type State = {
  pageSize: number,
  pageIndex: number,
  refreshState: number,
  dataSource: Array<Object>,
}

class TabHomeScreen extends Component<Props, State> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    const { theme } = this.props;
    this.props.navigation.setParams({
      theme,
    });
    this.state = {
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      dataSource: [],
      refreshState: RefreshState.Idle,
    };
  }


  /**
   * 组件渲染完成
   */
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.onHeaderRefresh();
    });
  }

  /**
   * 下拉刷新数据
   */
  onHeaderRefresh = () => {
    // 开始动画
    this.setState({
      pageIndex: 0,
      refreshState: RefreshState.HeaderRefreshing,
    });
    // 请求数据
    onLoad(JsonData, this.state.pageSize, (itemModels) => {
      if (itemModels.length > 0) {
        if (itemModels.length >= this.state.pageSize) {
          this.setState({
            pageIndex: 1,
            dataSource: itemModels,
            refreshState: RefreshState.Idle,
          });
        } else {
          this.setState({
            pageIndex: 1,
            dataSource: itemModels,
            refreshState: RefreshState.NoMoreData,
          });
        }
      } else {
        this.setState({
          pageIndex: 1,
          dataSource: itemModels,
          refreshState: RefreshState.EmptyData,
        });
      }
    });
  };

  /**
   * 上拉加载更多
   */
  onFooterRefresh = () => {
    // 开始动画
    this.setState({
      refreshState: RefreshState.FooterRefreshing,
    });
    // 请求数据
    const nextPageIndex = this.state.pageIndex + 1;
    onLoadMore(JsonData, nextPageIndex, this.state.pageSize, (itemModels) => {
      if (itemModels.length > 0) {
        const dataSource = [...this.state.dataSource, ...itemModels];
        if (itemModels.length >= this.state.pageSize) {
          this.setState({
            dataSource,
            pageIndex: nextPageIndex,
            refreshState: RefreshState.Idle,
          });
        } else {
          this.setState({
            dataSource,
            pageIndex: nextPageIndex,
            refreshState: RefreshState.NoMoreData,
          });
        }
      } else {
        this.setState({
          refreshState: RefreshState.EmptyData,
        });
      }
    });
  };

  /**
   * 渲染表格 => 主键
   */
  keyExtractor = (item: any, index: number) => index.toString();

  /**
   * 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
   */
  renderItem = (rowData: Object) => {
    const itemModel = rowData.item;
    return (
      <TabHomeCell
        info={itemModel}
        onPress={() => {

        }}
      />
    );
  };

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
        title="控件"
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
    const { theme } = this.props;
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
        <RefreshListView
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          ListHeaderComponent={this.renderHeader}
          // 可选
          tintColor={theme.tintColor}
          footerRefreshingText="玩命加载中 >.<"
          footerFailureText="我擦嘞，居然失败了 =.=!"
          footerNoMoreDataText="-我是有底线的-"
          footerEmptyDataText="-好像什么东西都没有-"
        />
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
