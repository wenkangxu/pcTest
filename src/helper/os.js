import _ from 'lodash';
import warning from 'warning';

// 是否可以使用浏览器Console打印日志
const canUseConsoleFlag = true;

const os = {
  /**
   * 将字符串添加到剪贴板中
   * @author xuwenkang
   * @param  {string} value 需要将复制的字符串
   */
  copyToClipBoard(value) {
    // 选中元素中的文本
    const selectElementText = (element) => {
      if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    };
    const element = document.createElement('DIV');
    element.textContent = value;
    document.body.appendChild(element);
    selectElementText(element);
    document.execCommand('copy');
    element.remove();
  },

  /**
   * 日志工具log
   * @param {*} rest
   */
  log(...rest) {
    if (canUseConsoleFlag) {
      console.log(rest); // eslint-disable-line no-console
    }
  },
  /**
   * 日志工具warn
   * @param {*} rest
   */
  warn(...rest) {
    if (canUseConsoleFlag) {
      warning(false, `${rest}`);
    }
  },
  /**
   * 日志工具error
   * @param {*} rest
   */
  error(...rest) {
    if (canUseConsoleFlag) {
      warning(false, `${rest}`);
    }
  },

  /**
   * 在对象集合中根据某属性值获取最佳匹配的对象
   * @param {*} value， 值
   * @param {[]} collection ,对象集合
   * @param {string} property，对象上的属性名称
   * @param {boolean}，默认返回新的colletion对象，可以直接返回对象引用
   */
  findBestMatch(value, collection, property, returnRef = false) {
    // 获取pathname的匹配数组
    const matchArray = collection.map((obj) => {
      let matchProp = obj[property];
      if (_.isString(matchProp) && (matchProp.indexOf('?') !== -1)) {
        matchProp = matchProp.slice(0, matchProp.indexOf('?'));
      }
      const match = RegExp(matchProp).exec(value);
      return !match ? 0 : match[0].length;
    });
    // 获取匹配数组里面最大的匹配字符数
    const maxMatchStringCount = _.max(matchArray);
    // 最佳匹配下标
    const index = _.indexOf(matchArray, maxMatchStringCount);
    // 如果没找到匹配的tab菜单，会默认首页菜单展示
    return returnRef ? collection[index] : { ...collection[index] };
  },
};

export default os;

export const {
  copyToClipBoard,
  log,
  warn,
  error,
  findBestMatch,
} = os;
