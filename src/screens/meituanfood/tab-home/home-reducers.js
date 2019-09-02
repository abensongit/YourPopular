import * as Types from './home-actions-types';
import { RefreshState } from '../../../components/refresh-list-view/refresh-list-view';

const defaultState = {};
/**
 * meiTuanHome:{
 *     items:[],
 *     refreshState:*,
 * }
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_MEITUAN_HOME_REFRESH: {
      // 下拉刷新动画
      return {
        ...state,
        refreshState: RefreshState.HeaderRefreshing,
      };
    }
    case Types.ACTION_MEITUAN_HOME_REFRESH_SUCCESS: {
      // 下拉刷新成功
      return {
        ...state,
        items: action.items,
        pageIndex: action.pageIndex,
        refreshState: RefreshState.Idle,
      };
    }
    case Types.ACTION_MEITUAN_HOME_REFRESH_FAIL: {
      // 下拉刷新失败
      return {
        ...state,
        refreshState: RefreshState.Failure,
      };
    }
    case Types.ACTION_MEITUAN_HOME_LOAD_MORE: {
      // 上拉加载更多动画
      return {
        ...state,
        refreshState: RefreshState.FooterRefreshing,
      };
    }
    case Types.ACTION_MEITUAN_HOME_LOAD_MORE_SUCCESS: {
      // 上拉加载更多成功
      return {
        ...state,
        items: action.items,
        pageIndex: action.pageIndex,
        refreshState: RefreshState.Idle,
      };
    }
    case Types.ACTION_MEITUAN_HOME_LOAD_MORE_FAIL: {
      // 上拉加载更多失败
      return {
        ...state,
        pageIndex: action.pageIndex,
        refreshState: RefreshState.NoMoreData,
      };
    }
    case Types.ACTION_MEITUAN_HOME_NO_MORE_DATA: {
      // 没有更多数据
      return {
        ...state,
        pageIndex: action.pageIndex,
        refreshState: RefreshState.NoMoreData,
      };
    }
    case Types.ACTION_MEITUAN_HOME_EMPTY_DATA: {
      // 获取数据为空
      return {
        ...state,
        pageIndex: action.pageIndex,
        refreshState: RefreshState.EmptyData,
      };
    }
    default: {
      return state;
    }
  }
}
