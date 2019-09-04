import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT,
} from '../../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  header: {
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
    padding: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6'
  }
});
