import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {
  AppMiddleware
} from '../navigations/AppNavigator';

/**
 * 自定义日志 log 中间件
 * 网址：https://cn.redux.js.org/docs/advanced/Middleware.html
 */
const logger = store => next => (action) => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching ', action);
  }
  const result = next(action);
  console.log('nextState ', store.getState());
  return result;
};

/**
 * 中间件数组
 */
const AppMiddlewares = [
  AppMiddleware,
  logger,
  thunk,
];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...AppMiddlewares));
