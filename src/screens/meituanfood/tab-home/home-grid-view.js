import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { System } from '../../../common';
import HomeGridItem from './home-grid-item';

type Props = {
  gridInfos: Array<Object>,
  onGridItemSelected: Function,
}

class HomeGridView extends Component<Props> {
  render() {
    const { gridInfos } = this.props;
    return (
      <View style={styles.container}>
        {gridInfos.map((info, index) => (
          <HomeGridItem
            info={info}
            key={info.title}
            onPress={() => this.props.onGridItemSelected(index)}
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
    borderColor: System.theme.borderColor
  },
});

export default HomeGridView;
