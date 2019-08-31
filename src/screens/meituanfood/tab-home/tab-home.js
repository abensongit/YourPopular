import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import {
  NavigationMeiTuanService, RouterConst, System,
} from '../../../common';
import {
  NavigationBarItem
} from '../../../components';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';
import {
  Images
} from '../../../resources';


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
        />
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
          icon={Images.home.ic_nav_message}
          onPress={() => {
            NavigationMeiTuanService.navigate(RouterConst.RouterMainMeiTuanTabContainer);
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
   * 渲染页面
   * @returns {*}
   */
  render() {
    return (
      <View style={styles.container} />
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

const AppMapDispatchToProps = dispatch => ({

});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabHomeMainScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  searchBar: {
    width: System.window.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
