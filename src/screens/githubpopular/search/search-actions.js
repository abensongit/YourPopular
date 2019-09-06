import * as Types from './search-actions-types';
import { log } from '../../../common';
import { ArrayUtil, SysUtil } from '../../../expand';
import { ProjectModel } from '../../../general';

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS = [];

/**
 * 发起搜索
 * @param input 搜索key
 * @param pageSize 分页
 * @param token 与该搜索关联的唯一token
 * @param favoriteDao
 * @param popularKeys
 * @param callBack
 * @returns {Function}
 */
export function onRefreshSearch(input, pageSize, token, favoriteDao, popularKeys, callBack) {
  return (dispatch) => {
    // 开始搜索动画
    dispatch({
      type: Types.ACTION_SEARCH_REFRESH,
    });
    // 开始搜索数据
    fetch(genFetchUrl(input)).then((response) => {
      // 如果任务取消，则不做任何处理
      if (hasCancel(token)) {
        return null;
      }
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then((responeJson) => {
      // 如果任务取消，则不做任何处理
      if (hasCancel(token, true)) {
        log('user cancel');
        return;
      }
      // 没有查询到结果
      if (!input || !responeJson || !responeJson.items || responeJson.items.length === 0) {
        dispatch({
          type: Types.ACTION_SEARCH_EMPTY_DATA,
          message: input ? `没找到关于[${input}]的项目` : '请输入关键字',
        });
        doCallBack(callBack, input ? `没找到关于[${input}]的项目` : '请输入关键字');
        return;
      }
      // 获取数据成功
      const { items } = responeJson;
      handleData(dispatch, { data: items }, pageSize, favoriteDao, {
        showBottomButton: !SysUtil.checkKeyIsExist(popularKeys, input),
        input,
      });
    }).catch((error) => {
      // 获取数据失败
      log(error);
      dispatch({
        type: Types.ACTION_SEARCH_REFRESH_FAIL,
        error
      });
    });
  };
}

/**
 * 加载更多
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favouriteDao
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMoreSearch(pageIndex, pageSize, dataArray = [], favouriteDao, callBack) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_SEARCH_LOAD_MORE,
    });
    // 模拟网络请求
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.ACTION_SEARCH_LOAD_MORE_FAIL,
          error: 'no more',
          pageIndex: --pageIndex,
          projectModels: dataArray,
        });
      } else {
        // 本次和载入的最大数量
        const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        doProjectModels(dataArray.slice(0, max), favouriteDao, (projectModels) => {
          dispatch({
            type: Types.ACTION_SEARCH_LOAD_MORE_SUCCESS,
            pageIndex,
            projectModels,
          });
        });
      }
    }, 1000);
  };
}


/**
 * 取消一个异步任务
 * @param token
 * @returns {function(*)}
 */
export function onCancelSearch(token) {
  return (dispatch) => {
    CANCEL_TOKENS.push(token);
    dispatch({
      type: Types.ACTION_SEARCH_CANCEL
    });
  };
}

/**
 * 处理数据
 * @param dispatch
 * @param data
 * @param pageSize
 * @param favouriteDao
 * @param params
 */
function handleData(dispatch, data, pageSize, favouriteDao, params) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    }
  }
  // 第一次加载的数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doProjectModels(showItems, favouriteDao, (projectModels) => {
    dispatch({
      type: Types.ACTION_SEARCH_REFRESH_SUCCESS,
      items: fixItems,
      projectModels,
      pageIndex: 1,
      ...params
    });
    if (projectModels.length > 0
      && projectModels.length < pageSize) {
      setTimeout(() => {
        dispatch({
          type: Types.ACTION_SEARCH_NO_MORE_DATA,
          items,
          projectModels,
          pageIndex: 1,
          ...params
        });
      }, 50);
    } else if (projectModels.length <= 0) {
      dispatch({
        type: Types.ACTION_SEARCH_EMPTY_DATA,
        items: fixItems,
        projectModels,
        pageIndex: 1,
        ...params
      });
    }
  });
}

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favouriteDao
 * @param callback
 * @returns {Promise<void>}
 */
async function doProjectModels(showItems, favouriteDao, callback) {
  let keys = [];
  try {
    keys = await favouriteDao.getFavouriteKeys();
  } catch (error) {
    console.log(error);
  }

  const projectModels = [];
  for (let i = 0, { length } = showItems; i < length; i++) {
    projectModels.push(
      new ProjectModel(showItems[i], SysUtil.checkFavourite(showItems[i], keys))
    );
  }

  doCallBack(callback, projectModels);
}

/**
 * 搜索地址
 * @param key
 * @returns {string}
 */
function genFetchUrl(key) {
  return API_URL + key + QUERY_STR;
}

/**
 * 检查指定token是否已经取消
 * @param token
 * @param isRemove
 * @returns {boolean}
 */
function hasCancel(token, isRemove) {
  if (CANCEL_TOKENS.includes(token)) {
    isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
    return true;
  }
  return false;
}


/**
 * 回调函数
 * @param callBack
 * @param object
 */
const doCallBack = (callBack, object) => {
  if (typeof callBack === 'function') {
    callBack(object);
  }
};
