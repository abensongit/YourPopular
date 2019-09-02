import React, { Component } from 'react';
import {
  StyleSheet, Image, TouchableOpacity
} from 'react-native';
import {
  Heading3, System
} from '../../../common';

type Props = {
  icon: any,
  title: string,
  onPress: Function,
}

class HomeMenuCellItem extends Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <Image source={this.props.icon} resizeMode="contain" style={styles.icon} />
        <Heading3>
          {this.props.title}
        </Heading3>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: System.window.width / 5,
    height: System.window.width / 5,
  },
  icon: {
    width: System.window.width / 9,
    height: System.window.width / 9,
    margin: 5,
  }
});


export default HomeMenuCellItem;
