
import * as Types from './theme-actions-types';
import { ThemeFlags, ThemeFactory } from '../../resources';

const defaultState = {
  theme: ThemeFactory.createTheme(ThemeFlags.Default),
  themeChoiceViewVisible: false,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_THEME_INIT: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case Types.ACTION_THEME_CHANGE: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case Types.ACTION_THEME_SHOW_CHOICE_VIEW: {
      return {
        ...state,
        themeChoiceViewVisible: action.themeChoiceViewVisible,
      };
    }
    default: {
      return state;
    }
  }
}
