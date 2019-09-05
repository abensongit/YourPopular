import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, StyleSheet, View, Text, NativeModules, NativeEventEmitter
} from 'react-native';
import { System } from '../../../../../common';
import { TouchableOpacityButton } from '../../../../../components';


type Props = {}
class NativeToJavaScriptScreen extends Component<Props> {
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
    this.state = {
      dataSource: '',
    };
  }

  // 在组件的生命周期中绑定
  componentWillMount() {
    this.NativeToJSPresenter = new NativeEventEmitter(NativeModules.NativeToJSPresenter);
    this.NativeToJSPresenter.addListener('callReatNativeJS', (data) => {
      this.setState({
        dataSource: `${data.title} \n ${data.content}`
      });
    });
  }

  // 在组件的生命周期中解绑
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    if (this.NativeToJSPresenter) {
      this.NativeToJSPresenter.removeListener('callReatNativeJS');
    }
    this.NativeToJSPresenter = null;
  }

  // React Native => Native 通信并回调
  handleReactNativeToObjectCAction = (completeHandle) => {
    // 模拟延时处理
    this.timer = setTimeout(() => {
      const JSBridge = NativeModules.JSBridgeModule;
      JSBridge.sendMessage({ param: 'Submit Action' }).then((data) => {
        Alert.alert(data, '', [{ text: '取消' }, { text: '确定' }]);
      });
      completeHandle();
    }, 500);
  };

  // React Native => Native 通信并回调
  handleReactNativeToObjectCThenCallbackAction = (completeHandle) => {
    // 模拟延时处理
    this.timer = setTimeout(() => {
      const JSBridge = NativeModules.JSBridgeModule;
      JSBridge.sendWithCallback((error, data) => {
        if (error) {
          Alert.alert(error, data);
        } else {
          Alert.alert(error, `ReactNative => Native => ${data}`, [{ text: '取消' }, { text: '确定' }]);
        }
      });
      // 模拟延时处理
      completeHandle();
    }, 1000);
  };

  // React Native => Native 通信并回调 => React Native
  handleObjectCToJavaScriptAction = (completeHandle) => {
    // 模拟延时处理
    this.timer = setTimeout(() => {
      const JSBridge = NativeModules.JSBridgeModule;
      JSBridge.sendMessage({ param: '原生OC调用RN方法' }).then((data) => {
        Alert.alert(data, '', [{ text: '取消' }, { text: '确定' }]);
      });
      // 模拟延时处理
      completeHandle();
    }, 1000);
  };

  render() {
    const content = this.state.dataSource ? this.state.dataSource : '数据为空';
    const theme = this.props.navigation.getParam('theme', System.theme);
    return (
      <View style={styles.container}>
        <TouchableOpacityButton
          title="RN调用OC原生方法"
          subTitle="RN调用原生方法"
          onPress={this.handleReactNativeToObjectCAction}
          backgroundColor={theme.tintColor}
        />
        <TouchableOpacityButton
          title="RN调用OC原生方法并回调"
          subTitle="RN调用OC并回调"
          onPress={this.handleReactNativeToObjectCThenCallbackAction}
          backgroundColor={theme.tintColor}
        />
        <TouchableOpacityButton
          title="RN调用OC方法，OC方法调用RN方法"
          subTitle="RN调用OC方法，OC方法调用RN方法"
          onPress={this.handleObjectCToJavaScriptAction}
          backgroundColor={theme.tintColor}
        />
        <View style={styles.content}>
          <Text style={styles.p}>{content}</Text>
        </View>
      </View>
    );
  }
}


const AppMapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(AppMapStateToProps)(NativeToJavaScriptScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    padding: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 80,
  },
  p: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
});