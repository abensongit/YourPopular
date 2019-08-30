import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  COLOR_BACKGROUND_WHITE,
} from '../common/Variables';
import {
  ScrollableTabbar,
} from '../components';
import { Images } from '../resources';

import TabHomeScreen from '../screens/meituanfood/tab-home/tab-home';


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
      tabIconNormalNames: [
        Images.tabBar.ic_home_normal,
        Images.tabBar.ic_nearby_normal,
        Images.tabBar.ic_order_normal,
        Images.tabBar.ic_mine_normal,
      ],
      tabIconSelectNames: [
        Images.tabBar.ic_home_select,
        Images.tabBar.ic_nearby_select,
        Images.tabBar.ic_order_select,
        Images.tabBar.ic_mine_select,
      ],
    };
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { tabNames } = this.state;
    const { tabIconNormalNames } = this.state;
    const { tabIconSelectNames } = this.state;
    return (
      <ScrollableTabView
        style={{ flex: 1, backgroundColor: COLOR_BACKGROUND_WHITE, }}
        renderTabBar={() => (
          <ScrollableTabbar
            tabNames={tabNames}
            tabIconNormalNames={tabIconNormalNames}
            tabIconSelectNames={tabIconSelectNames}
          />
        )}
        locked={false}
        initialPage={0}
        tabBarPosition="bottom"
        prerenderingSiblingsNumber={1}
      >

        {/* 首页 */}
        <TabHomeScreen />

        <View tabLabel="page2">
          <Text>
            在 Apple 上构建任何应用
          </Text>
        </View>
        <View tabLabel="page3">
          <Text>
            在 android 上构建任何应用
          </Text>
        </View>

        <View tabLabel="page4">
          <Text>
            在 html5 上构建任何应用
          </Text>
        </View>

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
