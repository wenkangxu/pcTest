import fetch from 'dva/fetch';

import { request as config } from '../config';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 * @param  {object} options 针对请求在后期需要做的特殊处理
 * options含有属性
 * ignoreCatch boolen， 默认为false，表示需要经过全局Catch，true表示忽略全局捕获
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response, options) {
  const {
    ignoreCatch = false,
    isFullUrl,
    currentUrl,
    needResultData,
  } = options;

  return response.json().then(
    (res) => {
      if (isFullUrl) {
        const { data } = res;
        return data;
      }
      // messageType代表错误类型，默认是0，如果后端不传，默认也是0，前端用message提示
      // 如果是1，则用自定义的dialog弹出错误信息
      const {
        code, msg, succeed, messageType = 0
      } = res;
      const isThrowError = !succeed && !ignoreCatch;
      if (isThrowError) {
        // 抛出以分隔符为分隔的错误字符串信息
        throw new Error([msg, messageType, code, currentUrl].join(config.ERROR_SEPARATOR));
      }
      if (needResultData) {
        return res.resultData;
      }
      return res;
    }
  ).catch(
    () => {
      // 静默处理，返回一个空的resultData
      const res = {
        resultData: {},
      };
      return res;
    }
  );
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
const request = (url, options) => {
  let timeoutMessage = `请求超时 - ${url}`;
  if (options.errorMessage) {
    timeoutMessage = options.errorMessage;
  }
  if (options.useDefaultErrorMessage) {
    timeoutMessage = {
      message: '抱歉，服务器繁忙，请5~10分钟后再试。如果问题持续存在，请联系管理员',
      duration: 6,
    };
  }
  return Promise.race([
    fetch(url, { credentials: 'include', ...options })
      .then(checkStatus)
      .then((response) => parseJSON(response, { ...options, currentUrl: url })),
    new Promise(
      (rosolve, reject) => {// eslint-disable-line
        setTimeout(
          () => reject(timeoutMessage), // eslint-disable-line
          options.timeout || config.timeout,
        );
      },
    ),
  ]);
};

/**
 * 发送日志专用, 不考虑超时报错
 */
const logRequest = (url, options) => (
  fetch(url, { credentials: 'include', ...options })
    .then(checkStatus)
);

const exported = {
  request,
  logRequest,
};

export {
  request,
  logRequest,
};

export default exported;
