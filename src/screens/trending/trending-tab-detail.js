import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, StyleSheet, View, TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  NavigationPopularService, BackHandlerComponent
} from '../../common';
import {
  NavigationBar, ProgressWebView
} from '../../components';
import {
  SysUtil
} from '../../expand';
import PopularFavouriteDao from './trending-favourite-dao';

const TRENDING_URL = 'https://github.com/';

type Props = {};
class TrendingTabDetaiScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { projectModel } = this.params;
    this.favouriteDao = new PopularFavouriteDao();
    const itemName = projectModel.item.full_name || projectModel.item.fullName;
    this.webSource = TRENDING_URL + projectModel.item.fullName;
    this.state = {
      title: itemName,
      webSource: this.webSource,
      webCanGoBack: false,
      isFavourite: projectModel.isFavourite,
    };
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onhardwareBackPressAction });
  }

  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
  }

  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onhardwareBackPressAction = () => {
    this.handlerNavGoBackAction();
    return true;
  };

  /**
   * 获取 WebView 导航状态
   * @param navState
   */
  onNavigationStateChange(navState) {
    this.setState({
      webSource: navState.url,
      webCanGoBack: navState.canGoBack,
    });
  }

  /**
   * 导航栏返回按钮事件
   */
  handlerNavGoBackAction() {
    if (this.state.webCanGoBack) {
      this.webView.goBack();
    } else {
      NavigationPopularService.goBack(this.props.navigation);
    }
  }

  /**
   * 导航栏收藏按钮事件
   */
  handleFavouriteAction() {
    const { projectModel, callback } = this.params;
    const isFavourite = !projectModel.isFavourite;
    projectModel.isFavourite = isFavourite;
    callback(isFavourite); // 更新外面 Item 的收藏状态
    this.setState({
      isFavourite,
    });
    SysUtil.onFavouriteTrending(projectModel.item, isFavourite, this.favouriteDao);
  }

  /**
   * 创建导航条按钮（右侧）
   * @returns {*}
   */
  renderNavBarRightButton(color = 'black') {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingHorizontal: 5,
          }}
          onPress={() => { this.handleFavouriteAction(); }}
        >
          <FontAwesome
            name={this.state.isFavourite ? 'star' : 'star-o'}
            size={24}
            style={{ alignSelf: 'center', color, }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 2, paddingLeft: 5, paddingRight: 10, marginRight: 0
          }}
          onPress={() => {
            Alert.alert('分享', '', [{ text: '取消' }, { text: '确定' }]);
          }}
        >
          <Feather
            name="share-2"
            size={22}
            style={{ alignSelf: 'center', color, }}
          />
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
      barStyle: 'dark-content',
      backgroundColor: 'white',
    };
    // 导航条
    const navBar = {
      backgroundColor: 'white',
    };
    // 标题头
    const titleStyle = {
      color: 'black',
    };
    return (
      <NavigationBar
        title={this.state.title}
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        returnBackHandle={() => this.handlerNavGoBackAction()}
        rightButton={this.renderNavBarRightButton()}
      />
    );
  }

  /**
   * 渲染界面
   * @returns {*}
   */
  render() {
    const navigationBar = this.renderNavigationBar();
    return (
      <View style={styles.container}>
        {navigationBar}
        <ProgressWebView
          source={{ uri: this.state.webSource }}
          ref={(webView) => { this.webView = webView; }}
          color="red"
          height={2.5}
          onNavigationStateChange={navState => this.onNavigationStateChange(navState)}
        />
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TrendingTabDetaiScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
