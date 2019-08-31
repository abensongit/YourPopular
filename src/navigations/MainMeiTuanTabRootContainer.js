import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import IconOfIonicons from 'react-native-vector-icons/Ionicons';
import IconOfAntDesign from 'react-native-vector-icons/AntDesign';
import IconOfFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOfMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Images } from '../resources';
import {
  ScrollableTabbar,
} from '../components';
import {
  COLOR_BACKGROUND_DEFAULT,
} from '../common/Variables';

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
      tabIconTypes: [IconOfAntDesign, IconOfIonicons, IconOfMaterialIcons, IconOfFontAwesome],
      tabIconNames: ['github', 'md-trending-up', 'favorite', 'user-circle'],
    };
  }

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const { theme } = this.props;
    const { tabNames, tabIconTypes, tabIconNames } = this.state;
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
