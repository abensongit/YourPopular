import {
  AsyncStorage,
} from 'react-native';

const STORAGE_FAVOURITE_POPULAR_KEY = 'STORAGE_FAVOURITE_POPULAR_KEY';

export default class PopularFavouriteDao {
  /**
   * 构造函数
   * @param flag
   */
  constructor() {
    this.favouriteKey = STORAGE_FAVOURITE_POPULAR_KEY;
  }

  /**
   * 收藏项目，保存收藏的项目
   * @param key 项目ID
   * @param value 收藏的项目
   * @param callback
   */
  saveFavouriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) {
        this.updateFavouriteKeys(key, true);
      }
    });
  }

  /**
   * 取消收藏，移除已经收藏的项目
   * @param key 项目ID
   */
  removeFavouriteItem(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        this.updateFavouriteKeys(key, false);
      }
    });
  }

  /**
   * 更新 Favourite Key 集合
   * @param key
   * @param isAdd 添加true，删除false
   * * */
  updateFavouriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favouriteKey, (error, result) => {
      if (!error) {
        let favouriteKeys = [];
        if (result) {
          favouriteKeys = JSON.parse(result);
        }
        const index = favouriteKeys.indexOf(key);
        if (isAdd) {
          // 如果是添加且key不在存在则添加到数组中
          if (index === -1) {
            favouriteKeys.push(key);
          }
        } else { // 如果是删除且key存在则将其从数值中移除
          if (index !== -1) {
            favouriteKeys.splice(index, 1);
          }
        }
        // 将更新后的key集合保存到本地
        AsyncStorage.setItem(this.favouriteKey, JSON.stringify(favouriteKeys));
      }
    });
  }

  /**
   * 获取收藏的Repository对应的key
   * @return {Promise}
   */
  getFavouriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favouriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  /**
   * 获取所有收藏的项目
   * @return {Promise}
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavouriteKeys().then((keys) => {
        const items = [];
        if (keys) {
          AsyncStorage.multiGet(keys, (err, stores) => {
            try {
              stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                // const key = store[i][0];
                const value = store[i][1];
                if (value) {
                  items.push(JSON.parse(value));
                }
                return store;
              });
              resolve(items);
            } catch (error) {
              reject(error);
            }
          });
        } else {
          resolve(items);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
