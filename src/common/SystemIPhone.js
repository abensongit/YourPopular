import { Dimensions, Platform } from 'react-native';

// Screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// iPhone X 或 Xs
const IPHONE_XS_DEVICE_WIDTH = 375;
const IPHONE_XS_DEVICE_HEIGHT = 812;

// iPhone Xr 或 XsMaX
const IPHONE_XSMAX_DEVICE_WIDTH = 414;
const IPHONE_XSMAX_DEVICE_HEIGHT = 896;

// 判断是否为iPhoneX或Xs
function isIPhoneXs() {
  return (
    Platform.OS === 'ios'
    && ((SCREEN_WIDTH === IPHONE_XS_DEVICE_WIDTH && SCREEN_HEIGHT === IPHONE_XS_DEVICE_HEIGHT)
      || (SCREEN_WIDTH === IPHONE_XS_DEVICE_HEIGHT && SCREEN_HEIGHT === IPHONE_XS_DEVICE_WIDTH))
  );
}

// 判断是否为iPhoneXr或XsMaX
function isIPhoneXsMax() {
  return (
    Platform.OS === 'ios'
    && ((SCREEN_WIDTH === IPHONE_XSMAX_DEVICE_WIDTH && SCREEN_HEIGHT === IPHONE_XSMAX_DEVICE_HEIGHT)
      || (SCREEN_WIDTH === IPHONE_XSMAX_DEVICE_HEIGHT && SCREEN_HEIGHT === IPHONE_XSMAX_DEVICE_WIDTH))
  );
}

// 判断是否为iPhoneXs或iPhoneXr或iPhoneXsMaX
function isIPhoneXsOrGreater() {
  return (
    Platform.OS === 'ios' && (isIPhoneXs() || isIPhoneXsMax())
  );
}

// 系统设置
export default {
  isIPhoneXs: isIPhoneXs(),
  isIPhoneXsMax: isIPhoneXsMax(),
  isIPhoneXsOrGreater: isIPhoneXsOrGreater(),
};
