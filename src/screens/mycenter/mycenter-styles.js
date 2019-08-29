import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT
} from '../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  menuItemAbout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 80,
    padding: 10,
  },
  menuItemAboutLeft: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'gray'
  },
  spearatorLine: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  buttonLoginOut: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 15,
    height: 45,
  }
});
