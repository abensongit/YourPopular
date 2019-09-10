import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { System } from '../../../../../common';


type Props = {}
export default class MyCustomWidgetGeolocationScreen extends Component<Props> {
  /**
   * 配置导航栏
   * @param navigation
   * @returns {{*:*}}
   */
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const title = navigation.getParam('title', '标题');
    const theme = navigation.getParam('theme', System.theme);
    return {
      title,
      headerStyle: {
        backgroundColor: theme.navBar.backgroundColor,
      },
      headerTintColor: theme.navBar.titleColor,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: theme.navBar.titleFontSize,
        fontWeight: theme.navBar.titleFontWeight,
      },
      headerRight: (
        <View />
      ),
    };
  };

  /**
   * 组件渲染完成
   */
  componentDidMount() {

  }


  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.innerContainer} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC'
  },
  innerContainer: {
    marginVertical: 30
  },
});
