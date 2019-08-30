
import React, { Component } from 'react';
import {
  Alert, StyleSheet, TouchableOpacity, View, Image
} from 'react-native';
import {
  System
} from '../../../common';
import {
  NavigationBarItem
} from '../../../components';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';


type Props = {

}

type State = {

}

export default class HomeMainScreen extends Component<Props, State> {
  /**
   *
   * @param navigation
   * @returns {{headerLeft: *, headerTitle: *}}
   */
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#fcc',
    },
    headerTitle: (
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => {
          Alert.alert('搜索');
        }}
      />
    ),
    headerLeft: (
      <NavigationBarItem
        title="福州"
        titleStyle={{ color: System.theme.nav.headerTintColor }}
        onPress={() => {
          Alert.alert('定位');
        }}
      />
    ),
  });

  render() {
    return (
      <View style={styles.container} />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  searchBar: {
    width: System.window.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
