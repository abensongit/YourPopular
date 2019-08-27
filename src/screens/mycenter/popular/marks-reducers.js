import * as Types from './marks-actions-types';

const defaultState = {
  marks: [],
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_MARKS_LOAD_SUCCESS: {
      return {
        ...state,
        marks: action.marks,
      };
    }
    default: {
      return state;
    }
  }
}
