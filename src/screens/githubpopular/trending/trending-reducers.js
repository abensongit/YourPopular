import * as Types from './trending-actions-types';
import { RefreshState } from '../../../components/refresh-list-view/refresh-list-view';

const defaultState = {};
/**
 * trending:{
 *     java:{
 *         items:[],
 *         refreshState:*
 *     },
 *     ios:{
 *         items:[],
 *         refreshState:*
 *     }
 * }
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_TRENDING_REFRESH: {
      // 下拉刷新动画
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.HeaderRefreshing,
        }
      };
    }
    case Types.ACTION_TRENDING_REFRESH_SUCCESS: {
      // 下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.Idle,
          items: action.items,
          projectModels: action.projectModels,
          pageIndex: action.pageIndex
        }
      };
    }
    case Types.ACTION_TRENDING_REFRESH_FAIL: {
      // 下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.Failure,
        }
      };
    }
    case Types.ACTION_TRENDING_LOAD_MORE: {
      // 上拉加载更多动画
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.FooterRefreshing,
        }
      };
    }
    case Types.ACTION_TRENDING_LOAD_MORE_SUCCESS: {
      // 上拉加载更多成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.Idle,
          projectModels: action.projectModels,
          pageIndex: action.pageIndex,
        }
      };
    }
    case Types.ACTION_TRENDING_LOAD_MORE_FAIL: {
      // 上拉加载更多失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.NoMoreData,
          pageIndex: action.pageIndex,
        }
      };
    }
    case Types.ACTION_TRENDING_FLUSH_FAVOURITE: {
      // 刷新收藏数据状态
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
        }
      };
    }
    case Types.ACTION_TRENDING_NO_MORE_DATA: {
      // 没有更多数据
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.NoMoreData,
          pageIndex: action.pageIndex,
        }
      };
    }
    case Types.ACTION_TRENDING_EMPTY_DATA: {
      // 获取数据为空
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          refreshState: RefreshState.EmptyData,
          pageIndex: action.pageIndex,
        }
      };
    }
    default: {
      return state;
    }
  }
}
