import React, { Component } from 'react';
import {
  View, StyleSheet, PixelRatio
} from 'react-native';

type Props = {
  style?: any,
}

class SpacingView extends Component<Props> {
  render() {
    return (
      <View style={[styles.spacing, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    height: 1 / PixelRatio.get() * 30,
    backgroundColor: '#e9e9ee',
  },
});

export default SpacingView;
