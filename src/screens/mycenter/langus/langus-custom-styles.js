import { StyleSheet } from 'react-native';
import {
  System
} from '../../../common';
import {
  COLOR_BACKGROUND_DEFAULT, COLOR_BACKGROUND_WHITE
} from '../../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  checkBox: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  checkEmpty: {
    width: System.window.width * 0.5,
  },
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
