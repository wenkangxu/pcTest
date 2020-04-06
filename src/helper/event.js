import _ from 'lodash';

const event = {
  /**
   * 给DOM元素添加滚轮事件
   * @param {HTMLElement} ele DOM元素
   * @param {Function} handler 事件回调函数
   */
  addWheelEvent(ele, handler) {
    ele.addEventListener('wheel', handler, false);
    ele.addEventListener('mousewheel', handler, false);
    ele.addEventListener('DOMMouseScroll', handler, false);
  },
  /**
   * 移除DOM元素的滚轮事件
   * @param {HTMLElement} ele DOM元素
   * @param {Function} handler 事件回调函数
   */
  removeWheelEvent(ele, handler) {
    ele.removeEventListener('wheel', handler);
    ele.removeEventListener('mousewheel', handler);
    ele.removeEventListener('DOMMouseScroll', handler);
  },

  /**
   * 给window注册resize事件
   * @param {Functio} handler 事件
   */
  addWindowResize(handler) {
    window.addEventListener('resize', handler, false);
  },
  /**
   * 注销window的resize事件
   * @param {Functio} handler 事件
   */
  removeWindowResize(handler) {
    window.removeEventListener('resize', handler);
  },

  /**
   * 给DOM元素添加点击事件
   * @param {HTMLElement} ele DOM元素
   * @param {Function} handler 事件回调函数
   */
  addClickEvent(ele, handler) {
    ele.addEventListener('click', handler, false);
  },
  /**
   * 移除DOM元素的点击事件
   * @param {HTMLElement} ele DOM元素
   * @param {Function} handler 事件回调函数
   */
  removeClickEvent(ele, handler) {
    ele.removeEventListener('click', handler);
  },

  /**
   * 模拟事件触发
   * 最新的W3C标准中已经废弃了createEvent等相关方法，
   * 不过目前发现新的Event接口好像浏览器实现有问题，
   * 所以目前还是使用createEvent方法
   * @author sunweibin
   * @param {HEMLElement} dom DOM元素
   * @param {String} type 事件类型字符串 取值'UIEvents' || 'MouseEvents' || 'HTMLEvents'
   * @param {String} name 事件名称字符串 例如: 'click'
   * @param {*} reset 剩余参数的数组，自定义事件的其他参数
   */
  trigger(dom, type, name, ...reset) {
    if (typeof type !== 'string' && !_.includes(['UIEvents', 'MouseEvents', 'HTMLEvents'], type)) return;
    const e = document.createEvent(type);
    if (type === 'MouseEvents') {
      e.initMouseEvent(name, ...reset);
    } else if (type === 'HTMLEvents') {
      e.initEvent(name, ...reset);
    } else if (type === 'UIEvents') {
      e.initUIEvent(name, ...reset);
    }
    dom.dispatchEvent(e);
  },
  /**
   * 触发Click事件
   * @author sunweibin
   * @param {HEMLElement} dom DOM元素
   * @param {Boolean} canBubble=true 是否冒泡
   * @param {Boolean} cancelable=true 是否可以阻止事件默认行为
   */
  triggerClick(dom, canBubble = true, cancelable = true) {
    event.trigger(dom, 'MouseEvents', 'click', canBubble, cancelable);
  },
  /**
   * 触发mousedown事件
   * @author sunweibin
   * @param {HEMLElement} dom DOM元素
   * @param {Boolean} canBubble=true 是否冒泡
   * @param {Boolean} cancelable=true 是否可以阻止事件默认行为
   */
  triggerMouseDown(dom, canBubble = true, cancelable = true) {
    event.trigger(dom, 'MouseEvents', 'mousedown', canBubble, cancelable);
  },

  sleep(ms) {
    return new Promise((res, rej) => {
      setTimeout(res, ms);
    });
  }
};

export default event;

export const {
  addWheelEvent,
  removeWheelEvent,
  addWindowResize,
  removeWindowResize,
  addClickEvent,
  removeClickEvent,
  trigger,
  triggerClick,
  triggerMouseDown,
  sleep,
} = event;
