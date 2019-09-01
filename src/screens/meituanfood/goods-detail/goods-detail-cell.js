
import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { System, Heading2, Paragraph } from '../../../common';

type Props = {
  info: Object,
  onPress: Function,
}

export default class GoodsDetailCell extends Component<Props> {
  render() {
    const { info } = this.props;
    const imageUrl = info.imageUrl.replace('w.h', '160.0');
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress(info)}
      >
        <Image
          style={styles.picture}
          source={{ uri: imageUrl }}
        />
        <View style={styles.content}>
          <Heading2>{info.title}</Heading2>
          <Paragraph numberOfLines={0} style={{ marginTop: 8 }}>{info.subtitle}</Paragraph>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Heading2 style={styles.price}>
              {info.price}
              元
            </Heading2>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: System.layout.onePixel,
    borderColor: System.theme.borderColor,
    backgroundColor: System.theme.backgroundColor,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    color: System.theme.tintColor
  }
});
