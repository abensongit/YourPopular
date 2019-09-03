import { StyleSheet } from 'react-native';
import {
  COLOR_BACKGROUND_DEFAULT,
} from '../../../common/Variables';
import { System } from '../../../common';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
  },
  addressButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  addressButtonIcon: {
    width: 15,
    height: 18,
  },
  addressButtonTitle: {
    fontSize: System.theme.navBar.buttonTextFontSize,
    color: '#333333',
    marginLeft: 2,
  },
  searchBar: {
    width: System.window.width * 0.65,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND_DEFAULT,
    alignSelf: 'center',
    marginRight: 20,
  },
  searchIcon: {
    width: 18,
    height: 18,
    margin: 5,
  },
  tabBarText: {
    fontSize: 14,
    marginTop: 13,
  },
  tabBarUnderline: {
    backgroundColor: '#fe566d'
  },
});
