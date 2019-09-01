import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View
} from 'react-native';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import {
  NavigationPopularService, RouterConst, EventTypes
} from '../../../common';
import {
  RefreshListView, RefreshState
} from '../../../components';
import {
  SysUtil
} from '../../../expand';
import * as actions from './popular-actions';
import PopularTabCell from './popular-tab-cell';
import PopularFavouriteDao from './popular-favourite-dao';

const PAGE_SIZE = 10;
const NETWORK_QUERY_CONDITION = '&sort=stars';
const NETWORK_URL = 'https://api.github.com/search/repositories?q=';
const POPULAR_FAVOURITE_DAO = new PopularFavouriteDao();

type Props = {};
class PopularTabScreen extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
    this.isFavouriteChanged = false;
  }

  componentDidMount() {
    // 首页加载数据
    this.onHeaderRefresh();
    // 添加监听函数
    EventBus.getInstance().addListener(EventTypes.EVENT_FAVOURITE_CHANGED_POPULAR, this.favoriteChangeListener = () => {
      this.isFavouriteChanged = true;
    });
    EventBus.getInstance().addListener(EventTypes.EVENT_BOTTOM_TAB_CHANGE_SELECT, this.bottomTabSelectListener = (data) => {
      if (data.to === 0 && this.isFavouriteChanged) {
        const { onFlushPopularFavourite } = this.props;
        const store = this.store();
        onFlushPopularFavourite(this.storeName, store.pageIndex, PAGE_SIZE, store.items, POPULAR_FAVOURITE_DAO);
      }
    });
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.favoriteChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }

  // 下拉刷新
  onHeaderRefresh = () => {
    const { onRefreshPopular } = this.props;
    const url = this.genFetchUrl(this.storeName);
    onRefreshPopular(this.storeName, url, PAGE_SIZE, POPULAR_FAVOURITE_DAO);
  };

  // 上拉加载
  onFooterRefresh = () => {
    const { onLoadMorePopular } = this.props;
    const store = this.store();
    onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, POPULAR_FAVOURITE_DAO, () => {
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
      <PopularTabCell
        theme={theme}
        projectModel={rowData.item}
        onSelect={(callback) => {
          NavigationPopularService.navigate(
            RouterConst.RouterPopularTabDetaiScreen,
            {
              projectModel: rowData.item,
              callback, // 详情页面更新 ItemCell 的收藏状态
            }
          );
        }}
        onFavourite={(item, isFavourite) => {
          SysUtil.onFavouritePopular(item, isFavourite, POPULAR_FAVOURITE_DAO);
        }}
      />
    );
  };

  genFetchUrl(key) {
    return NETWORK_URL + key + NETWORK_QUERY_CONDITION;
  }

  store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        projectModels: [],
        refreshState: RefreshState.HeaderRefreshing,
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
  popular: state.popular
});

const AppMapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshPopular(storeName, url)) 绑定到 props
  onRefreshPopular: (storeName, url, pageSize, favouriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favouriteDao)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, dataArray, favouriteDao, callBack)),
  onFlushPopularFavourite: (storeName, pageIndex, pageSize, dataArray, favouriteDao) => dispatch(actions.onFlushPopularFavourite(storeName, pageIndex, pageSize, dataArray, favouriteDao)),
});

// 注意：connect 只是个 function，并不应定非要放在 export 后面
export default connect(AppMapStateToProps, AppMapDispatchToProps)(PopularTabScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
});
