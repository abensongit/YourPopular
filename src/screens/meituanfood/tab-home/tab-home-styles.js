import { Platform, StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT,
} from '../../../common/Variables';
import { System } from '../../../common';

const SEARCH_BAR_HEIGHT = Platform.select({
  ios: System.window.navigationBarHeight * 0.65,
  android: System.window.navigationBarHeight * 0.58
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  searchBar: {
    width: System.window.width * 0.7,
    height: SEARCH_BAR_HEIGHT,
    borderRadius: SEARCH_BAR_HEIGHT * 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  searchIcon: {
    width: SEARCH_BAR_HEIGHT * 0.6,
    height: SEARCH_BAR_HEIGHT * 0.6,
    margin: 5,
  },
});
