import {
  AsyncStorage
} from 'react-native';

export default class FetchService {
  /**
   * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
   * @param url
   * @returns {Promise}
   */
  fetch(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapData) => {
        if (wrapData && FetchService.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData);
        } else {
          this.fetchNetworkData(url).then((data) => {
            resolve(this.wrapData(data));
          }).catch((error) => {
            reject(error);
          });
        }
      }).catch((error) => {
        console.error(error);
        this.fetchNetworkData(url).then((data) => {
          resolve(this.wrapData(data));
        }).catch(((err) => {
          reject(err);
        }));
      });
    });
  }

  /**
   * 获取本地数据
   * @param url
   * @returns {Promise}
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (err) {
            reject(err);
            console.error(err);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 获取网络数据
   * @param url
   * @returns {Promise}
   */
  fetchNetworkData(url) {
    return new Promise((resolve, reject) => {
      if (url) {
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then((responseData) => {
            this.saveData(url, responseData);
            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        throw new Error('Network response was is null');
      }
    });
  }

  /**
   * 保存数据
   * @param url
   * @param data
   * @param callback
   */
  saveData(url, data, callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this.wrapData(data)), callback);
  }

  /**
   * 包装网络数据
   * @param dataSource 数据
   * @return {Object} 包装的数据
   */
  wrapData(dataSource) {
    return {
      data: dataSource,
      timestamp: new Date().getTime()
    };
  }

  /**
   * 检查timestamp是否在有效期内
   * @param timestamp 项目更新时间
   * @return {boolean} true 不需要更新, false需要更新
   */
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false; // 有效期4个小时
    if (currentDate.getMinutes() - targetDate.getMinutes() > 1) return false; // 有效期1分钟
    return false;
  }
}
