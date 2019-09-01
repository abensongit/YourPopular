import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, DeviceEventEmitter
} from 'react-native';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import {
  RouterConst,
  NavigationPopularService,
  EventTypes,
  EventDeviceTypes,
} from '../../../common';
import {
  RefreshListView, RefreshState
} from '../../../components';
import {
  SysUtil
} from '../../../expand';
import * as actions from './trending-actions';
import TrendingTabCell from './trending-tab-cell';
import TrendingFavouriteDao from './trending-favourite-dao';

const PAGE_SIZE = 10;
const NETWORK_URL = 'https://github.com/trending/';
const TRENDING_FAVOURITE_DAO = new TrendingFavouriteDao();

type Props = {};
class TrendingTabScreen extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel, timeSpan } = this.props;
    this.storeName = tabLabel;
    this.timeSpan = timeSpan;
    this.isFavouriteChanged = false;
  }

  componentDidMount() {
    // 首页加载数据
    this.onHeaderRefresh();
    // 监听条件变化
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(
      EventDeviceTypes.EVENT_TYPE_TRENDING_TIME_SPAN_CHANGE,
      (timeSpan) => {
        if (timeSpan.showText !== this.timeSpan.showText) {
          this.timeSpan = timeSpan;
          this.onHeaderRefresh();
        }
      }
    );
    // 添加监听函数
    EventBus.getInstance().addListener(EventTypes.EVENT_FAVOURITE_CHANGED_TRENDING, this.favoriteChangeListener = () => {
      this.isFavouriteChanged = true;
    });
    EventBus.getInstance().addListener(EventTypes.EVENT_BOTTOM_TAB_CHANGE_SELECT, this.bottomTabSelectListener = (data) => {
      if (data.to === 1 && this.isFavouriteChanged) {
        const { onFlushTrendingFavourite } = this.props;
        const store = this.store();
        onFlushTrendingFavourite(this.storeName, store.pageIndex, PAGE_SIZE, store.items, TRENDING_FAVOURITE_DAO);
      }
    });
  }

  componentWillUnmount() {
    // 释放监听资源
    if (this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove();
    }
    // 释放监听资源
    EventBus.getInstance().removeListener(this.favoriteChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }

  // 下拉刷新
  onHeaderRefresh = () => {
    const { onRefreshTrending } = this.props;
    const url = this.genFetchUrl(this.storeName);
    onRefreshTrending(this.storeName, url, PAGE_SIZE, TRENDING_FAVOURITE_DAO);
  };

  // 上拉加载
  onFooterRefresh = () => {
    const { onLoadMoreTrending } = this.props;
    const store = this.store();
    onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, TRENDING_FAVOURITE_DAO, () => {
      Toast.show('没有更多数据了', {
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

  // 渲染表格
  keyExtractor = (item: any, index: number) => index.toString();

  // 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
  renderItem = (rowData: Object) => {
    const { theme } = this.props;
    return (
      <TrendingTabCell
        theme={theme}
        projectModel={rowData.item}
        onSelect={(callback) => {
          NavigationPopularService.navigate(
            RouterConst.RouterTrendingTabDetaiScreen,
            {
              projectModel: rowData.item,
              callback, // 详情页面更新 ItemCell 的收藏状态
            }
          );
        }}
        onFavourite={(item, isFavourite) => {
          SysUtil.onFavouriteTrending(item, isFavourite, TRENDING_FAVOURITE_DAO);
        }}
      />
    );
  };

  genFetchUrl(key) {
    return `${NETWORK_URL + key}?${this.timeSpan.searchText}`;
  }

  store() {
    const { trending } = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        projectModels: [],
        refreshState: RefreshState.Idle,
      };
    }
    return store;
  }

  render() {
    const store = this.store();
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        <RefreshListView
          data={store.projectModels}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshState={store.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          // 可选
          tintColor={theme.themeColor}
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
  trending: state.trending
});

const AppMapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize, favouriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favouriteDao)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack)),
  onFlushTrendingFavourite: (storeName, pageIndex, pageSize, dataArray, favouriteDao) => dispatch(actions.onFlushTrendingFavourite(storeName, pageIndex, pageSize, dataArray, favouriteDao)),
});

// 注意：connect 只是个 function，并不应定非要放在 export 后面
export default connect(AppMapStateToProps, AppMapDispatchToProps)(TrendingTabScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
});
