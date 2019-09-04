import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, InteractionManager, StyleSheet, View,
} from 'react-native';
import {
  COLOR_BACKGROUND_WHITE, COLOR_BLACK, NavigationMeiTuanService, RouterConst, System,
} from '../../../common';
import {
  RefreshListView, RefreshState, SpacingView
} from '../../../components';
import {
  JsonMeiTuan,
} from '../../../resources';
import { onLoad, onLoadMore } from './order-actions';
import OrderMenuCell from './order-menu-cell';
import OrderSectionHeader from './order-section-header';
import GoodsTableItemCell from '../goods-detail/goods-table-item-cell';

const PAGE_SIZE = 10;
export const FLAST_LIST_SECTION = {
  FLAST_LIST_SECTION_HEADER: 'FLAST_LIST_SECTION_HEADER',
  FLAST_LIST_SECTION_MENU: 'FLAST_LIST_SECTION_MENU',
  FLAST_LIST_SECTION_GOODS: 'FLAST_LIST_SECTION_GOODS',
};

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
   * 事件 - 分类
   * @param data
   */
  onSelectedSectionHeader = (data: Object) => {
    Alert.alert(
      data.title,
      '',
      [
        { text: '取消', onPress: () => { console.log('cancle action'); } },
        { text: '确定', onPress: () => { console.log('confirm action'); } },
      ]
    );
  };

  /**
   * 事件 - 菜单
   * @param data
   */
  onSelectedCellMenu = (data: Object) => {
    Alert.alert(
      data.title,
      '',
      [
        { text: '取消', onPress: () => { console.log('cancle action'); } },
        { text: '确定', onPress: () => { console.log('confirm action'); } },
      ]
    );
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
    // 类型 => 分类
    if (FLAST_LIST_SECTION.FLAST_LIST_SECTION_HEADER === itemModel.type) {
      return (
        <OrderSectionHeader
          theme={theme}
          data={itemModel.data}
          onSelect={this.onSelectedSectionHeader}
        />
      );
    }
    // 类型 => 菜单
    if (FLAST_LIST_SECTION.FLAST_LIST_SECTION_MENU === itemModel.type) {
      return (
        <View>
          <OrderMenuCell
            theme={theme}
            data={itemModel.data}
            onSelect={this.onSelectedCellMenu}
          />
          <SpacingView />
        </View>
      );
    }
    // 类型 => 商品
    if (FLAST_LIST_SECTION.FLAST_LIST_SECTION_GOODS === itemModel.type) {
      return (
        <GoodsTableItemCell
          theme={theme}
          goodsModel={itemModel.data}
          onSelect={this.onSelectedCellGoods}
        />
      );
    }
    return null;
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
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

export default connect(AppMapStateToProps)(TabOrderMainScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
});
