import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, ViewPropTypes
} from 'react-native';
import { Heading3, Paragraph } from '../../../common';
import { SeparatorLineView } from '../../../components';
import { Images } from '../../../resources';

type Props = {
  data: Object,
  onSelect: Function,
  style?: ViewPropTypes.style,
}

class MyCenterCell extends Component<Props> {
  render() {
    const { data, onSelect } = this.props;
    const icon = data.image && <Image style={styles.icon} source={data.image} />;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onSelect && onSelect(data);
          }}
        >
          <View style={[styles.content, this.props.style]}>
            {icon}
            <Heading3>{data.title}</Heading3>
            <View style={{ flex: 1, backgroundColor: 'blue' }} />
            <Paragraph style={{ color: '#999999' }}>{data.subtitle}</Paragraph>
            <Image style={styles.arrow} source={Images.mine.ic_cell_arrow} />
          </View>
          <SeparatorLineView />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  arrow: {
    width: 14,
    height: 14,
    marginLeft: 5,
  }
});


export default MyCenterCell;
