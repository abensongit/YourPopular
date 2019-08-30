import * as Types from './langus-actions-types';

const defaultState = {
  languages: [],
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_LANGUAGES_LOAD_SUCCESS: {
      return {
        ...state,
        languages: action.languages,
      };
    }
    default: {
      return state;
    }
  }
}
