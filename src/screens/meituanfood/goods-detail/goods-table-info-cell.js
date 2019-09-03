import React, { Component } from 'react';
import {
  View, StyleSheet, Image
} from 'react-native';
import {
  Heading1, Heading2, Heading3, Paragraph, System
} from '../../../common';
import {
  ButtonCommon, SpacingView, SeparatorLineView
} from '../../../components';
import {
  COLOR_BACKGROUND_WHITE
} from '../../../common/Variables';
import {
  Images
} from '../../../resources';


type Props = {
  goodsModel: Object,
  onSelect: Function,
}

export default class GoodsTableItemCell extends Component<Props> {
  render() {
    const { theme, goodsModel, onSelect } = this.props;
    return (
      <View style={styles.container}>

        {/* 图片+价格+按钮 */}
        <View>
          <Image style={styles.banner} source={{ uri: goodsModel.imageUrl.replace('w.h', '480.0') }} />
          <View style={styles.topContainer}>
            <Heading2 style={{ color: theme.tintColor }}>￥</Heading2>
            <Heading1 style={{ color: theme.tintColor, marginBottom: -8 }}>{goodsModel.price}</Heading1>
            <Paragraph style={{ marginLeft: 10 }}>
              门市价：￥
              {(goodsModel.price * 1.1).toFixed(0)}
            </Paragraph>
            <View style={{ flex: 1 }} />
            <ButtonCommon
              title="立即抢购"
              titleStyle={{ color: 'white', fontSize: 17 }}
              style={styles.buyButton}
              onPress={onSelect}
            />
          </View>
        </View>

        <SeparatorLineView />

        {/* 随时退 */}
        <View>
          <View style={styles.tagContainer}>
            <Image style={{ width: 20, height: 20 }} source={Images.purchase.ic_deal_anytime} />
            <Paragraph style={{ color: '#89B24F' }}>  随时退</Paragraph>
            <View style={{ flex: 1 }} />
            <Paragraph>
              已售
              {1234}
            </Paragraph>
          </View>
        </View>

        <SpacingView />

        {/* 推荐标题 */}
        <View style={styles.tipHeader}>
          <Heading3>看了本团购的用户还看了</Heading3>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  banner: {
    width: System.window.width,
    height: System.window.width * 0.5,
  },
  topContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buyButton: {
    backgroundColor: '#fc9e28',
    width: 94,
    height: 36,
    borderRadius: 7,
  },
  tagContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  tipHeader: {
    height: 40,
    justifyContent: 'center',
    borderWidth: System.onePixel,
    borderColor: System.theme.borderColor,
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white'
  }
});
