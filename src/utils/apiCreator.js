import { request } from './request';
import { apiPrefix } from '../config/constants';
import { url as urlHelper } from '../helper';

/**
 * api生成器
 *
 * @return {Fucntion}
 */
export default function createApi() {
  // 如果没有前缀，自动补上
  const padPrefix = (url) => {
    if (url.indexOf(apiPrefix) === -1) {
      return apiPrefix + url;
    }
    return url;
  };

  return {

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     * @param {Number} timeout 超时时间，单位ms
     * @return {Promise}
     */
    get(url, query = {}, options) {
      const finalUrl = padPrefix(url);
      const { ignoreCatch = false, ...resetQuery } = query;
      const queryString = urlHelper.stringify(resetQuery);
      return request(
        `${finalUrl}?${queryString}`,
        {
          method: 'GET',
          ignoreCatch,
          ...options,
        },
      );
    },

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     * @param {Number} timeout 超时时间，单位ms
     * @return {Promise}
     */
    post(url, query = {}, options = {}) {
      const finalUrl = options.isFullUrl ? url : padPrefix(url);
      const requestHeader = {
        'Content-Type': 'application/json',
      };
      const { ignoreCatch = false, ...resetQuery } = query;

      return request(
        finalUrl,
        {
          method: 'POST',
          headers: requestHeader,
          ignoreCatch,
          body: JSON.stringify({ ...resetQuery }),
          ...options,
        },
      );
    },
  };
}
