import LangusDao from './langus-dao';
import * as Types from './langus-actions-types';

/**
 * 加载语言
 * @returns {Function}
 */
export function onLoadLanguages() {
  return async (dispatch) => {
    try {
      const languages = await new LangusDao().fetch();
      dispatch({
        type: Types.ACTION_LANGUAGES_LOAD_SUCCESS,
        languages,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
