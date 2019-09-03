import React, { Component } from 'react';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  Paragraph, System,
} from '../../../common';
import {
  SeparatorLineView
} from '../../../components';

type Props = {
  titles: Array<string>,
  selectedIndex: number,
  onPressSelected: Function,
}

class NearbyTabHeader extends Component<Props> {
  render() {
    const { titles, selectedIndex, onPressSelected } = this.props;
    return (
      <View>
        <View style={[styles.container, { marginVertical: titles.length > 0 ? 5 : 0 }]}>
          {titles.map((title, index) => (
            <TouchableOpacity
              key={`Key${title}`}
              onPress={() => onPressSelected(index)}
              style={[styles.item, { backgroundColor: selectedIndex === index ? '#fe566d' : '#ffffff' }]}
            >
              <Paragraph style={{ color: selectedIndex === index ? '#ffffff' : '#555555' }}>
                {title}
              </Paragraph>
            </TouchableOpacity>
          ))}
        </View>
        <SeparatorLineView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: System.window.width / 4 - 10,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: System.layout.onePixel,
    borderColor: System.theme.borderColor,
  },
});

export default NearbyTabHeader;
