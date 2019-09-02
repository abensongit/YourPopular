/**
 * GitPopular
 */
import {
  onLoadMarks
} from '../../screens/githubpopular/mycenter/marks/marks-actions';
import {
  onLoadLanguages
} from '../../screens/githubpopular/mycenter/langus/langus-actions';
import {
  onThemeInit,
  onThemeChange,
  onShowThemeChoiceView
} from '../../screens/githubpopular/mycenter/theme/theme-actions';
import {
  onRefreshPopular,
  onLoadMorePopular,
  onFlushPopularFavourite
} from '../../screens/githubpopular/popular/popular-actions';
import {
  onRefreshTrending,
  onLoadMoreTrending,
  onFlushTrendingFavourite
} from '../../screens/githubpopular/trending/trending-actions';
import {
  onRefreshFavourite,
  onLoadMoreFavourite,
  onFlushFavourite
} from '../../screens/githubpopular/favourite/favourite-actions';


/**
 * MeiTuanFood
 */
import {
  onRefreshMeiTuanHome,
  onLoadMoreMeiTuanHome,
} from '../../screens/meituanfood/tab-home/home-actions';


/**
 * 导出
 */
export default {
  // 主题
  onThemeInit,
  onThemeChange,
  onShowThemeChoiceView,

  // 标签
  onLoadMarks,
  // 语言
  onLoadLanguages,

  // 最热
  onRefreshPopular,
  onLoadMorePopular,
  onFlushPopularFavourite,

  // 趋势
  onRefreshTrending,
  onLoadMoreTrending,
  onFlushTrendingFavourite,

  // 收藏
  onRefreshFavourite,
  onLoadMoreFavourite,
  onFlushFavourite,

  // 美团 - 主页
  onRefreshMeiTuanHome,
  onLoadMoreMeiTuanHome,
};
