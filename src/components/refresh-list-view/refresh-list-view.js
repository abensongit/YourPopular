import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl
} from 'react-native';

export const RefreshState = {
  Idle: 0, // 普通状态
  HeaderRefreshing: 1, // 头部菊花转圈圈中
  FooterRefreshing: 2, // 底部菊花转圈圈中
  NoMoreData: 3, // 已加载全部数据
  Failure: 4, // 加载失败
  EmptyData: 5, //
};

const DEBUG = false;
const log = (text: string) => { DEBUG && console.log(text); };

type Props = {
  refreshState: number,
  onHeaderRefresh: Function,
  onFooterRefresh?: Function,
  data: Array<any>,

  listRef?: any,

  tintColor?:string,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  footerEmptyDataText?: string,

  footerRefreshingComponent?: any,
  footerFailureComponent?: any,
  footerNoMoreDataComponent?: any,
  footerEmptyDataComponent?: any,

  renderItem: Function,
}

type State = {

}

class RefreshListView extends PureComponent<Props, State> {
  static defaultProps = {
    tintColor: '#888888',
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据',
  }

  onRefresh(loadmore) {
    if (!loadmore) {
      this.onHeaderRefresh();
    } else {
      this.onFooterRefresh();
    }
  }

  onHeaderRefresh = () => {
    log('[RefreshListView]  onHeaderRefresh');

    if (this.shouldStartHeaderRefreshing()) {
      log('[RefreshListView]  onHeaderRefresh');
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  onFooterRefresh = () => {
    log('[RefreshListView]  onFooterRefresh');

    if (this.shouldStartFooterRefreshing()) {
      log('[RefreshListView]  onFooterRefresh');
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  shouldStartHeaderRefreshing = () => {
    log('[RefreshListView]  shouldStartHeaderRefreshing');

    if (this.props.refreshState === RefreshState.HeaderRefreshing
      || this.props.refreshState === RefreshState.FooterRefreshing) {
      return false;
    }

    return true;
  };

  shouldStartFooterRefreshing = () => {
    log('[RefreshListView]  shouldStartFooterRefreshing');

    const { refreshState, data } = this.props;
    if (data.length === 0) {
      return false;
    }

    return (refreshState === RefreshState.Idle);
  };

  renderFooter = () => {
    let footer = null;

    const {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
    } = this.props;

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = (<View style={styles.footerContainer} />);
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity onPress={() => {
            if (this.props.data.length === 0) {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            } else {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
            }
          }}
          >
            {footerFailureComponent || (
              <View style={styles.footerContainer}>
                <Text style={[styles.footerText, { color: this.props.tintColor }]}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity onPress={() => {
            this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
          }}
          >
            {footerEmptyDataComponent || (
              <View style={styles.footerContainer}>
                <Text style={[styles.footerText, { color: this.props.tintColor }]}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent || (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color={this.props.tintColor} />
            <Text style={[styles.footerText, { marginLeft: 7, color: this.props.tintColor }]}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent || (
          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, { color: this.props.tintColor }]}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
      default: {
        break;
      }
    }

    return footer;
  };

  // 事件处理 - 开始拖动
  onScrollBeginDrag = () => {
    log('开始拖动');
  };

  // 事件处理 - 停止拖动
  onScrollEndDrag = () => {
    log('停止拖动');
  };

  // 事件处理 - 滚动开始
  onMomentumScrollBegin = () => {
    log('滚动开始');
  };

  // 事件处理 - 滚动结束
  onMomentumScrollEnd = () => {
    log('滚动结束');
  };

  render() {
    log(`[RefreshListView]  render  refreshState:${this.props.refreshState}`);

    const { renderItem, tintColor, ...rest } = this.props;

    return (
      <FlatList
        ref={this.props.listRef}
        renderItem={renderItem}
        refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        showsVerticalScrollIndicator
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setTimeout(() => {
            if (this.canLoadMore) { // 滚动时两次调用onEndReached
              this.onRefresh(true);
              this.canLoadMore = false;
            }
          }, 100);
        }}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        onMomentumScrollBegin={() => {
          this.canLoadMore = true;
          this.onMomentumScrollBegin();
        }}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        refreshControl={(
          <RefreshControl
            colors={[tintColor]}
            tintColor={tintColor}
            onRefresh={() => this.onRefresh(false)}
            refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
          />
        )}

        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555'
  }
});

export default RefreshListView;
