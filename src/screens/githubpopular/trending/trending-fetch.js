import {
  AsyncStorage
} from 'react-native';
import GitHubTrending from 'GitHubTrending';
import {
  FetchService
} from '../../../common';

export default class TrendingFetch extends FetchService {
  /**
   * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
   * @param url
   * @returns {Promise}
   */
  fetch(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapData) => {
        if (wrapData && TrendingFetch.checkTimestampValid(wrapData.timestamp)) {
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
        new GitHubTrending().fetchTrending(url)
          .then((responseData) => {
            if (!responseData) {
              throw new Error('Network response was is null');
            }
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
}
