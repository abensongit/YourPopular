import { StyleSheet } from 'react-native';
import {
  System
} from '../../../common';
import {
  COLOR_BACKGROUND_WHITE
} from '../../../common/Variables';

export default StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e9e9ee',
  },
  container: {
    flex: 1,
    width: System.window.width,
    height: Platform.select({
      ios: System.window.height,
      android: System.window.height - System.window.statusBarHeight
    }),
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  logo: {
    alignItems: 'center',
    marginTop: System.window.statusNaviBarHeight * 1.5,
    marginBottom: 10,
  },
  icon_logo: {
    width: 100,
    height: 100,
  },
  button_login: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  button_register: {
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  }
});
