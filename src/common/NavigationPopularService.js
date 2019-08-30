/**
 * 全局导航跳转工具类
 */
export default class NavigationPopularService {
  /**
   * 跳转至指定页面
   * @param page
   * @param params
   */
  static navigate(page, params = {}) {
    const { topLevelNavigator } = NavigationPopularService;
    if (!topLevelNavigator) {
      const { navigation } = params;
      if (!navigation) {
        console.log('navigation can not be null');
        return;
      }
      navigation.navigate(page);
      return;
    }
    if (topLevelNavigator) {
      topLevelNavigator.navigate(
        page,
        { ...params }
      );
    }
  }

  /**
   * 跳转至指定页面
   * @param page
   * @param params
   */
  static push(page, params = {}) {
    const { topLevelNavigator } = NavigationPopularService;
    if (!topLevelNavigator) {
      const { navigation } = params;
      if (!navigation) {
        console.log('navigation can not be null');
        return;
      }
      navigation.navigate(page);
      return;
    }
    if (topLevelNavigator) {
      topLevelNavigator.push(
        page,
        { ...params }
      );
    }
  }

  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation = null) {
    if (navigation) {
      navigation.goBack();
    } else {
      const { topLevelNavigator } = NavigationPopularService;
      if (!topLevelNavigator) {
        console.log('navigation can not be null');
        return;
      }
      topLevelNavigator.goBack();
    }
  }
}
