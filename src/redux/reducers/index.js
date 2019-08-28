import { combineReducers } from 'redux';
import {
  AppRootContainer, AppInitRouteName
} from '../../navigations/AppNavigator';
import themeReducer from '../../screens/mycenter/theme/theme-reducers';
import marksReducer from '../../screens/mycenter/marks/marks-reducers';
import langusReducer from '../../screens/mycenter/langus/langus-reducers';
import popularReducer from '../../screens/popular/popular-reducers';
import trendingReducer from '../../screens/trending/trending-reducers';

/**
 * 1.指定默认state
 */
const initAction = AppRootContainer.router.getActionForPathAndParams(AppInitRouteName);
const initNavState = AppRootContainer.router.getStateForAction(initAction);

/**
 * 2.创建 navigation reducer，
 */
const navReducer = (state = initNavState, action) => {
  const nextState = AppRootContainer.router.getStateForAction(action, state);
  // 如果`nextState`为null或未定义，只需返回原始`state`
  return nextState || state;
};

/**
 * 3.合并 reducer
 */
const reducers = combineReducers({
  nav: navReducer,
  theme: themeReducer,
  marks: marksReducer,
  langus: langusReducer,
  popular: popularReducer,
  trending: trendingReducer,
});

export default reducers;
