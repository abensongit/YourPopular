import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View
} from 'react-native';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import RefreshListView, { RefreshState } from '../../components/refresh-list-view/refresh-list-view';
import {
  NavigationPopularService, RouterConst, EventTypes
} from '../../common';
import {
  SysUtil
} from '../../expand';
import { FAVOURITE_FLAGS } from './favourite';
import * as actions from './favourite-actions';
import PopularTabCell from '../popular/popular-tab-cell';
import TrendingTabCell from '../trending/trending-tab-cell';
import PopularFavouriteDao from '../popular/popular-favourite-dao';
import TrendingFavouriteDao from '../trending/trending-favourite-dao';

const PAGE_SIZE = 10;

type Props = {};
class FavouriteTabScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
    if (FAVOURITE_FLAGS.FLAG_POPULEAR === this.storeName) {
      this.favouriteDao = new PopularFavouriteDao();
    } else if (FAVOURITE_FLAGS.FLAG_TRENDING === this.storeName) {
      this.favouriteDao = new TrendingFavouriteDao();
    }
  }

  componentDidMount() {
    this.onHeaderRefresh();
    EventBus.getInstance().addListener(EventTypes.EVENT_BOTTOM_TAB_CHANGE_SELECT, this.listener = (data) => {
      if (data.to === 2) {
        this.props.onRefreshFavourite(this.storeName, false, PAGE_SIZE, this.favouriteDao);
      }
    });
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  /**
   * 点击收藏按钮事件
   * @param item
   * @param isFavourite
   */
  onFavourite(item, isFavourite) {
    // 收藏/取消收藏
    if (this.storeName === FAVOURITE_FLAGS.FLAG_POPULEAR) {
      SysUtil.onFavouritePopular(item, isFavourite, this.favouriteDao);
    } else {
      SysUtil.onFavouriteTrending(item, isFavourite, this.favouriteDao);
    }

    // 触发监听事件
    if (this.storeName === FAVOURITE_FLAGS.FLAG_POPULEAR) {
      EventBus.getInstance().fireEvent(EventTypes.EVENT_FAVOURITE_CHANGED_POPULAR);
    } else {
      EventBus.getInstance().fireEvent(EventTypes.EVENT_FAVOURITE_CHANGED_TRENDING);
    }
  }

  /**
   * 下拉刷新
   */
  onHeaderRefresh = () => {
    const { onRefreshFavourite } = this.props;
    onRefreshFavourite(this.storeName, true, PAGE_SIZE, this.favouriteDao);
  };

  /**
   * 上拉加载
   */
  onFooterRefresh = () => {
    const { onLoadMoreFavourite } = this.props;
    const store = this.store();
    onLoadMoreFavourite(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, this.favouriteDao, () => {
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

  /**
   * 渲染表格 => 表格行标识
   * @param item
   * @param index
   * @returns {string}
   */
  keyExtractor = (item: any, index: number) => index.toString();

  /**
   * 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
   * @param rowData
   * @returns {*}
   */
  renderItem = (rowData: Object) => {
    const TabItem = FAVOURITE_FLAGS.FLAG_POPULEAR === this.storeName ? PopularTabCell : TrendingTabCell;
    const routerScreen = FAVOURITE_FLAGS.FLAG_POPULEAR === this.storeName ? RouterConst.RouterPopularTabDetaiScreen : RouterConst.RouterTrendingTabDetaiScreen;
    return (
      <TabItem
        projectModel={rowData.item}
        onSelect={(callback) => {
          NavigationPopularService.navigate(routerScreen, {
            projectModel: rowData.item,
            flag: this.storeName,
            callback
          });
        }}
        onFavourite={(item, isFavourite) => this.onFavourite(item, isFavourite)}
      />
    );
  };

  /**
   * 获取表格数据源
   * @returns {*}
   */
  store() {
    const { favourite } = this.props;
    let store = favourite[this.storeName];
    if (!store) {
      store = {
        items: [],
        projectModels: [],
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
  favourite: state.favourite
});

const AppMapDispatchToProps = dispatch => ({
  onRefreshFavourite: (storeName, isShowLoading, pageSize, favouriteDao) => dispatch(actions.onRefreshFavourite(storeName, isShowLoading, pageSize, favouriteDao)),
  onLoadMoreFavourite: (storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack) => dispatch(actions.onLoadMoreFavourite(storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack)),
  onFlushFavourite: (storeName, pageIndex, pageSize, dataArray, favouriteDao) => dispatch(actions.onFlushFavourite(storeName, pageIndex, pageSize, dataArray, favouriteDao)),
});

// 注意：connect 只是个 function，并不应定非要放在 export 后面
export default connect(AppMapStateToProps, AppMapDispatchToProps)(FavouriteTabScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
});
