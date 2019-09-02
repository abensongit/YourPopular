import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { Heading2, Paragraph, System } from '../../../common';

type Props = {
  goodsModel: Object,
  onSelect: Function,
}

export default class GoodsDetailCell extends Component<Props> {
  render() {
    const { theme } = this.props;
    const { goodsModel } = this.props;
    const imageUrl = goodsModel.imageUrl.replace('w.h', '160.0');
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onSelect(goodsModel)}
      >
        <Image
          style={styles.picture}
          source={{ uri: imageUrl }}
        />
        <View style={styles.content}>
          <Heading2>{goodsModel.title}</Heading2>
          <Paragraph numberOfLines={0} style={{ marginTop: 8 }}>{goodsModel.subtitle}</Paragraph>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Heading2 style={[styles.price, { color: theme.tintColor }]}>
              {goodsModel.price}
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
    borderColor: System.theme.borderColor,
    borderBottomWidth: System.layout.onePixel * 1.5,
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
