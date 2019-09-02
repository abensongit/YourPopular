import HomeFetch from './home-fetch';
import * as Types from './home-actions-types';
import { GoodsModel } from '../../../general';

/**
 * 获取数据
 * @param url
 * @param pageSize
 * @returns {Function}
 */
export function onRefreshMeiTuanHome(url, pageSize) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_MEITUAN_HOME_REFRESH,
    });
    // 开始获取数据
    const fetchService = new HomeFetch();
    fetchService.fetch(url)
      .then((data) => {
        // 获取数据成功
        handleDataRefresh(dispatch, data, pageSize);
      })
      .catch((error) => {
        // 获取数据失败
        console.log(error);
        dispatch({
          type: Types.ACTION_MEITUAN_HOME_REFRESH_FAIL,
          error
        });
      });
  };
}


/**
 * 加载更多
 * @param url
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMoreMeiTuanHome(url, pageIndex, pageSize, dataArray = [], callBack) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_MEITUAN_HOME_LOAD_MORE,
    });
    // 开始获取数据
    const fetchService = new HomeFetch();
    fetchService.fetch(url)
      .then((data) => {
        // 获取数据成功
        handleDataLoadMore(dispatch, data, pageSize, pageIndex, dataArray, callBack);
      })
      .catch((error) => {
        // 获取数据失败
        console.log(error);
        dispatch({
          type: Types.ACTION_MEITUAN_HOME_LOAD_MORE_FAIL,
          error
        });
      });
  };
}

/**
 * 处理数据 - 刷新数据
 * @param dispatch
 * @param jsondata
 * @param pageSize
 */
function handleDataRefresh(dispatch, jsondata, pageSize) {
  // 组装数据模型
  let fixItems = [];
  if (jsondata && jsondata.data && jsondata.data.data) {
    if (Array.isArray(jsondata.data.data)) {
      fixItems = jsondata.data.data.map(
        info => ({
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        })
      );
    }
  }
  // 第一次加载的数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doGoodsModels(showItems, (itemModels) => {
    dispatch({
      type: Types.ACTION_MEITUAN_HOME_REFRESH_SUCCESS,
      items: itemModels,
      pageIndex: 1,
    });
    if (itemModels.length > 0
      && itemModels.length < pageSize) {
      setTimeout(() => {
        dispatch({
          type: Types.ACTION_MEITUAN_HOME_NO_MORE_DATA,
          items: itemModels,
          pageIndex: 1,
        });
      }, 50);
    } else if (itemModels.length <= 0) {
      dispatch({
        type: Types.ACTION_MEITUAN_HOME_EMPTY_DATA,
        items: itemModels,
        pageIndex: 1,
      });
    }
  });
}


/**
 * 处理数据 - 加载更多
 * @param dispatch
 * @param jsondata
 * @param pageSize 每页展示条数
 * @param pageIndex 第几页
 * @param dataModels 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 */
function handleDataLoadMore(dispatch, jsondata, pageSize, pageIndex, dataModels = [], callBack) {
  // 组装数据模型
  let fixItems = [];
  if (jsondata && jsondata.data && jsondata.data.data) {
    if (Array.isArray(jsondata.data.data)) {
      fixItems = jsondata.data.data.map(
        info => ({
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        })
      );
    }
  }
  // 加载更多数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doGoodsModels(showItems, (itemModels) => {
    if (itemModels.length <= 0) {
      if (typeof callBack === 'function') {
        callBack('no more');
      }
      dispatch({
        type: Types.ACTION_MEITUAN_HOME_NO_MORE_DATA,
        error: 'no more',
        pageIndex: --pageIndex,
        items: dataModels,
      });
    } else {
      dispatch({
        type: Types.ACTION_MEITUAN_HOME_LOAD_MORE_SUCCESS,
        items: [...dataModels, ...itemModels],
        pageIndex,
      });
    }
  });
}

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param callback
 * @returns {Promise<void>}
 */
async function doGoodsModels(showItems, callback) {
  const goodsModels = [];
  for (let i = 0, { length } = showItems; i < length; i++) {
    goodsModels.push(
      new GoodsModel(showItems[i])
    );
  }
  doCallBack(callback, goodsModels);
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
