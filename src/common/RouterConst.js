/**
 * 全局导航路由常量
 */

export default {
  // SwitchNavigator
  RouterWelcomeScreen: 'RouterWelcomeScreen', // 欢迎页
  RouterAuthorizeScreen: 'RouterAuthorizeScreen', // 登录验证
  RouterLoginAuthorizeScreen: 'RouterLoginAuthorizeScreen', // 登录页面
  RouterMainDrawerContainer: 'RouterMainDrawerContainer', // 抽屉导航容器

  // SwitchNavigator -> DrawerNavigator
  RouterDrawerPopularNavigator: 'RouterDrawerPopularNavigator', // 最热栈导航器
  RouterDrawerMeiTuanNavigator: 'RouterDrawerMeiTuanNavigator', // 美团栈导航器
  RouterDrawerOtherNavigator: 'RouterDrawerOtherNavigator', // 其它栈导航器

  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator
  RouterMainPopularStackContainer: 'RouterMainPopularStackContainer', // 主导航容器
  RouterThemeCustomModalScreen: 'RouterThemeCustomModalScreen', // 主题页面

  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  RouterMainPopularTabContainer: 'RouterMainPopularTabContainer', // Tab导航器
  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator -> MainPopularTabNavigator
  RouterPopularScreen: 'RouterPopularScreen', // 最热页面
  RouterTrendingScreen: 'RouterTrendingScreen', // 趋势页面
  RouterFavouriteScreen: 'RouterFavouriteScreen', // 收藏页面
  RouterMyCenterScreen: 'RouterMyCenterScreen', // 我的页面
  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  RouterIntroduceScreen: 'RouterIntroduceScreen', // 官网介绍
  RouterWebBrowserScreen: 'RouterWebBrowserScreen', // 网页控件
  RouterThemeChangeScreen: 'RouterThemeChangeScreen', // 主题切换
  RouterMarksCustomScreen: 'RouterMarksCustomScreen', // 标签设置
  RouterMarksSortedScreen: 'RouterMarksSortedScreen', // 标签排序
  RouterLanguagesCustomScreen: 'RouterLanguagesCustomScreen', // 语言设置
  RouterLanguagesSortedScreen: 'RouterLanguagesSortedScreen', // 语言排序
  RouterPopularTabDetaiScreen: 'RouterPopularTabDetaiScreen', // 最热详情
  RouterTrendingTabDetaiScreen: 'RouterTrendingTabDetaiScreen', // 趋势详情


  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  RouterMainMeiTuanTabContainer: 'RouterMainMeiTuanTabContainer', // Tab导航器
  RouterMeiTuanWebBrowserScreen: 'RouterMeiTuanWebBrowserScreen', // 网页控件
  RouterMeiTuanGoodsDetailScreen: 'RouterMeiTuanGoodsDetailScreen', // 商品详情


  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator -> TabHomeStackNavigator
  RouterMeiTuanTabHomeStackContainer: 'RouterMeiTuanTabHomeStackContainer', // 首页页面

};
