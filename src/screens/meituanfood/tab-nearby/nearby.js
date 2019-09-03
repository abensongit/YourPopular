import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Image, Text, TouchableOpacity, View,
} from 'react-native';
import {
  NavigationMeiTuanService, Paragraph, System,
} from '../../../common';
import {
  Images
} from '../../../resources';
import styles from './nearby-styles';


type Props = {}
class TabHomeMainScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const theme = navigation.getParam('theme', System.theme);
    return {
      headerStyle: {
        backgroundColor: theme.navBar.titleColor,
      },
      headerLeft: (
        <TouchableOpacity
          style={styles.addressButton}
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
        >
          <Image style={styles.addressButtonIcon} source={Images.nearby.ic_nav_address} />
          <Text style={styles.addressButtonTitle}> 福州 鼓楼</Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => {
            Alert.alert('找附近的吃喝玩乐');
          }}
        >
          <Image source={Images.home.ic_nav_search} style={styles.searchIcon} />
          <Paragraph>找附近的吃喝玩乐</Paragraph>
        </TouchableOpacity>
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
  store: state.meiTuanHome,
});

const AppMapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshMeiTuanHome(url, pageSize)) 绑定到 props
  onRefreshMeiTuanHome: (url, pageSize) => dispatch(actions.onRefreshMeiTuanHome(url, pageSize)),
  onLoadMoreMeiTuanHome: (url, pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMoreMeiTuanHome(url, pageIndex, pageSize, dataArray, callBack)),
});

export default connect(AppMapStateToProps, AppMapDispatchToProps)(TabHomeMainScreen);
