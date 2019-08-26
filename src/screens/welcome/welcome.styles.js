/**
 * React Native
 * https://github.com/facebook/react-native
 */

import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_WHITE, COLOR_BACKGROUND_LIGHT
} from '../../common/Variables';
import { System } from '../../common';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_BACKGROUND_LIGHT,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: COLOR_BACKGROUND_WHITE,
    width: System.window.width,
    height: Platform.select({
      ios: System.window.height,
      android: System.window.height + System.window.navigationBarHeight
    }),
  },
  circleButton: {
    marginTop: System.window.statusBarHeight + 20,
    marginRight: 15,
  },
  circleProgress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTitle: {
    fontSize: 12,
    paddingLeft: 2,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: System.window.height / 2 - 100 - System.window.statusBarHeight,
    marginRight: System.window.width / 2 - 40,
  },
});
