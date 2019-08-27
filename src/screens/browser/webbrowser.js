import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import WebView from 'react-native-progress-webview';
import {
  NavigationService, BackHandlerComponent
} from '../../common';
import {
  NavigationBar
} from '../../components';
import styles from './webbrowser-styles';


type Props = {};
class WebBrowserScreen extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { title, url } = this.params;
    this.state = {
      title,
      url,
      canGoBack: false,
    };
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onHardwareBackPressAction });
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();
  }

  /**
   * 组件将要销毁
   */
  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onHardwareBackPressAction = () => {
    this.handlerNavGoBackAction();
    return true;
  };

  /**
   * 获取 WebView 导航状态
   * @param navState
   */
  onNavigationStateChange(navState) {
    this.setState({
      url: navState.url,
      canGoBack: navState.canGoBack,
    });
  }

  /**
   * 导航栏返回按钮事件
   */
  handlerNavGoBackAction() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigationService.goBack(this.props.navigation);
    }
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
        title={this.state.title}
        statusBar={statusBar}
        style={navBar}
        titleStyle={titleStyle}
        returnBackHandle={() => this.handlerNavGoBackAction()}
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
        <WebView
          source={{ uri: this.state.url }}
          ref={(webView) => { this.webView = webView; }}
          color="red"
          height={2.5}
          disappearDuration={500}
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

export default connect(AppMapStateToProps, AppMapDispatchToProps)(WebBrowserScreen);
