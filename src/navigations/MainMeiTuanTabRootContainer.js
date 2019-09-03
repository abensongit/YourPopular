import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StatusBar,
} from 'react-native';
import IconOfOcticons from 'react-native-vector-icons/Octicons';
import IconOfAntDesign from 'react-native-vector-icons/AntDesign';
import IconOfFontAwesome from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  NavigationMeiTuanService,
} from '../common';
import {
  ScrollableTabbar,
} from '../components';
import {
  COLOR_BACKGROUND_DEFAULT,
} from '../common/Variables';

import TabHomeStackContainer from '../screens/meituanfood/tab-home/tab-home-navigator';
import TabNearbyStackContainer from '../screens/meituanfood/tab-nearby/tab-nearby-navigator';
import TabOrderStackContainer from '../screens/meituanfood/tab-order/tab-order-navigator';
import TabMyCenterStackContainer from '../screens/meituanfood/tab-mycenter/tab-mycenter-navigator';

type Props = {};
class MainMeiTuanTabRootContainer extends Component<Props> {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['团购', '附近', '订单', '我的'],
      tabIconTypes: [IconOfAntDesign, IconOfOcticons, IconOfOcticons, IconOfFontAwesome],
      tabIconNames: ['home', 'location', 'list-unordered', 'user-circle'],
    };
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    const { tabNames, tabIconTypes, tabIconNames } = this.state;
    NavigationMeiTuanService.topLevelNavigator = this.props.navigation;
    return (
      <ScrollableTabView
        style={{ flex: 1, backgroundColor: COLOR_BACKGROUND_DEFAULT, }}
        renderTabBar={() => (
          <ScrollableTabbar
            tabNames={tabNames}
            tabIconTypes={tabIconTypes}
            tabIconNames={tabIconNames}
            activeTextColor={theme.themeColor}
            inactiveTextColor="#979797"
            onPress={(tab, index) => {
              if (index === 1 || index === 2) {
                StatusBar.setBarStyle('dark-content', false);
              } else {
                StatusBar.setBarStyle('light-content', false);
              }
            }}
          />
        )}
        locked
        initialPage={0}
        tabBarPosition="bottom"
        scrollWithoutAnimation
        prerenderingSiblingsNumber={1}
      >

        {/* 首页 */}
        <TabHomeStackContainer />

        {/* 附近 */}
        <TabNearbyStackContainer />

        {/* 订单 */}
        <TabOrderStackContainer />

        {/* 我的 */}
        <TabMyCenterStackContainer />

      </ScrollableTabView>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(MainMeiTuanTabRootContainer);
