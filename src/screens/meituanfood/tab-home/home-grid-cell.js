import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { System } from '../../../common';
import HomeGridCellItem from './home-grid-cell-item';

type Props = {
  gridInfos: Array<Object>,
  onSelect: Function,
}

class HomeGridCell extends Component<Props> {
  render() {
    const { gridInfos, onSelect } = this.props;
    return (
      <View style={styles.container}>
        {gridInfos.map((info, index) => (
          <HomeGridCellItem
            info={info}
            key={info.title}
            onPress={() => {
              onSelect && onSelect(info, index);
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: System.layout.onePixel,
    borderLeftWidth: System.layout.onePixel,
    borderBottomWidth: System.layout.onePixel,
    borderColor: System.theme.borderColor
  },
});

export default HomeGridCell;
