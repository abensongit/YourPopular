import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Image, InteractionManager, View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  Heading2, NavigationMeiTuanService, Paragraph, System,
} from '../../../common';
import {
  RefreshListView, RefreshState, NavigationBarItem, SpacingView,
} from '../../../components';
import {
  Images,
} from '../../../resources';
import styles from './mycenter-styles';
import MyCenterCell from './mycenter-cell';
import MyCenterModel from './mycenter-model';

const FLAST_LIST_SECTION = {
  FLAST_LIST_CELL_ITEM: 'FLAST_LIST_CELL_ITEM',
  FLAST_LIST_CELL_SPACE: 'FLAST_LIST_CELL_SPACE',
};

type Props = {}
class TabMyCenterMainScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const theme = navigation.getParam('theme', System.theme);
    return {
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: theme.navBar.backgroundColor,
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <NavigationBarItem
            iconType={Feather}
            iconName="share"
            iconSize={24}
            iconStyle={{ alignSelf: 'center', color: 'white', }}
            onPress={() => {
              NavigationMeiTuanService.openDrawer();
            }}
          />
          <NavigationBarItem
            iconType={Feather}
            iconName="settings"
            iconSize={24}
            iconStyle={{ alignSelf: 'center', color: 'white', }}
            onPress={() => {
              NavigationMeiTuanService.openDrawer();
            }}
          />
        </View>
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
      theme,
    });
    this.state = {
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
   * 组件将要销毁
   */
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  /**
   * 获取静态数据
   */
  getStaticDataList() {
    return [
      new MyCenterModel(null, FLAST_LIST_SECTION.FLAST_LIST_CELL_SPACE),
      new MyCenterModel({ title: '我的钱包', subtitle: '办信用卡', image: Images.mine.ic_wallet }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '余额', subtitle: '￥95872385', image: Images.mine.ic_balance }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '抵用券', subtitle: '63', image: Images.mine.ic_voucher }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '会员卡', subtitle: '200', image: Images.mine.ic_membercard }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel(null, FLAST_LIST_SECTION.FLAST_LIST_CELL_SPACE),
      new MyCenterModel({ title: '好友去哪', image: Images.mine.ic_friends }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '我的评价', image: Images.mine.ic_comment }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '我的收藏', image: Images.mine.ic_collection }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '会员中心', subtitle: 'v15', image: Images.mine.ic_membercenter }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '积分商城', subtitle: '好礼已上线', image: Images.mine.ic_member }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel(null, FLAST_LIST_SECTION.FLAST_LIST_CELL_SPACE),
      new MyCenterModel({ title: '客服中心', image: Images.mine.ic_customer_service }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
      new MyCenterModel({ title: '关于美团', subtitle: '我要合作', image: Images.mine.ic_aboutmeituan }, FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM),
    ];
  }

  /**
   * 下拉刷新数据
   */
  onHeaderRefresh = () => {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
    });
    const dataSource = this.getStaticDataList();
    this.timer = setTimeout(() => {
      this.setState({
        dataSource,
        refreshState: RefreshState.Idle,
      });
    }, 0);
  };

  /**
   * 事件 - 项目
   * @param data
   */
  onSelectedCellItem = (data: Object) => {
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
   * 渲染表格 => 主键
   */
  keyExtractor = (item: any, index: number) => index.toString();

  /**
   * 渲染表格 => item 是FlatList中固定的参数名，请阅读FlatList的相关文档
   */
  renderItem = (rowData: Object) => {
    const { theme } = this.props;
    const itemModel = rowData.item;
    // 类型 => 项目
    if (FLAST_LIST_SECTION.FLAST_LIST_CELL_ITEM === itemModel.type) {
      return (
        <MyCenterCell
          theme={theme}
          data={itemModel.data}
          onSelect={this.onSelectedCellItem}
        />
      );
    }
    // 类型 => 空白
    if (FLAST_LIST_SECTION.FLAST_LIST_CELL_SPACE === itemModel.type) {
      return (
        <SpacingView />
      );
    }
    return null;
  };

  /**
   * 渲染表格 => 表头
   */
  renderHeader = () => {
    const { theme } = this.props;
    return (
      <View style={[styles.header, { backgroundColor: theme.tintColor }]}>
        <Image style={styles.avatar} source={Images.mine.ic_avatar} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Heading2 style={{ color: 'white' }}>美丽的故乡</Heading2>
            <Image style={{ marginLeft: 4 }} source={Images.mine.ic_beauty} />
          </View>
          <Paragraph style={{ color: 'white', marginTop: 4 }}>个人详细信息</Paragraph>
        </View>
      </View>
    );
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

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabMyCenterMainScreen);
