import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, TextInput, TouchableOpacity, Text, Platform, StatusBar
} from 'react-native';
import Toast from 'react-native-root-toast';
import {
  BackHandlerComponent, System, NavigationPopularService, RouterConst, COLOR_BACKGROUND_DEFAULT
} from '../../../common';
import {
  RefreshListView, RefreshState, NavigationBar
} from '../../../components';
import {
  SysUtil
} from '../../../expand';
import actions from '../../../redux/actions';
import SearchTableCell from './search-table-cell';
import MarksDao from '../mycenter/marks/marks-dao';
import PopularFavouriteDao from '../popular/popular-favourite-dao';

const PAGE_SIZE = 10;
const MARKS_DAO = new MarksDao();
const FAVOURITE_DAO = new PopularFavouriteDao();

type Props = {};
class SearchModalScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onHardwareBackPressAction });
    this.isMarksChange = false;
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
    // 监听器 - 配置状态栏
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
    // 监听器 - 移出监听器
    this.navListener.remove();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onHardwareBackPressAction = () => {
    this.onHandlerNavGoBackAction();
    return true;
  };

  /**
   * 事件 - 返回
   */
  onHandlerNavGoBackAction() {
    const { onCancelSearch, onLoadMarks } = this.props;
    onCancelSearch(); // 退出时取消搜索
    this.textInput.blur(); // 收场键盘
    if (this.isMarksChange) {
      onLoadMarks(); // 重新加载标签
    }
    NavigationPopularService.goBack(this.props.navigation);
  }

  /**
   * 事件 - 搜索/取消
   */
  onHandlerSearchCancelAction() {
    this.textInput.blur(); // 收场键盘
    const { onCancelSearch, search } = this.props;
    if (search.showText === '搜索') {
      this.onHeaderRefresh();
    } else {
      onCancelSearch(this.searchToken);
    }
  }

  /**
   * 事件 - 添加标签
   */
  onHandlerAddSaveKey() {
    const { marks } = this.props;
    let mark = this.inputKey;
    if (SysUtil.checkKeyIsExist(marks, mark)) {
      Toast.show(`${mark}已经存在`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else {
      mark = {
        path: mark,
        name: mark,
        checked: true
      };
      marks.unshift(mark); // 将key添加到数组的开头
      MARKS_DAO.save(marks);
      this.isMarksChange = true;
      Toast.show(`${mark.name}保存成功`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  // 下拉刷新
  onHeaderRefresh = () => {
    const { onRefreshSearch, marks } = this.props;
    onRefreshSearch(this.inputKey, PAGE_SIZE, this.searchToken = new Date().getTime(), FAVOURITE_DAO, marks, (message) => {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    });
  };

  // 上拉加载
  onFooterRefresh = () => {
    const { onLoadMoreSearch } = this.props;
    const store = this.store();
    onLoadMoreSearch(++store.pageIndex, PAGE_SIZE, store.items, FAVOURITE_DAO, () => {
      Toast.show('没有更多数据了', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    });
  };

  // 渲染表格
  keyExtractor = (item: any, index: number) => index.toString();

  // 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
  renderItem = (rowData: Object) => (
    <SearchTableCell
      projectModel={rowData.item}
      onSelect={(callback) => {
        NavigationPopularService.navigate(
          RouterConst.RouterPopularTabDetaiScreen,
          {
            projectModel: rowData.item,
            callback
          }
        );
      }}
      onFavourite={(item, isFavourite) => {
        SysUtil.onFavouritePopular(item, isFavourite, FAVOURITE_DAO);
      }}
    />
  );

  // 状态容器
  store() {
    const { search } = this.props;
    let store = search;
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
   * 创建导航条标题
   * @returns {NavigationContainer}
   */
  renderNavTitleView() {
    const { inputKey } = this.props.search;
    const placeholder = inputKey || '请输入';
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          underlineColorAndroid="transparent"
          ref={(input) => { this.textInput = input; }}
          onChangeText={(text) => { this.inputKey = text; }}
        />
      </View>
    );
  }

  /**
   * 创建导航条按钮（右侧）
   * @returns {*}
   */
  renderNavBarRightButton() {
    const { showText } = this.props.search;
    return (
      <TouchableOpacity onPress={() => this.onHandlerSearchCancelAction()}>
        <Text style={styles.navBtnSearch}>{showText}</Text>
      </TouchableOpacity>
    );
  }

  /**
   * 创建底部按钮
   * @returns {*}
   */
  renderBottomButton() {
    const { theme } = this.props;
    const { showBottomButton } = this.props.search;
    return showBottomButton
      ? (
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: theme.themeColor }]}
          onPress={() => this.onHandlerAddSaveKey()}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>朕收下了</Text>
          </View>
        </TouchableOpacity>
      ) : null;
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
    return (
      <NavigationBar
        statusBar={statusBar}
        style={navBar}
        titleView={this.renderNavTitleView()}
        titleLayoutStyle={styles.titleLayoutStyle}
        leftButton={NavigationBar.renderNavBackButton(() => this.onHandlerNavGoBackAction(), 'white')}
        rightButton={this.renderNavBarRightButton()}
      />
    );
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const store = this.store();
    const { theme } = this.props;
    const { showBottomButton } = this.props.search;
    const navigationBar = this.renderNavigationBar();
    const bottomButton = this.renderBottomButton();
    return (
      <View style={styles.container}>
        {navigationBar}
        <RefreshListView
          data={store.projectModels}
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
          //
          contentInset={{
            top: 0,
            bottom: showBottomButton ? Platform.select({
              ios: System.isIPhoneXsOrGreater ? 44 : 10,
              android: 10,
            }) : 0,
          }}
        />
        {bottomButton}
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
  search: state.search,
  marks: state.marks.marks,
});

const AppMapDispatchToProps = dispatch => ({
  onRefreshSearch: (input, pageSize, token, favoriteDao, popularKeys, callBack) => dispatch(actions.onRefreshSearch(input, pageSize, token, favoriteDao, popularKeys, callBack)),
  onLoadMoreSearch: (pageIndex, pageSize, dataArray, favouriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, favouriteDao, callBack)),
  onCancelSearch: token => dispatch(actions.onCancelSearch(token)),
  onLoadMarks: () => dispatch(actions.onLoadMarks()),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(SearchModalScreen);


const SEARCH_BAR_HEIGHT = Platform.select({
  ios: System.window.navigationBarHeight * 0.68,
  android: System.window.navigationBarHeight * 0.58
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  titleLayoutStyle: {
    alignItems: 'stretch',
    top: 5,
    bottom: 5,
    right: 55,
  },
  searchBar: {
    width: System.window.width * 0.7,
    height: SEARCH_BAR_HEIGHT,
    borderRadius: SEARCH_BAR_HEIGHT * 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    height: (Platform.OS === System.IOS) ? 15 : 36,
    paddingHorizontal: 10,
    fontSize: 15,
    opacity: 0.8,
    color: '#222222'
  },
  navBtnSearch: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  bottomButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    height: 44,
    left: 10,
    right: 10,
    bottom: Platform.select({
      ios: System.isIPhoneXsOrGreater ? 34 : 10,
      android: 10,
    }),
    borderRadius: 3
  },
});
