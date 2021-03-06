import FetchService from './nearby-tab-fetch';
import NearbyTabModel from './nearby-tab-model';
import * as Types from './nearby-tab-actions-types';


/**
 * 获取数据
 * @param url
 * @param pageSize
 * @returns {Function}
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信
 */
export function onRefreshMeiTuanNearby(url, pageSize, callBack = (obj) => {}) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_MEITUAN_NEARBY_TAB_REFRESH,
    });
    // 开始获取数据
    const fetchService = new FetchService();
    fetchService.fetch(url)
      .then((data) => {
        // 获取数据成功
        handleDataRefresh(dispatch, data, pageSize, callBack);
      })
      .catch((error) => {
        // 获取数据失败
        console.log(error);
        dispatch({
          type: Types.ACTION_MEITUAN_NEARBY_TAB_REFRESH_FAIL,
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
export function onLoadMoreMeiTuanNearby(url, pageIndex, pageSize, dataArray = [], callBack = (obj) => {}) {
  return (dispatch) => {
    // 开始刷新动画
    dispatch({
      type: Types.ACTION_MEITUAN_NEARBY_TAB_LOAD_MORE,
    });
    // 开始获取数据
    const fetchService = new FetchService();
    fetchService.fetch(url)
      .then((data) => {
        // 获取数据成功
        handleDataLoadMore(dispatch, data, pageSize, pageIndex, dataArray, callBack);
      })
      .catch((error) => {
        // 获取数据失败
        console.log(error);
        dispatch({
          type: Types.ACTION_MEITUAN_NEARBY_TAB_LOAD_MORE_FAIL,
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
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信
 */
function handleDataRefresh(dispatch, jsondata, pageSize, callBack = (obj) => {}) {
  // 组装数据模型
  const fixItems = doWithJsonData(jsondata);
  // 第一次加载的数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doPackageHomeModels(showItems, (itemModels) => {
    doCallBack(callBack, itemModels);
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    itemModels.sort(() => 0.5 - Math.random());
    dispatch({
      type: Types.ACTION_MEITUAN_NEARBY_TAB_REFRESH_SUCCESS,
      items: doStaticHomeModels(itemModels, true),
      pageIndex: 1,
    });
    if (itemModels.length > 0
      && itemModels.length < pageSize) {
      setTimeout(() => {
        dispatch({
          type: Types.ACTION_MEITUAN_NEARBY_TAB_NO_MORE_DATA,
          items: doStaticHomeModels(itemModels, true),
          pageIndex: 1,
        });
      }, 50);
    } else if (itemModels.length <= 0) {
      dispatch({
        type: Types.ACTION_MEITUAN_NEARBY_TAB_EMPTY_DATA,
        items: doStaticHomeModels(itemModels, true),
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
function handleDataLoadMore(dispatch, jsondata, pageSize, pageIndex, dataModels = [], callBack = (obj) => {}) {
  // 组装数据模型
  const fixItems = doWithJsonData(jsondata);
  // 加载更多数据
  let number = 0;
  if (pageSize * pageIndex > fixItems.length) {
    number = fixItems.length - pageSize * (pageIndex - 1);
  } else {
    number = pageSize;
  }
  const showItems = fixItems.splice(dataModels.length, number);
  doPackageHomeModels(showItems, (itemModels) => {
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    itemModels.sort(() => 0.5 - Math.random());
    if (itemModels.length <= 0) {
      doCallBack(callBack, '没有更多数据了');
      dispatch({
        type: Types.ACTION_MEITUAN_NEARBY_TAB_NO_MORE_DATA,
        error: 'no more',
        pageIndex: --pageIndex,
        items: doStaticHomeModels(dataModels, false),
      });
    } else {
      dispatch({
        type: Types.ACTION_MEITUAN_NEARBY_TAB_LOAD_MORE_SUCCESS,
        items: doStaticHomeModels([...dataModels, ...itemModels], false),
        pageIndex,
      });
    }
  });
}

/**
 * 处理JSON数据
 * @param jsondata
 * @returns {Array}
 */
function doWithJsonData(jsondata) {
  let items = [];
  if (jsondata && jsondata.data && jsondata.data.data) {
    if (Array.isArray(jsondata.data.data)) {
      items = jsondata.data.data.map(
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
  return items;
}

/**
 * 包装数据
 * @param showItems
 * @param callback
 * @returns {Promise<void>}
 */
function doPackageHomeModels(showItems, callback = (obj) => {}) {
  const itemModels = [];
  for (let i = 0, { length } = showItems; i < length; i++) {
    itemModels.push(
      new NearbyTabModel(showItems[i])
    );
  }
  doCallBack(callback, itemModels);
}

/**
 * 处理静态数据
 * @param items
 * @param isAdd
 * @returns {*[]}
 */
function doStaticHomeModels(items, isAdd = false) {
  return items;
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
