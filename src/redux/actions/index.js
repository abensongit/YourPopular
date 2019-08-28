import { onLoadMarks } from '../../screens/mycenter/marks/marks-actions';
import { onLoadLanguages } from '../../screens/mycenter/langus/langus-actions';
import { onThemeInit, onThemeChange, onShowThemeChoiceView } from '../../screens/mycenter/theme/theme-actions';

export default {
  // 主题
  onThemeInit,
  onThemeChange,
  onShowThemeChoiceView,
  // 标签
  onLoadMarks,
  // 语言
  onLoadLanguages,
};
