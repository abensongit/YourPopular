import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput,
} from 'react-native';
import { System } from '../../../../../common';


type Props = {}
export default class MyCustomWidgetTextInputScreen extends Component<Props> {
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

  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    return (
      <View style={[styles.flex, styles.topStatus]}>
        <Search theme={theme} />
      </View>
    );
  }
}


// 输入框组件
class Search extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  // 组件渲染
  render() {
    const { theme } = this.props;
    return (
      <View style={styles.flex}>

        {/* 输入框 + 按钮 */}
        <View style={[styles.flexDirection, styles.inputHeight]}>
          <View style={styles.flex}>
            <TextInput
              style={styles.input}
              returnKeyType="search"
              placeholder="请输入关键字"
              onChangeText={text => this.setState({ text })}
            />
          </View>
          <View style={[styles.btn, { backgroundColor: theme.tintColor }]}>
            <Text
              style={styles.search}
              onPress={() => this.search()}
            >
              搜索
            </Text>
          </View>
        </View>

        {/* 输入信息 */}
        <Text style={styles.tip}>
          已输入
          {this.state.text.length}
          个文字
        </Text>

      </View>
    );
  }

  // 搜索按钮点击
  search() {
    alert(`您输入的内容为：${this.state.text}`);
  }
}


// 样式定义
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row'
  },
  topStatus: {
    marginTop: 10,
  },
  inputHeight: {
    height: 45,
  },
  input: {
    height: 45,
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderColor: '#ccc',
    borderRadius: 4
  },
  btn: {
    width: 55,
    marginLeft: -5,
    marginRight: 5,
    backgroundColor: '#23beff',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  tip: {
    marginLeft: 5,
    marginTop: 5,
    color: '#c0c0c0',
  }
});
