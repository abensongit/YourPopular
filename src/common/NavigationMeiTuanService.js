import { NavigationActions } from 'react-navigation';

/**
 * 全局导航跳转工具类
 */
export default class NavigationMeiTuanService {
  /**
   * 跳转至指定页面
   * @param page
   * @param params
   */
  static navigate(page, params = {}) {
    const { topLevelNavigator } = NavigationMeiTuanService;
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
    const { topLevelNavigator } = NavigationMeiTuanService;
    if (!topLevelNavigator) {
      const { navigation } = params;
      if (!navigation) {
        console.log('navigation can not be null');
        return;
      }
      navigation.push(page);
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
      const { topLevelNavigator } = NavigationMeiTuanService;
      if (!topLevelNavigator) {
        console.log('navigation can not be null');
        return;
      }
      topLevelNavigator.goBack();
    }
  }


  /**
   * 路由导航指定页面
   * @param page
   * @param params
   * @returns {Function}
   */
  static dispatch = (page, params = {}) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: page
    });
    const { topLevelNavigator } = NavigationMeiTuanService;
    if (!topLevelNavigator) {
      const { navigation } = params;
      if (!navigation) {
        console.log('navigation can not be null');
        return;
      }
      navigation.dispatch(navigateAction);
      return;
    }
    if (topLevelNavigator) {
      topLevelNavigator.dispatch(navigateAction);
    }
  };

  /**
   * 打开抽屉页面
   * @param params
   */
  static openDrawer(params = {}) {
    const { topDrawerNavigator } = NavigationMeiTuanService;
    if (!topDrawerNavigator) {
      const { navigation } = params;
      if (!navigation) {
        console.log('navigation can not be null');
        return;
      }
      navigation.openDrawer();
      return;
    }
    if (topDrawerNavigator) {
      topDrawerNavigator.openDrawer();
    }
  }
}
