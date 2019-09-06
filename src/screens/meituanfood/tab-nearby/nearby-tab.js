import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, Platform, StyleSheet, View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {
  COLOR_BACKGROUND_WHITE, NavigationMeiTuanService, RouterConst, System
} from '../../../common';
import {
  RefreshListView, RefreshState,
} from '../../../components';
import { JsonMeiTuan } from '../../../resources';
import * as actions from './nearby-tab-actions';
import NearbyTabHeader from './nearby-tab-header';
import GoodsTableItemCell from '../goods-detail/goods-table-item-cell';

const PAGE_SIZE = 10;

type Props = {}
class TabNearbyTabScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.props.navigation.setParams({
      theme,
    });
    this.state = {
      typeIndex: 0,
      typeLoading: false,
    };
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 首页加载数据
    this.onHeaderRefresh();
  }

  /**
   * 下拉刷新数据
   */
  onHeaderRefresh = () => {
    const { onRefreshMeiTuanNearby } = this.props;
    onRefreshMeiTuanNearby(JsonMeiTuan.url, PAGE_SIZE, (message) => {
      // 不显示菊花
      this.setState({
        typeLoading: false,
      });
    });
  };

  /**
   * 上拉加载更多
   */
  onFooterRefresh = () => {
    const { onLoadMoreMeiTuanNearby } = this.props;
    const store = this.store();
    onLoadMoreMeiTuanNearby(JsonMeiTuan.url, ++store.pageIndex, PAGE_SIZE, store.items, (message) => {
      Toast.show(message, {
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
    });
  };

  /**
   * 事件 - 商品
   * @param goods
   */
  onSelectedCellGoods = (goods: Object) => {
    const { theme } = this.props;
    NavigationMeiTuanService.navigate(
      RouterConst.RouterMeiTuanGoodsDetailScreen, {
        title: goods.title,
        goodsInfo: goods,
        theme,
      }
    );
  };

  /**
   * 渲染表格 => 主键
   */
  keyExtractor = (item: any, index: number) => index.toString();

  /**
   * 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
   */
  renderItem = (rowData: Object) => {
    const { theme } = this.props;
    const itemModel = rowData.item;
    return (
      <GoodsTableItemCell
        theme={theme}
        goodsModel={itemModel.data}
        onSelect={this.onSelectedCellGoods}
      />
    );
  };

  /**
   * 渲染表格 => 表头
   */
  renderHeader = () => (
    <NearbyTabHeader
      titles={this.props.types}
      selectedIndex={this.state.typeIndex}
      onPressSelected={(index) => {
        if (index !== this.state.typeIndex) {
          // 更新选中标签状态
          this.setState({
            typeIndex: index,
            typeLoading: true,
          });
          // 刷新请求数据
          this.onHeaderRefresh();
        }
      }}
    />
  );

  /**
   * 获取数据容器
   * @returns {*}
   */
  store() {
    const { store } = this.props;
    if (!store) {
      return {
        items: [],
        refreshState: RefreshState.HeaderRefreshing,
      };
    }
    return store;
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const store = this.store();
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        <RefreshListView
          data={store.items}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshState={store.refreshState}
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
        {
          store.refreshState === RefreshState.HeaderRefreshing && Platform.OS === System.IOS && this.state.typeLoading
            ? (
              <View style={styles.activityContainer}>
                <View style={styles.activityIndicator}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              </View>
            ) : null
        }
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
  store: state.meiTuanNearby,
});

const AppMapDispatchToProps = dispatch => ({
  onRefreshMeiTuanNearby: (url, pageSize, callBack) => dispatch(actions.onRefreshMeiTuanNearby(url, pageSize, callBack)),
  onLoadMoreMeiTuanNearby: (url, pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMoreMeiTuanNearby(url, pageIndex, pageSize, dataArray, callBack)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabNearbyTabScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  activityContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    width: System.window.width * 0.2,
    height: System.window.width * 0.2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
