import { onLoadMarks } from '../../screens/mycenter/marks/marks-actions';
import { onLoadLanguages } from '../../screens/mycenter/langus/langus-actions';
import {
  onThemeInit,
  onThemeChange,
  onShowThemeChoiceView
} from '../../screens/mycenter/theme/theme-actions';
import {
  onRefreshPopular,
  onLoadMorePopular,
  onFlushPopularFavourite
} from '../../screens/popular/popular-actions';

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
};
