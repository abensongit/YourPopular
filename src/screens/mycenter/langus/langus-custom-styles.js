import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_WHITE
} from '../../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  item: {
    flexDirection: 'row',
  },
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
});
