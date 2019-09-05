import React from 'react';
import {
  Alert, View, Text, StyleSheet
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  BackHandlerComponent, NavigationPopularService, System
} from '../../../../common';
import {
  ViewUtil
} from '../../../../expand';
import {
  NavigationBar, ProgressImageView
} from '../../../../components';


const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = System.window.statusBarHeight + System.window.navigationBarHeight;
const NETWORK_URL = 'http://www.devio.org/io/GitHubPopular/json/github_app_config.json';
export const FLAG_ABOUT = { FLAG_ABOUT: 'FLAG_ABOUT', FLAG_ABOUT_ME: 'FLAG_ABOUT_ME' };


export default class AboutComponent {
  /**
   * 构造函数
   * @param props
   * @param updateState
   */
  constructor(props, updateState) {
    this.props = props;
    this.updateState = updateState;
    this.backPressComponent = new BackHandlerComponent({ hardwareBackPressAction: this.onhardwareBackPressAction });
  }

  /**
   * 实例阶段
   */
  componentDidMount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentDidMount();

    // 请求数据
    fetch(NETWORK_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network Error');
      })
      .then((config) => {
        if (config) {
          this.updateState({
            data: config
          });
        }
      })
      .catch((error) => {
        console(error);
      });
  }

  /**
   * 销毁阶段
   */
  componentWillUnmount() {
    // 处理 Android 中的物理返回键
    this.backPressComponent.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   */
  onhardwareBackPressAction = () => {
    NavigationPopularService.goBack(this.props.navigation);
    return true;
  };

  /**
   * 处理分享事件
   */
  onShareAction = () => {
    Alert.alert(
      '分享成功',
      '',
      [
        { text: '取消', onPress: () => { console.log('cancle action'); } },
        { text: '确定', onPress: () => { console.log('confirm action'); } },
      ]
    );
  };

  /**
   * 配置 ParallaxScrollView
   * @param params
   */
  renderParallaxScrollViewConfig(params) {
    const config = {};
    const avatar = typeof (params.avatar) === 'string' ? { uri: params.avatar } : params.avatar;
    // 设置头部背景内容
    config.renderBackground = () => (
      <View key="background">
        <ProgressImageView
          style={styles.renderBackground}
          source={{ uri: params.backgroundImg }}
          indicatorColor={this.props.theme.themeColor}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          width: System.layout.width,
          height: PARALLAX_HEADER_HEIGHT,
          backgroundColor: 'rgba(0,0,0,.4)',
        }}
        />
      </View>
    );
    // 设置头部前景内容
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <ProgressImageView
          style={styles.avatar}
          source={avatar}
          indicatorColor={this.props.theme.themeColor}
        />
        <Text style={styles.sectionSpeakerText}>
          {params.name}
        </Text>
        <Text style={styles.sectionTitleText}>
          {params.description}
        </Text>
      </View>
    );
    // 导航标题区域
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    // 导航按钮区域
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {NavigationBar.renderNavBackButton(() => NavigationPopularService.goBack(this.props.navigation))}
        {ViewUtil.renderNavShareButton(() => this.onShareAction())}
      </View>
    );
    return config;
  }

  /**
   *
   * @param contentView
   * @param params
   * @returns {*}
   */
  render(contentView, params) {
    const { theme } = this.props;
    const renderConfig = this.renderParallaxScrollViewConfig(params);
    return (
      <ParallaxScrollView
        backgroundColor={theme}
        contentBackgroundColor="#f3f3f4"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        {...renderConfig}
      >
        {contentView}
      </ParallaxScrollView>
    );
  }
}


const styles = StyleSheet.create({
  stickySection: {
    alignItems: 'center',
    height: STICKY_HEADER_HEIGHT,
    paddingTop: System.window.statusBarHeight
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: System.window.statusBarHeight
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  renderBackground: {
    width: System.window.width,
    height: PARALLAX_HEADER_HEIGHT,
    backgroundColor: '#e9e9ee',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 5,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#e9e9ee',
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10
  },
});
