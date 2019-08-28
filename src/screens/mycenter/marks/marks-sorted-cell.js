
import React, { Component } from 'react';
import {
  Text, TouchableHighlight, View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './marks-storted-styles';


type Props = {};
export default class SortedTableCell extends Component<Props> {
  render() {
    const { theme, data } = this.props;
    return (
      <TouchableHighlight
        underlayColor="#eee"
        style={data.checked ? styles.cellItem : styles.cellHidden}
        {...this.props.sortHandlers}
      >
        <View style={{ marginLeft: 10, flexDirection: 'row' }}>
          <MaterialCommunityIcons
            name="sort"
            size={18}
            style={{ marginRight: 10, color: theme.themeColor }}
          />
          <Text>{data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
