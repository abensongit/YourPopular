import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

export default class TouchableOpacityButton extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      disabled: false,
    };
  }

  // 事件处理 - 启用按钮
  enable = () => {
    this.setState({
      disabled: false,
    });
  };

  // 事件处理 - 禁用按钮
  disable = () => {
    this.setState({
      disabled: true,
    });
  };

  // 事件处理 - 点击事件
  handleOnPressButton = () => {
    const { onPress } = this.props;
    this.disable();
    onPress(this.enable);
  };

  // 渲染界面
  render() {
    const { title, subTitle, backgroundColor } = this.props;
    const buttonTitle = !this.state.disabled ? title : subTitle || title;
    const btnBackgroundColor = backgroundColor || styles.button.backgroundColor;
    return (
      <TouchableOpacity
        onPress={this.handleOnPressButton}
        disabled={this.state.disabled}
      >
        <View style={[styles.button, this.state.disabled && styles.disabled, { backgroundColor: btnBackgroundColor }]}>
          <Text style={[styles.buttonNormalText, this.state.disabled && styles.buttonSelectText]}>{buttonTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


// 样式列表
const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F1F1F1',
    backgroundColor: '#f4511e',
  },
  buttonNormalText: {
    padding: 13,
    fontSize: 16,
    color: '#ffffff',
  },
  buttonSelectText: {
    padding: 13,
    fontSize: 16,
    color: '#ffffff',
  },
  disabled: {
    backgroundColor: '#dedede',
  },
});
