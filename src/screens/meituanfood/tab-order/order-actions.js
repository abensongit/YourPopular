import {
  FetchService
} from '../../../common';
import OrderModel from './order-model';

const DEBUG = false;
const log = (text: string) => { DEBUG && console.log(text); };

/**
 * 获取数据
 * @param url
 * @param pageSize
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 */
export function onLoad(url, pageSize, callBack = null) {
  const fetchService = new FetchService();
  fetchService.fetch(url)
    .then((data) => {
      handleDataLoad(data, pageSize, callBack);
    })
    .catch((error) => {
      doCallBack(callBack, '请求数据异常');
      log(error);
    });
}

/**
 * 加载更多
 * @param url
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @returns {function(*)}
 */
export function onLoadMore(url, pageIndex, pageSize, callBack = null) {
  const fetchService = new FetchService();
  fetchService.fetch(url)
    .then((data) => {
      handleDataLoadMore(data, pageIndex, pageSize, callBack);
    })
    .catch((error) => {
      doCallBack(callBack, '请求数据异常');
      log(error);
    });
}

/**
 * 处理数据 - 刷新数据
 * @param jsondata
 * @param pageSize
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 */
function handleDataLoad(jsondata, pageSize, callBack = null) {
  // 组装数据模型
  const fixItems = doWithJsonData(jsondata);
  // 第一次加载的数据
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  doPackageModels(showItems, (itemModels) => {
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    itemModels.sort(() => 0.5 - Math.random());
    // 更新刷新状态、数据列表、页数
    doCallBack(callBack, doStaticModels(itemModels, true));
  });
}

/**
 * 处理数据 - 加载更多
 * @param jsondata
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 */
function handleDataLoadMore(jsondata, pageIndex, pageSize, callBack = null) {
  // 组装数据模型
  const fixItems = doWithJsonData(jsondata);
  // 加载更多数据
  let number = 0;
  if (pageSize * pageIndex > fixItems.length) {
    number = fixItems.length - pageSize * (pageIndex - 1);
  } else {
    number = pageSize;
  }
  const showItems = fixItems.splice(pageSize * (pageIndex - 1), number);
  doPackageModels(showItems, (itemModels) => {
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    itemModels.sort(() => 0.5 - Math.random());
    doCallBack(callBack, doStaticModels(itemModels, false));
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
 * @param callBack
 * @returns {Promise<void>}
 */
function doPackageModels(showItems, callBack) {
  const itemModels = [];
  for (let i = 0, { length } = showItems; i < length; i++) {
    itemModels.push(
      new OrderModel(showItems[i])
    );
  }
  doCallBack(callBack, itemModels);
}

/**
 * 处理静态数据
 * @param items
 * @param isAdd
 * @returns {*[]}
 */
function doStaticModels(items, isAdd = false) {
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
