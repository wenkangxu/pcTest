let app = null;
const noop = () => {};

const dva = {
  /**
   * 初始化dva引用
   * @param {Object} app_ dva生成的实例
   */
  initApp(app_, history) {
    app = app_;
    // const store = dva.getStore();
  },

  /**
   * 暴露dva的store的dispatch方法
   * @param {Object} action 传递的action
   * @param {String} action.type
   * @param {Object} action.payload
   */
  dispatch({ type, payload = {} }) {
    const store = dva.getStore();
    store.dispatch({ type, payload });
  },

  /**
   * 获取保存的Store
   * @returns {Object} redux的store
   */
  getStore() {
    if (app) {
      return app._store; // eslint-disable-line
    }
    return {
      getState: noop,
      dispatch: () => {
        console.error('未将store暴露给组件'); // eslint-disable-line
      },
    };
  },

  getHistory() {
    if (app) {
      return app._history; // eslint-disable-line
    }
    return {
      listen: noop,
    };
  },

  getLastLocation() {
    const store = dva.getStore();
    const state = store.getState();
    if (state && state.routing) {
      return state.routing.location;
    }
    return null;
  },

  /**
   * 生成dva的effects，用于接口数据调用
   * 用于取代 以前 fectchDataFunction函数
   * @param {String} type - dva的dispatch action的type值
   *  格式： '${namespace}/${effectsGeneratorFunctionName}' ,例子 'app/querEmpInfo'
   * @param {Object} [options={}] - 接口调用时候的配置对象 可选
   * @param {Boolean} [options.loading=true] - 是否全局显示Loading遮罩，默认为true, 可选
   * @param {Boolean} [options.forceFull=false] - 是否将Loading遮罩全屏显示，默认为 false, 可选
   * @return {Function} dispatch function
   *
   * @example
   *  generateEffect('app/getEmpInfo', { loading: true, forceFull: false });
   */
  generateEffect(type, options = {}) {
    const action = { loading: true, forceFull: false };
    return (query) => ({
      payload: query || {},
      type,
      ...action,
      ...options,
    });
  },
};

export default dva;

export const {
  initApp,
  dispatch,
  getStore,
  getHistory,
  getLastLocation,
  generateEffect,
} = dva;
