import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Image, TouchableOpacity, View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationMeiTuanService, Paragraph, RouterConst, System,
} from '../../../common';
import {
  NavigationBarItem, RefreshListView, RefreshState
} from '../../../components';
import {
  Images, JsonMeiTuan
} from '../../../resources';
import styles from './home-styles';
import * as actions from './home-actions';
import GoodsDetailCell from '../goods-detail/goods-detail-cell';


const PAGE_SIZE = 10;


type Props = {}
class TabHomeMainScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const navBarButtonTextColor = navigation.getParam('navBarButtonTextColor', System.theme.navBar.titleColor);
    const navBarButtonTextFontSize = navigation.getParam('navBarButtonTextFontSize', System.theme.navBar.buttonTextFontSize);
    const navBarButtonTextFontWeight = navigation.getParam('navBarButtonTextFontWeight', System.theme.navBar.buttonTextFontWeight);
    const navBarBackgroundColor = navigation.getParam('navBarBackgroundColor', System.theme.navBar.backgroundColor);
    return {
      headerStyle: {
        backgroundColor: navBarBackgroundColor,
      },
      headerTitle: (
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => {
            Alert.alert('搜索', '', [{ text: '取消' }, { text: '确定' }]);
          }}
        >
          <Image source={Images.home.ic_nav_search} style={styles.searchIcon} />
          <Paragraph>搜索</Paragraph>
        </TouchableOpacity>
      ),
      headerLeft: (
        <NavigationBarItem
          title="福州"
          titleStyle={{
            paddingLeft: 5,
            color: navBarButtonTextColor,
            fontSize: navBarButtonTextFontSize,
            fontWeight: navBarButtonTextFontWeight,
          }}
          onPress={() => {
            Alert.alert(
              '定位',
              null,
              [
                {
                  text: '取消',
                  onPress: () => { console.log('Cancel Pressed'); },
                },
                {
                  text: '确定',
                  onPress: () => { console.log('Confirm Pressed'); },
                }],
              { cancelable: false }
            );
          }}
        />
      ),
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
      navBarButtonTextColor: theme.navBar.buttonTextColor,
      navBarButtonTextFontSize: theme.navBar.buttonTextFontSize,
      navBarButtonTextFontWeight: theme.navBar.buttonTextFontWeight,
      navBarBackgroundColor: theme.navBar.backgroundColor,
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
    const { onRefreshMeiTuanHome } = this.props;
    onRefreshMeiTuanHome(JsonMeiTuan.recommend, PAGE_SIZE);
  };

  /**
   * 上拉加载更多
   */
  onFooterRefresh = () => {
    const { onLoadMoreMeiTuanHome } = this.props;
    const store = this.store();
    onLoadMoreMeiTuanHome(JsonMeiTuan.recommend, ++store.pageIndex, PAGE_SIZE, store.items, () => {
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
   * 渲染表格 => 主键
   */
  keyExtractor = (item: any, index: number) => index.toString();

  /**
   * 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
   */
  renderItem = (rowData: Object) => {
    const { theme } = this.props;
    return (
      <GoodsDetailCell
        theme={theme}
        goodsModel={rowData.item}
        onSelect={(goods: Object) => {
          NavigationMeiTuanService.navigate(RouterConst.RouterIntroduceScreen, { goods });
        }}
      />
    );
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
  store: state.meiTuanHome,
});

const AppMapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshMeiTuanHome(url, pageSize)) 绑定到 props
  onRefreshMeiTuanHome: (url, pageSize) => dispatch(actions.onRefreshMeiTuanHome(url, pageSize)),
  onLoadMoreMeiTuanHome: (url, pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMoreMeiTuanHome(url, pageIndex, pageSize, dataArray, callBack)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabHomeMainScreen);
