import { StyleSheet } from 'react-native';
import {
  System
} from '../../common';
import {
  COLOR_BACKGROUND_WHITE
} from '../../common/Variables';

export default StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e9e9ee',
  },
  container: {
    flex: 1,
    width: System.window.width,
    height: System.window.height,
    backgroundColor: COLOR_BACKGROUND_WHITE,
  },
  logo: {
    alignItems: 'center',
    marginTop: System.window.statusNaviBarHeight * 1.5,
    marginBottom: 10,
  },
  icon_logo: {
    width: 110,
    height: 110,
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