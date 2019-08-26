/**
 * React Native
 * https://github.com/facebook/react-native
 */

import { StyleSheet } from 'react-native';
import { System } from '../../common';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: System.window.navigationBarHeight,
  },
  navBarButton: {
    alignItems: 'center'
  },
  navBarTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 70,
    right: 70,
    bottom: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBar: {
    height: System.window.statusBarHeight,
  },
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
