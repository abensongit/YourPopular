import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, PixelRatio, ScrollView
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

  /**
   * 渲染页面
   * @returns {*}
   */
  render() {
    const theme = this.props.navigation.getParam('theme', System.theme);
    return (
      <ScrollView style={[styles.flex]}>
        <View style={[styles.flex, styles.topStatus]}>
          <Search theme={theme} />
        </View>
        <View style={[styles.flex, styles.topStatus]}>
          <AutoExpandingTextInput />
        </View>
      </ScrollView>
    );
  }
}


// 输入框组件
class Search extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      show: false,
    };
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
              value={this.state.text}
              onChangeText={text => this.textChange(text)}
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
        {this.state.show
          ? (
            <View style={styles.list}>
              <Text
                onPress={() => this.hideList(`${this.state.text}网站`)}
                style={styles.item}
                numberOfLines={1}
              >
                {this.state.text}
                网站
              </Text>
              <Text
                onPress={() => this.hideList(`${this.state.text}文章`)}
                style={styles.item}
                numberOfLines={1}
              >
                {this.state.text}
                文章
              </Text>
              <Text
                onPress={() => this.hideList(`${this.state.text}最新消息`)}
                style={styles.item}
                numberOfLines={1}
              >
                {this.state.text}
                最新消息
              </Text>
            </View>
          )
          : null
        }

      </View>
    );
  }

  // 输入框文字改变
  textChange(text) {
    this.setState({
      show: text !== '',
      text
    });
  }

  // 隐藏自动提示列表
  hideList(text) {
    this.setState({
      show: false,
      text
    });
  }

  // 搜索按钮点击
  search() {
    alert(`您输入的内容为：${this.state.text}`);
  }
}


// 自定义的高度动态调整组件
class AutoExpandingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  onContentSizeChange(event) {
    this.setState({
      height: event.nativeEvent.contentSize.height,
    });
  }

  render() {
    return (
      <View style={styles.flex}>
        <TextInput
          {...this.props} // 将自定义组件的所有属性交给TextInput
          multiline
          placeholder="请输入关键字"
          onContentSizeChange={event => this.onContentSizeChange(event)}
          style={[styles.textInputStyle, {
            paddingHorizontal: 5,
            paddingTop: 10,
            paddingBottom: 10,
            height: Math.max(45, this.state.height),
          }]}
        />
      </View>
    );
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
    fontWeight: 'bold',
  },
  list: {
    marginTop: 1 / PixelRatio.get(),
    marginLeft: 5,
    marginRight: 5,
    height: 135,
    borderColor: '#ccc',
    borderTopWidth: 1 / PixelRatio.get(),
  },
  item: {
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ddd',
    borderTopWidth: 0,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
