import React, { Component } from 'react';
import {
  Text, StyleSheet, TouchableOpacity, ViewPropTypes
} from 'react-native';


type Props = {
  onPress: Function,
  disabled: boolean,
  style: ViewPropTypes.style,

  title: string,
  titleStyle: ViewPropTypes.style,
  activeOpacity: number
}

class ButtonCommon extends Component<Props> {
  static defaultProps = {
    disabled: false,
    activeOpacity: 0.8
  }

  render() {
    const {
      onPress, disabled, style, titleStyle, title, activeOpacity
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
      >
        <Text style={titleStyle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ButtonCommon;
