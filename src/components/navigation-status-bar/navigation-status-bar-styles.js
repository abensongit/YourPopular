import { StyleSheet, Platform } from 'react-native';
import { System } from '../../common';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  statusBar: {
    height: Platform.select({
      ios: System.window.statusBarHeight,
      android: 0,
    }),
  },
});
