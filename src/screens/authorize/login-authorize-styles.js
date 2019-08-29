import { Platform, StyleSheet } from 'react-native';
import {
  System
} from '../../common';
import {
  COLOR_BACKGROUND_WHITE
} from '../../common/Variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: System.window.width,
    height: System.window.height,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  rootview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e9e9ee',
  },
  logo: {
    alignItems: 'center',
    marginTop: Platform.select({ ios: System.window.statusNaviBarHeight, android: 44 }),
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
