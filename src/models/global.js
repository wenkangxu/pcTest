import { common as commonApi } from '../api';

const EMPTY_OBJECT = {};

export default {
  namespace: 'global',
  state: {
    data: EMPTY_OBJECT,
  },
  reducers: {
    queryDataSuccess(state, action) {
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    },
  },
  effects: {
    // 查询数据
    * queryData({ payload }, { call, put }) {
      const response = yield call(commonApi.queryData, payload);
      yield put({
        type: 'queryDataSuccess',
        payload: response.resultData,
      });
    },
  },
  subscriptions: {}
};
