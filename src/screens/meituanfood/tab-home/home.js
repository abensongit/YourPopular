import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Image, TouchableOpacity, View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  NavigationMeiTuanService, Paragraph, RouterConst, System,
} from '../../../common';
import {
  NavigationBarItem,
} from '../../../components';
import {
  Images
} from '../../../resources';
import styles from './home-styles';


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
        >
          <Image source={Images.home.ic_nav_search} style={styles.searchIcon} />
          <Paragraph>搜索</Paragraph>
        </TouchableOpacity>
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
          iconType={Feather}
          iconName="menu"
          iconSize={24}
          iconStyle={{ alignSelf: 'center', color: 'white', }}
          onPress={() => {
            NavigationMeiTuanService.openDrawer();
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
