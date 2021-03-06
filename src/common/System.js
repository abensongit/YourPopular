import {
  Dimensions, PixelRatio, Platform
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import SystemIPhone from './SystemIPhone';
import { COLOR_DEFAULT, COLOR_BACKGROUND_WHITE } from './Variables';

// String
export const IOS = 'ios';
export const ANDROID = 'android';

// Screen
export const SCREEN_WIDTH = Platform.select({
  ios: Dimensions.get('window').width,
  android: ExtraDimensions.getRealWindowWidth(),
});
export const SCREEN_HEIGHT = Platform.select({
  ios: Dimensions.get('window').height,
  android: ExtraDimensions.getRealWindowHeight(),
});

// Status Navigation TabBar Height => iPhone
export const IPHONE_DANGER_AREA_TOP_HEIGHT = (SystemIPhone.isIPhoneXsOrGreater ? 44 : 0);
export const IPHONE_DANGER_AREA_BOTTOM_HEIGHT = (34);
export const IPHONE_STATUS_BAR_HEIGHT = (SystemIPhone.isIPhoneXsOrGreater ? 44 : 20);
export const IPHONE_NAVIGATION_BAR_HEIGHT = (44);
export const IPHONE_STATUS_NAVIGATION_BAR_HEIGHT = (IPHONE_STATUS_BAR_HEIGHT + IPHONE_NAVIGATION_BAR_HEIGHT);
export const IPHONE_TABBAR_HEIGHT = (48);
export const IPHONE_TABBAR_DANGER_AREA_HEIGHT = (IPHONE_TABBAR_HEIGHT + IPHONE_DANGER_AREA_BOTTOM_HEIGHT);
export const IPHONE_SOFT_MENU_BAR_HEIGHT = (0);

// Status Navigation TabBar Height => Android
export const ANDROID_DANGER_AREA_TOP_HEIGHT = (0);
export const ANDROID_DANGER_AREA_BOTTOM_HEIGHT = (0);
export const ANDROID_STATUS_BAR_HEIGHT = (ExtraDimensions.getStatusBarHeight());
export const ANDROID_NAVIGATION_BAR_HEIGHT = (56);
export const ANDROID_STATUS_NAVIGATION_BAR_HEIGHT = (ANDROID_STATUS_BAR_HEIGHT + ANDROID_NAVIGATION_BAR_HEIGHT);
export const ANDROID_TABBAR_HEIGHT = (50);
export const ANDROID_TABBAR_DANGER_AREA_HEIGHT = (ANDROID_TABBAR_HEIGHT + ANDROID_DANGER_AREA_BOTTOM_HEIGHT);
export const ANDROID_SOFT_MENU_BAR_HEIGHT = (ExtraDimensions.getSoftMenuBarHeight());

// 系统设置
export default {
  IOS,
  ANDROID,

  isIPhoneXs: SystemIPhone.isIPhoneXs,
  isIPhoneXsMax: SystemIPhone.isIPhoneXsMax,
  isIPhoneXsOrGreater: SystemIPhone.isIPhoneXsOrGreater,

  layout: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    onePixel: 1 / PixelRatio.get(),
  },

  window: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    statusBarHeight: Platform.select({
      ios: IPHONE_STATUS_BAR_HEIGHT,
      android: ANDROID_STATUS_BAR_HEIGHT,
    }),
    navigationBarHeight: Platform.select({
      ios: IPHONE_NAVIGATION_BAR_HEIGHT,
      android: ANDROID_NAVIGATION_BAR_HEIGHT,
    }),
    statusNaviBarHeight: Platform.select({
      ios: IPHONE_STATUS_NAVIGATION_BAR_HEIGHT,
      android: ANDROID_STATUS_NAVIGATION_BAR_HEIGHT,
    }),
    tabBarHeight: Platform.select({
      ios: IPHONE_TABBAR_HEIGHT,
      android: ANDROID_TABBAR_HEIGHT,
    }),
    tabBarDangerHeight: Platform.select({
      ios: IPHONE_TABBAR_DANGER_AREA_HEIGHT,
      android: ANDROID_TABBAR_DANGER_AREA_HEIGHT,
    }),
    softMenuBarHeight: Platform.select({
      ios: IPHONE_SOFT_MENU_BAR_HEIGHT,
      android: ANDROID_SOFT_MENU_BAR_HEIGHT,
    }),
    dangerAreaTopHeight: Platform.select({
      ios: IPHONE_DANGER_AREA_TOP_HEIGHT,
      android: ANDROID_DANGER_AREA_TOP_HEIGHT,
    }),
    dangerAreaBottomHeight: Platform.select({
      ios: IPHONE_DANGER_AREA_BOTTOM_HEIGHT,
      android: ANDROID_DANGER_AREA_BOTTOM_HEIGHT,
    }),
  },

  theme: {
    tintColor: COLOR_DEFAULT,
    borderColor: '#e0e0e0',
    separatorColor: '#f3f3f3',
    backgroundColor: COLOR_BACKGROUND_WHITE,
    navBar: {
      tintColor: COLOR_DEFAULT,
      backgroundColor: COLOR_DEFAULT,
      buttonBackTitle: '返回',
      buttonTextColor: '#FFFFFF',
      buttonTextFontSize: 15,
      buttonTextFontWeight: 'normal',
      titleColor: '#FFFFFF',
      titleFontSize: 18,
      titleFontWeight: 'bold',
    },
    tabBar: {
      tintColor: COLOR_DEFAULT,
      backgroundColor: '#FFFFFF',
      textFontSize: 11,
      textNormalColor: '#8E8E93',
      textSelectColor: COLOR_DEFAULT,
      iconNormalColor: '#8E8E93',
      iconSelectColor: COLOR_DEFAULT,
    },
  },

};
