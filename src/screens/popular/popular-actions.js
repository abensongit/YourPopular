import PopularFetch from './popular-fetch';
import * as Types from './popular-actions-types';
import { SysUtil } from '../../expand';
import { ProjectModel } from '../../general';

/**
 * 获取数据
 * @param storeName
 * @param url
 * @param pageSize
 * @param favouriteDao
 * @returns {Function}
 */
export function onRefreshPopular(storeName, url, pageSize, favouriteDao) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_POPULAR_REFRESH,
      storeName
    });
    // 开始获取数据
    const fetchService = new PopularFetch();
    fetchService.fetch(url)
      .then((data) => {
        // 获取数据成功
        handleData(Types.ACTION_POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favouriteDao);
      })
      .catch((error) => {
        // 获取数据失败
        console.log(error);
        dispatch({
          type: Types.ACTION_POPULAR_REFRESH_FAIL,
          storeName,
          error
        });
      });
  };
}


/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favouriteDao
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favouriteDao, callBack) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_POPULAR_LOAD_MORE,
      storeName
    });
    // 模拟网络请求
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.ACTION_POPULAR_LOAD_MORE_FAIL,
          storeName,
          error: 'no more',
          pageIndex: --pageIndex,
          projectModels: dataArray,
        });
      } else {
        // 本次和载入的最大数量
        const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        doProjectModels(dataArray.slice(0, max), favouriteDao, (projectModels) => {
          dispatch({
            type: Types.ACTION_POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels,
          });
        });
      }
    }, 1000);
  };
}

/**
 * 刷新收藏
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favouriteDao
 * @returns {function(*)}
 */
export function onFlushPopularFavourite(storeName, pageIndex, pageSize, dataArray = [], favouriteDao) {
  return (dispatch) => {
    const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
    doProjectModels(dataArray.slice(0, max), favouriteDao, (projectModels) => {
      dispatch({
        type: Types.ACTION_POPULAR_FLUSH_FAVOURITE,
        storeName,
        pageIndex,
        projectModels,
      });
    });
  };
}

/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favouriteDao
 */
export function handleData(actionType, dispatch, storeName, data, pageSize, favouriteDao) {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  // 第一次加载的数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doProjectModels(showItems, favouriteDao, (projectModels) => {
    dispatch({
      type: Types.ACTION_POPULAR_REFRESH_SUCCESS,
      storeName,
      items: fixItems,
      projectModels,
      pageIndex: 1,
    });
    if (projectModels.length > 0
      && projectModels.length < pageSize) {
      setTimeout(() => {
        dispatch({
          type: Types.ACTION_POPULAR_NO_MORE_DATA,
          storeName,
          items,
          projectModels,
          pageIndex: 1,
        });
      }, 50);
    } else if (projectModels.length <= 0) {
      dispatch({
        type: Types.ACTION_POPULAR_EMPTY_DATA,
        storeName,
        items: fixItems,
        projectModels,
        pageIndex: 1,
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
export async function doProjectModels(showItems, favouriteDao, callback) {
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
 * 回调函数
 * @param callBack
 * @param object
 */
export const doCallBack = (callBack, object) => {
  if (typeof callBack === 'function') {
    callBack(object);
  }
};
