import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  cellItem: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 50,
    justifyContent: 'center'
  },
  cellHidden: {
    height: 0
  },
});
