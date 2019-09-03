import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Image, Text, TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  Paragraph, System,
} from '../../../common';
import {
  Images
} from '../../../resources';
import styles from './nearby-styles';
import NearbyTabScreen from './nearby-tab';

const TITLES = ['享美食', '住酒店', '爱玩乐', '全部'];
const TITLES_TYPES = [
  ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
  ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
  ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '电影院', '美发', '美甲'],
  []
];

type Props = {}
class TabNearbyMainScreen extends Component<Props> {
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
            Alert.alert(
              '找附近的吃喝玩乐',
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
    // 标签页面
    const tabItemPages = TITLES.map((title, index) => (
      <NearbyTabScreen
        key={`Key${title}`}
        tabLabel={title}
        types={TITLES_TYPES[index]}
        navigation={this.props.navigation}
      />
    ));
    return (
      <ScrollableTabView
        style={styles.container}
        tabBarBackgroundColor="#ffffff"
        tabBarActiveTextColor="#fe566d"
        tabBarInactiveTextColor="#555555"
        tabBarTextStyle={styles.tabBarText}
        tabBarUnderlineStyle={styles.tabBarUnderline}
      >
        {tabItemPages}
      </ScrollableTabView>
    );
  }
}

const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(AppMapStateToProps)(TabNearbyMainScreen);
