import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, TouchableOpacity, Text, DeviceEventEmitter
} from 'react-native';
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  EventDeviceTypes
} from '../../common';
import {
  NavigationBar
} from '../../components';
import {
  ArrayUtil
} from '../../expand';
import TrendingTimeSpanDialog, { TimeSpanModels } from './trending-time-span';
import TrendingTabScreen from './trending-tab';
import actions from '../../redux/actions';


type Props = {};
class TrendingScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.preTabItems = [];
    const { onLoadLanguages } = this.props;
    onLoadLanguages();
    this.state = {
      timeSpan: TimeSpanModels[0],
    };
  }

  /**
   * 导航栏选择对话框事件
   * @param itemTimeSpan
   */
  onSelectTimeSpan(itemTimeSpan) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: itemTimeSpan
    });
    DeviceEventEmitter.emit(EventDeviceTypes.EVENT_TYPE_TRENDING_TIME_SPAN_CHANGE, itemTimeSpan);
  }

  /**
   * 配置头部标签页面
   */
  routeConfigMaterialTopTabItemScreens() {
    const tabs = {};
    const { tabItems, theme } = this.props;
    this.preTabItems = tabItems;
    tabItems.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => <TrendingTabScreen {...props} tabLabel={item.name} theme={theme} timeSpan={this.state.timeSpan} />,
          navigationOptions: {
            title: item.name
          },
        };
      }
    });
    return tabs;
  }

  /**
   * 创建头部标签容器
   * @returns {NavigationContainer}
   */
  renderMaterialTopTabNavigator() {
    // 优化效率：根据需要选择是否重新创建建TabNavigator，通常tabItems改变后才重新创建
    if (this.props.theme !== this.theme || !this.topTabNavigator || !ArrayUtil.isEqual(this.preTabItems, this.props.tabItems)) {
      const routeConfigMap = this.routeConfigMaterialTopTabItemScreens();
      this.theme = this.props.theme;
      this.topTabNavigator = Object.keys(routeConfigMap).length
        ? createAppContainer(createMaterialTopTabNavigator(routeConfigMap,
          {
            tabBarOptions: {
              tabStyle: styles.tabStyle,
              upperCaseLabel: false, // 是否使标签大写，默认为true
              scrollEnabled: true, // 是否支持 选项卡滚动，默认false
              style: {
                height: 35,
                backgroundColor: this.props.theme.themeColor, // TabBar 的背景颜色
              },
              labelStyle: styles.labelStyle, // 文字的样式
              indicatorStyle: styles.indicatorStyle, // 标签指示器的样式
            },
            lazy: true
          }))
        : null;
    }
    return this.topTabNavigator;
  }

  /**
   * 导航栏选择对话框
   * @returns {*}
   */
  renderTrendingDialog() {
    return (
      <TrendingTimeSpanDialog
        ref={(dialog) => { this.dialog = dialog; }}
        onSelect={itemTimeSpan => this.onSelectTimeSpan(itemTimeSpan)}
      />
    );
  }

  /**
   * 创建导航条标题
   * @returns {NavigationContainer}
   */
  renderNavTitleView() {
    return (
      <View>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => this.dialog.show()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>
              趋势
            </Text>
            <FontAwesome
              name="circle"
              size={8}
              style={{ color: 'white', paddingHorizontal: 3, }}
            />
            <Text style={styles.title}>
              {this.state.timeSpan.showText}
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={30}
              style={{ color: 'white', marginLeft: -5 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
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
    // 标题头
    const titleStyle = {
      color: 'white',
    };
    return (
      <NavigationBar
        title="趋势"
        hairline
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        titleView={this.renderNavTitleView()}
      />
    );
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    // 导航和状态栏
    const navigationBar = this.renderNavigationBar();
    // 滚动的标签栏
    const TopTabNavigator = this.renderMaterialTopTabNavigator();
    return (
      <View style={styles.container}>
        {navigationBar}
        {TopTabNavigator && <TopTabNavigator />}
        {this.renderTrendingDialog()}
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
  tabItems: state.langus.languages,
});

const AppMapDispatchToProps = dispatch => ({
  onLoadLanguages: () => dispatch(actions.onLoadLanguages())
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TrendingScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tabStyle: {

  },
  labelStyle: {
    marginTop: 0,
    fontSize: 16,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#ffffff'
  },
});
