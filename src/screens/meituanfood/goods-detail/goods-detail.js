import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import Toast from 'react-native-root-toast';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationMeiTuanService, RouterConst, System,
} from '../../../common';
import {
  NavigationBarItem, RefreshListView, RefreshState
} from '../../../components';
import {
  JsonMeiTuanGoodsUrlWithId
} from '../../../resources';
import styles from './goods-detail-styles';
import GoodsTableInfoCell from './goods-table-info-cell';
import GoodsTableItemCell from './goods-table-item-cell';
import * as actions from './goods-detail-actions';


const PAGE_SIZE = 10;
export const FLAST_LIST_SECTION = {
  FLAST_LIST_SECTION_DETAIL: 'FLAST_LIST_SECTION_MENU',
  FLAST_LIST_SECTION_GOODS: 'FLAST_LIST_SECTION_GOODS',
};


type Props = {}
class TabHomeMainScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { title } = navigation.state.params;
    const theme = navigation.getParam('theme', System.theme);
    return {
      title: title || '商品详情',
      headerStyle: {
        backgroundColor: theme.navBar.backgroundColor,
      },
      headerTintColor: theme.navBar.titleColor,
      headerTitleStyle: {
        fontSize: theme.navBar.titleFontSize,
        fontWeight: theme.navBar.titleFontWeight,
      },
      headerRight: (
        <NavigationBarItem
          iconType={Feather}
          iconName="menu"
          iconSize={24}
          iconStyle={{ alignSelf: 'center', color: 'white', }}
          onPress={() => {
            NavigationMeiTuanService.openDrawer();
          }}
        />
      ),
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
      theme
    });
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
    const { onRefreshGoodsDetail } = this.props;
    const { goodsInfo } = this.props.navigation.state.params;
    const fetchUrl = JsonMeiTuanGoodsUrlWithId(goodsInfo.id);
    onRefreshGoodsDetail(fetchUrl, PAGE_SIZE);
  };

  /**
   * 上拉加载更多
   */
  onFooterRefresh = () => {
    const { onLoadMoreGoodsDetail } = this.props;
    const { goodsInfo } = this.props.navigation.state.params;
    const fetchUrl = JsonMeiTuanGoodsUrlWithId(goodsInfo.id);
    const store = this.store();
    onLoadMoreGoodsDetail(fetchUrl, ++store.pageIndex, PAGE_SIZE, store.items, () => {
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
   * 事件 - 商品
   * @param goods
   */
  onSelectedCellGoods = (goods: Object) => {
    NavigationMeiTuanService.push(
      RouterConst.RouterMeiTuanWebBrowserScreen, {
        title: goods.title,
        goods,
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
    const { goodsInfo } = this.props.navigation.state.params;
    const itemModel = rowData.item;
    // 类型 => 详情
    if (FLAST_LIST_SECTION.FLAST_LIST_SECTION_DETAIL === itemModel.type) {
      return (
        <GoodsTableInfoCell
          theme={theme}
          goodsModel={goodsInfo}
          onSelect={this.onSelectedCellGoods}
        />
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
  store: state.meiTuanGoodsDetail,
});

const AppMapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshMeiTuanHome(url, pageSize)) 绑定到 props
  onRefreshGoodsDetail: (url, pageSize) => dispatch(actions.onRefreshGoodsDetail(url, pageSize)),
  onLoadMoreGoodsDetail: (url, pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMoreGoodsDetail(url, pageIndex, pageSize, dataArray, callBack)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabHomeMainScreen);
