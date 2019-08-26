
import * as Types from './theme-actions-types';
import ThemeDao from './theme-dao';

/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
  return (dispatch) => {
    new ThemeDao().getTheme().then((data) => {
      dispatch(onThemeChange(data));
    });
  };
}

/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme) {
  return {
    type: Types.ACTION_THEME_CHANGE,
    theme
  };
}

/**
 * 显示主题框
 * @param visible
 * @returns {{type: string, themeChoiceViewVisible: *}}
 */
export function onShowThemeChoiceView(visible) {
  return {
    type: Types.ACTION_THEME_SHOW_CHOICE_VIEW,
    themeChoiceViewVisible: visible
  };
}
