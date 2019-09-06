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
  RouterDrawerReactNativeNavigator: 'RouterDrawerReactNativeNavigator', // 仓库栈导航器

  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator
  RouterMainPopularStackContainer: 'RouterMainPopularStackContainer', // 主导航容器
  RouterSearchModalScreen: 'RouterSearchModalScreen', // 搜索页面
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
  RouterAboutScreen: 'RouterAboutScreen', // 关于程序
  RouterAboutAuthorScreen: 'RouterAboutAuthorScreen', // 关于作者
  RouterPopularTabDetaiScreen: 'RouterPopularTabDetaiScreen', // 最热详情
  RouterTrendingTabDetaiScreen: 'RouterTrendingTabDetaiScreen', // 趋势详情


  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  RouterMainMeiTuanTabContainer: 'RouterMainMeiTuanTabContainer', // Tab导航器
  RouterMeiTuanWebBrowserScreen: 'RouterMeiTuanWebBrowserScreen', // 网页控件
  RouterMeiTuanGoodsDetailScreen: 'RouterMeiTuanGoodsDetailScreen', // 商品详情
  RouterMeiTuanOrderMainScreen: 'RouterMeiTuanOrderMainScreen', // 订单页面


  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator -> TabHomeStackNavigator
  RouterMeiTuanTabHomeStackContainer: 'RouterMeiTuanTabHomeStackContainer', // 首页主页
  RouterMeiTuanTabNearbyStackContainer: 'RouterMeiTuanTabNearbyStackContainer', // 附近主页
  RouterMeiTuanTabOrderStackContainer: 'RouterMeiTuanTabOrderStackContainer', // 订单主页
  RouterMeiTuanTabMyCenterStackContainer: 'RouterMeiTuanTabMyCenterStackContainer', // 我的主页


  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  RouterMainRNTabContainer: 'RouterMainRNTabContainer', // Tab导航器
  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator -> MainRNTabNavigator
  RouterRNTabHomeScreen: 'RouterRNTabHomeScreen', // 首页页面
  RouterRNTabProjectScreen: 'RouterRNTabProjectScreen', // 项目页面
  RouterRNTabSettingScreen: 'RouterRNTabSettingScreen', // 设置页面
  // SwitchNavigator -> DrawerNavigator -> DrawerStackNavigator -> MainStackNavigator
  // 控件
  RouterRNExtendItemCustomWidgetButtonScreen: 'RouterRNExtendItemCustomWidgetButtonScreen', // 自定义控件 - Button
  RouterRNExtendItemNativeToJavaScriptScreen: 'RouterRNExtendItemNativeToJavaScriptScreen', // 混合开发
  // 项目
  RouterRNExtendProReactNativeSwiperScreen: 'RouterRNExtendProReactNativeSwiperScreen', // 轮播插件
  RouterRNExtendProReactNativeSnapCarouselScreen: 'RouterRNExtendProReactNativeSnapCarouselScreen', // 特效插件
  RouterRNExtendProReactNativePageControlScreen: 'RouterRNExtendProReactNativePageControlScreen', // PageControl插件
  RouterRNExtendProReactNativeRootToastScreen: 'RouterRNExtendProReactNativeRootToastScreen', // 弹框提示控件
  RouterRNExtendProReactNativeAcionSheetScreen: 'RouterRNExtendProReactNativeAcionSheetScreen', // 选择插件
};
