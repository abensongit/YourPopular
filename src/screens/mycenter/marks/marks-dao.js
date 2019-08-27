
import {
  AsyncStorage,
} from 'react-native';
import { JsonMarks } from '../../../resources';

const STORAGE_MARKS_KEY = 'STORAGE_MARKS_KEY';

export default class MarksDao {
  /**
   * 获取标签
   * @returns {Promise<any> | Promise}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_MARKS_KEY, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          this.save(JsonMarks);
          resolve(JsonMarks);
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
   * 保存语言或标签
   * @param objectData
   */
  save(objectData) {
    const stringData = JSON.stringify(objectData);
    AsyncStorage.setItem(STORAGE_MARKS_KEY, stringData, ((error) => {

    }));
  }
}
