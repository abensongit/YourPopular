import { Component } from 'react';

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => (params) => {
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURIComponent(params[key])}`));
    if (url.search(/\?/) === -1) {
      typeof params === 'object' ? (url += `?${paramsArray.join('&')}`) : url;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  }
  return url;
};

/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (originalFetch, timeout = 30000) => {
  let timeoutBlock = () => {};
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject('timeout promise');
    };
  });

  // Promise.race(iterable) 方法返回一个promise
  // 这个 promise 在 iterable 中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortablePromise = Promise.race([
    originalFetch,
    timeoutPromise
  ]);

  setTimeout(() => {
    timeoutBlock();
  }, timeout);

  return abortablePromise;
};

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {
  /**
   * 基于fetch 封装的GET 网络请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static getRequest = (url, params = {}) => timeoutFetch(
      fetch(handleUrl(url)(params), {
        method: 'GET',
        headers: header
      })
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
          // alert("服务器繁忙，请稍后再试！");
      })
      .then((response) => {
        // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
        if (response) {
          return response;
        }
          // 非 200，错误处理
          return response;
      })
      .catch((error) => {});

  /**
   * 基于fetch 的 POST 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequrst = (url, params = {}) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));
    return timeoutFetch(
      fetch(url, {
        method: 'POST',
        headers: header,
        body: formData
      })
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
          // alert("服务器繁忙，请稍后再试；\r\nCode:" + response.status);
      })
      .then((response) => {
        // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
        if (response && response.code === 200) {
          return response;
        }
          return response;
      })
      .catch((error) => {
        // alert("当前网络不可用，请检查网络设置！");
      });
  };
}
