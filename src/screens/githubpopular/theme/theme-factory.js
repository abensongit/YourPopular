import { StyleSheet, } from 'react-native';
import {
  System,
} from '../../../common';

export const ThemeFlags = {
  Default: '#54B1DE',
  Red: '#F44336',
  Pink: '#E91E63',
  Purple: '#9C27B0',
  DeepPurple: '#673AB7',
  Indigo: '#3F51B5',
  Blue: '#2196F3',
  LightBlue: '#03A9F4',
  Cyan: '#00BCD4',
  Teal: '#009688',
  Green: '#4CAF50',
  LightGreen: '#8BC34A',
  Lime: '#CDDC39',
  Yellow: '#FFEB3B',
  Amber: '#FFC107',
  Orange: '#FF9800',
  DeepOrange: '#FF5722',
  Brown: '#795548',
  Grey: '#9E9E9E',
  BlueGrey: '#607D8B',
  Black: '#000000'
};

export default class ThemeFactory {
  /**
   * 创建一个主题样式
   * @param themeFlag
   * @returns {{themeColor: *, styles: *}}
   */
  static createTheme(themeFlag) {
    return {
      tintColor: themeFlag,
      themeColor: themeFlag,
      navBar: {
        tintColor: themeFlag,
        backgroundColor: themeFlag,
        buttonBackTitle: System.theme.navBar.buttonBackTitle,
        buttonTextColor: System.theme.navBar.buttonTextColor,
        buttonTextFontSize: System.theme.navBar.buttonTextFontSize,
        buttonTextFontWeight: System.theme.navBar.buttonTextFontWeight,
        titleColor: System.theme.navBar.titleColor,
        titleFontSize: System.theme.navBar.titleFontSize,
        titleFontWeight: System.theme.navBar.titleFontWeight,
      },
      tabBar: {
        tintColor: themeFlag,
        backgroundColor: System.theme.tabBar.backgroundColor,
        textNormalColor: System.theme.tabBar.textNormalColor,
        textFontSize: System.theme.tabBar.textFontSize,
        textSelectColor: themeFlag,
        iconNormalColor: System.theme.tabBar.iconNormalColor,
        iconSelectColor: themeFlag,
      },
      styles: StyleSheet.create({
        navBar: {
          backgroundColor: themeFlag,
        },
      }),
    };
  }
}