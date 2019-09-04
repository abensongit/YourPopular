import React, { Component } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import OrderMenuCellItem from './order-menu-cell-item';

type Props = {
  data: Object,
  onSelect: Function,
}

class OrderMenuCell extends Component<Props> {
  render() {
    const { data, onSelect } = this.props;
    return (
      <View style={styles.container}>
        {data && data.map((item, index) => (
          <OrderMenuCellItem
            key={`${index.toString()}${item.type}`}
            title={item.title}
            icon={item.imageUrl}
            onPress={() => {
              onSelect && onSelect(item);
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});


export default OrderMenuCell;
