import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { Heading2, Heading3, System } from '../../../common';

type Props = {
  info: Object,
  onPress: Function,
}

class HomeGridItem extends Component<Props> {
  render() {
    const { info } = this.props;
    const title = info.maintitle;
    const color = info.typeface_color;
    const subtitle = info.deputytitle;
    const imageUrl = info.imageurl.replace('w.h', '120.0');

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <View>
          <Heading2 style={{ color, marginBottom: 10 }}>{title}</Heading2>
          <Heading3>{subtitle}</Heading3>
        </View>
        <Image style={styles.icon} source={{ uri: imageUrl }} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: (System.window.width - System.layout.onePixel) / 2,
    height: System.window.width / 4,
    backgroundColor: System.theme.backgroundColor,
    borderBottomWidth: System.layout.onePixel,
    borderRightWidth: System.layout.onePixel,
    borderColor: System.theme.borderColor
  },
  icon: {
    width: System.window.width / 5,
    height: System.window.width / 5,
  }
});


export default HomeGridItem;
