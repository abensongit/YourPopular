import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, PixelRatio
} from 'react-native';

type Props = {
  style?: any,
}

class SeparatorLineView extends Component<Props> {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  line: {
    width: Dimensions.get('window').width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e9e9ee',
  },
});

export default SeparatorLineView;
