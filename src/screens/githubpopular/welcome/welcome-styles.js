import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_WHITE, COLOR_BACKGROUND_LIGHT
} from '../../../common/Variables';
import { System } from '../../../common';

const LOGO_SIZE = 110;
const CIRCLE_BUTTON_OFFSET = 20;

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
      android: System.window.height - System.window.statusBarHeight
    }),
  },
  circleButton: {
    marginTop: Platform.select({
      ios: System.window.statusBarHeight + CIRCLE_BUTTON_OFFSET,
      android: CIRCLE_BUTTON_OFFSET
    }),
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
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginTop: System.window.height * 0.5 - LOGO_SIZE * 0.5 - 100,
    marginRight: System.window.width * 0.5 - LOGO_SIZE * 0.5,
  },
});
