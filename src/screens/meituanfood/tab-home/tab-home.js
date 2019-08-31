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


type Props = {}
class TabHomeMainScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const headerTitleColor = navigation.getParam('headerTitleColor', System.theme.navBar.titleColor);
    const headerBackgroundColor = navigation.getParam('headerBackgroundColor', System.theme.navBar.backgroundColor);
    return {
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
      headerTitle: (
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => {
            Alert.alert('搜索');
          }}
        />
      ),
      headerLeft: (
        <NavigationBarItem
          title="福州"
          titleStyle={{ color: headerTitleColor }}
          onPress={() => {
            Alert.alert('定位');
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
      headerBackgroundColor: theme.tintColor,
      headerTitleColor: theme.navBar.titleColor,
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
