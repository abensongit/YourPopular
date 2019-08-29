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
  items: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: COLOR_BACKGROUND_WHITE,
    width: System.window.width * 0.5,
    height: 50,
  },
  checkBox: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
