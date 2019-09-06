import * as Types from './search-actions-types';
import { RefreshState } from '../../../components/refresh-list-view/refresh-list-view';

const STR_SEARCH_CANCEL = '取消';
const STR_SEARCH_CONFIRM = '搜索';

const defaultState = {
  items: [],
  projectModels: [],
  showBottomButton: false,
  showText: STR_SEARCH_CONFIRM,
  refreshState: RefreshState.Idle,
};
/**
 * search:{}
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.ACTION_SEARCH_REFRESH: {
      // 搜索数据
      return {
        ...state,
        showText: STR_SEARCH_CANCEL,
        refreshState: RefreshState.HeaderRefreshing,
      };
    }
    case Types.ACTION_SEARCH_REFRESH_SUCCESS: {
      // 搜索成功
      return {
        ...state,
        items: action.items,
        projectModels: action.projectModels,
        pageIndex: action.pageIndex,
        inputKey: action.inputKey,
        showText: STR_SEARCH_CONFIRM,
        showBottomButton: action.showBottomButton,
        refreshState: RefreshState.Idle,
      };
    }
    case Types.ACTION_SEARCH_REFRESH_FAIL: {
      // 搜索失败
      return {
        ...state,
        showText: STR_SEARCH_CONFIRM,
        refreshState: RefreshState.Failure,
      };
    }
    case Types.ACTION_SEARCH_LOAD_MORE: {
      // 上拉加载更多
      return {
        ...state,
        refreshState: RefreshState.FooterRefreshing,
      };
    }
    case Types.ACTION_SEARCH_LOAD_MORE_SUCCESS: {
      // 上拉加载更多成功
      return {
        ...state,
        refreshState: RefreshState.Idle,
        projectModels: action.projectModels,
        pageIndex: action.pageIndex,
      };
    }
    case Types.ACTION_SEARCH_LOAD_MORE_FAIL: {
      // 上拉加载更多失败
      return {
        ...state,
        refreshState: RefreshState.NoMoreData,
        pageIndex: action.pageIndex,
      };
    }
    case Types.ACTION_SEARCH_CANCEL: {
      // 取消搜索
      return {
        ...state,
        showText: STR_SEARCH_CONFIRM,
        refreshState: RefreshState.Idle,
      };
    }
    case Types.ACTION_SEARCH_NO_MORE_DATA: {
      // 没有更多数据
      return {
        ...state,
        refreshState: RefreshState.NoMoreData,
        pageIndex: action.pageIndex,
      };
    }
    case Types.ACTION_SEARCH_EMPTY_DATA: {
      // 获取数据为空
      return {
        ...state,
        showText: STR_SEARCH_CONFIRM,
        refreshState: RefreshState.EmptyData,
        pageIndex: action.pageIndex,
      };
    }
    default: {
      return state;
    }
  }
}
