import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, InteractionManager, StyleSheet, View,
} from 'react-native';
import {
  COLOR_BACKGROUND_WHITE,
  COLOR_BLACK, System,
} from '../../../common';
import {
  RefreshListView, RefreshState, SpacingView
} from '../../../components';
import {
  Images, JsonMeiTuan,
} from '../../../resources';
import { onLoad, onLoadMore } from './order-actions';
import OrderMenuItem from './order-menu-item';
import OrderSectionHeader from './order-section-header';
import GoodsTableItemCell from '../goods-detail/goods-table-item-cell';

type Props = {
  navigation: any,
}

type State = {
  pageSize: number,
  pageIndex: number,
  refreshState: number,
  dataSource: Array<Object>,
}

class TabOrderMainScreen extends Component<Props, State> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const theme = navigation.getParam('theme', System.theme);
    return {
      title: '订单',
      headerStyle: {
        backgroundColor: theme.navBar.titleColor,
      },
      headerTintColor: COLOR_BLACK,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: theme.navBar.titleFontSize,
        fontWeight: theme.navBar.titleFontWeight,
      },
    };
  };

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
      pageIndex: 0,
      pageSize: 10,
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
    onLoad(JsonMeiTuan.url, this.state.pageSize, (itemModels) => {
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
    onLoadMore(JsonMeiTuan.url, nextPageIndex, this.state.pageSize, (itemModels) => {
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
    <View style={styles.container}>
      <OrderSectionHeader
        title="我的订单"
        subtitle="全部订单"
        style={{ height: 38 }}
        onPress={() => { Alert.alert('我的订单 => 全部订单'); }}
      />

      <View style={styles.itemContainer}>
        <OrderMenuItem title="待付款" icon={Images.order.ic_need_pay} onPress={() => { Alert.alert('待付款'); }} />
        <OrderMenuItem title="待使用" icon={Images.order.ic_need_use} onPress={() => { Alert.alert('待使用'); }} />
        <OrderMenuItem title="待评价" icon={Images.order.ic_need_review} onPress={() => { Alert.alert('待评价'); }} />
        <OrderMenuItem title="退款/售后" icon={Images.order.ic_need_aftersale} onPress={() => { Alert.alert('退款/售后'); }} />
      </View>

      <SpacingView />

      <OrderSectionHeader
        title="我的收藏"
        subtitle="查看全部"
        style={{ height: 38 }}
        onPress={() => { Alert.alert('我的收藏 => 查看全部'); }}
      />
    </View>
  );

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          ListHeaderComponent={this.renderHeader}
          // 可选
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

export default connect(AppMapStateToProps)(TabOrderMainScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  itemContainer: {
    flexDirection: 'row',
  },
});
