import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * 静态数据
 */
export default {

  // 我的头部
  About: {
    name: '关于',
    Icons: Ionicons,
    icon: 'logo-github'
  },
  Tutorial: {
    name: '教程',
    Icons: Ionicons,
    icon: 'ios-bookmarks'
  },

  // 最热管理
  PopularSetting: {
    name: '标签设置',
    Icons: Ionicons,
    icon: 'md-checkbox-outline'
  },
  PopularSortKey: {
    name: '标签排序',
    Icons: MaterialCommunityIcons,
    icon: 'sort'
  },
  PopularRemoveKey: {
    name: '标签移除',
    Icons: Ionicons,
    icon: 'md-remove'
  },

  // 趋势管理
  LanguageSetting: {
    name: '语言设置',
    Icons: Ionicons,
    icon: 'md-checkbox-outline'
  },
  LanguageSortKey: {
    name: '语言排序',
    Icons: MaterialCommunityIcons,
    icon: 'sort'
  },

  // 设置中心
  ThemeSetting: {
    name: '自定义主题',
    Icons: Ionicons,
    icon: 'ios-color-palette'
  },
  AboutAuthor: {
    name: '关于作者',
    Icons: Octicons,
    icon: 'smiley'
  },
  FeedbackInfo: {
    name: '反馈',
    Icons: MaterialIcons,
    icon: 'feedback'
  },
  CodePush: {
    name: '热更新',
    Icons: Ionicons,
    icon: 'ios-planet'
  },
  Share: {
    name: '分享',
    Icons: Ionicons,
    icon: 'md-share'
  },

};
