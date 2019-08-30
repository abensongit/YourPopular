import MarksDao from './marks-dao';
import * as Types from './marks-actions-types';

/**
 * 加载标签
 * @returns {Function}
 */
export function onLoadMarks() {
  return async (dispatch) => {
    try {
      const marks = await new MarksDao().fetch();
      dispatch({
        type: Types.ACTION_MARKS_LOAD_SUCCESS,
        marks,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
