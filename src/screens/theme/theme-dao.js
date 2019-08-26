
import { AsyncStorage, } from 'react-native';
import { ThemeFlags, ThemeFactory } from '../../resources';

const STORAGE_THEME_KEY = 'STORAGE_THEME_KEY';

export default class ThemeDao {
  /**
   * 获取当前主题
   * @returns {Promise<any> | Promise}
   */
  getTheme() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_THEME_KEY, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          this.save(ThemeFlags.Default);
          result = ThemeFlags.Default;
        }
        resolve(ThemeFactory.createTheme(result));
      });
    });
  }

  /**
   * 保存主题标识
   * @param themeFlag
   */
  save(themeFlag) {
    AsyncStorage.setItem(STORAGE_THEME_KEY, themeFlag, ((error) => {

    }));
  }
}
