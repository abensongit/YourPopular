import { combineReducers } from 'redux';
import {
  AppRootContainer, AppInitRouteName
} from '../../navigations/AppNavigator';
/**
 * GitPopular
 */
import themeReducer from '../../screens/githubpopular/mycenter/theme/theme-reducers';
import marksReducer from '../../screens/githubpopular/mycenter/marks/marks-reducers';
import langusReducer from '../../screens/githubpopular/mycenter/langus/langus-reducers';
import popularReducer from '../../screens/githubpopular/popular/popular-reducers';
import trendingReducer from '../../screens/githubpopular/trending/trending-reducers';
import favouriteReducer from '../../screens/githubpopular/favourite/favourite-reducers';
/**
 * MeiTuanFood
 */
import meiTuanHomeReducer from '../../screens/meituanfood/tab-home/home-reducers';
import meiTuanNearbyReducer from '../../screens/meituanfood/tab-nearby/nearby-tab-reducers';
import meiTuanGoodsDetailReducer from '../../screens/meituanfood/goods-detail/goods-detail-reducers';

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
  favourite: favouriteReducer,

  meiTuanHome: meiTuanHomeReducer,
  meiTuanNearby: meiTuanNearbyReducer,
  meiTuanGoodsDetail: meiTuanGoodsDetailReducer,
});

export default reducers;
