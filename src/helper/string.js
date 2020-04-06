import _ from 'lodash';

import { htmlTags } from './regexp';

/**
 * 过滤文本中的html标签
 * @param {*} html
 */
function replaceHTMLTags(html) {
  return (html || '').replace(htmlTags, '');
}

/**
 * 截取固定长度字符串
 */

function substr(str, length = 1) {
  if (!_.isString(str)) {
    return null;
  }

  return str.substr(0, length);
}

const string = {
  replaceHTMLTags,
  substr,
};

export default string;
