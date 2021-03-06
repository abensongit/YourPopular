import React, { Component } from 'react';
import {
  Alert, StyleSheet, View, ScrollView
} from 'react-native';
import { System } from '../../../../../common';
import { TouchableOpacityButton } from '../../../../../components';


type Props = {}
export default class MyCustomWidgetButtonScreen extends Component<Props> {
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
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  /**
   * 事件 - 点击按钮
   */
  handleOnPressSubmitAction = (completeHandle) => {
    // 模拟延时处理
    this.timer = setTimeout(() => {
      completeHandle();
      Alert.alert('提交成功', '', [{ text: '取消' }, { text: '确定' }]);
      console.log('button enable');
    }, 1500);
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacityButton
          title="提交"
          subTitle="正在提交数据..."
          onPress={this.handleOnPressSubmitAction}
          backgroundColor={theme.tintColor}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
