import React, { Component } from 'react';
import {
  StyleSheet, View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { System } from '../../../../../common';
import { TouchableOpacityButton } from '../../../../../components';


type Props = {};
export default class ReactNativeRootToastScreen extends Component<Props> {
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

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleOnPressSubmit = (completeHandle) => {
    // Add a Toast on screen.
    const toast = Toast.show('正在提交数据', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    this.timer = setTimeout(() => {
      Toast.hide(toast);
      completeHandle();
      console.log('button enable');
    }, 1500);
  };

  handleOnPressCancle = (completeHandle) => {
    // Add a Toast on screen.
    const toast = Toast.show('正在取消操作', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    this.timer = setTimeout(() => {
      Toast.hide(toast);
      completeHandle();
    }, 1500);
  };

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    return (
      <View style={styles.container}>
        <TouchableOpacityButton
          title="提交"
          subTitle="正在提交数据"
          onPress={this.handleOnPressSubmit}
          style={[styles.button]}
          backgroundColor={theme.tintColor}
        />
        <TouchableOpacityButton
          title="取消"
          subTitle="正在取消操作"
          onPress={this.handleOnPressCancle}
          style={[styles.button]}
          backgroundColor={theme.tintColor}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
