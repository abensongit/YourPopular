import {
  AsyncStorage,
} from 'react-native';
import { JsonLangus } from '../../../../resources';

const STORAGE_LANGUAGES_KEY = 'STORAGE_LANGUAGES_KEY';

export default class MarksDao {
  /**
   * 获取语言
   * @returns {Promise<any> | Promise}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_LANGUAGES_KEY, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          this.save(JsonLangus);
          resolve(JsonLangus);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  /**
   * 保存语言
   * @param objectData
   */
  save(objectData) {
    const stringData = JSON.stringify(objectData);
    AsyncStorage.setItem(STORAGE_LANGUAGES_KEY, stringData, ((error) => {

    }));
  }
}
