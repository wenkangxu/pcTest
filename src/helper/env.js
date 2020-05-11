import bowser from 'bowser';
import { constants } from '../config';

// 归一化浏览器名称
export function formatBowserName(name) {
  const aliasMap = {
    IE: 'Internet Explorer',
  };
  const result = aliasMap[name] || name;
  return result.toLowerCase();
}


function getFirstMatch(regex) {
  const match = navigator.userAgent.match(regex);
  return (match && match.length > 1 && match[1]) || '';
}

function getOsVersion() {
  if (bowser.windows) {
    return getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i);
  }
  return bowser.osversion;
}

const env = {
  /**
   * 获取当前操作系统的
   * @author xuwenkang
   * @param {null}
   * @returns {string}
   */
  getOS() {
    const osList = ['mac', 'windows', 'windowsphone'];
    for (let i = 0, len = osList.length; i < len; i++) {
      const os = osList[i];
      if (bowser[os]) {
        return os;
      }
    }
    return 'unknown';
  },
  /**
   * 获取环境信息
   * @returns {Object}
   * 使用"$"符号开头的为神策日志保留字段，
   * 其余为项目中需要使用的常量，
   * 如果需要添加其他常量，请注意如果是自定义的则不能添加"$"符号
   *
   * 以下为神策日志保留字段名称及其含义
   * 出处@url https://www.sensorsdata.cn/manual/data_schema.html#6-%E9%A2%84%E7%BD%AE%E5%B1%9E%E6%80%A7
   *
   * $app_version：应用版本
   * $city： 城市
   * $manufacturer： 设备制造商，字符串类型，如"Apple"
   * $model： 设备型号，字符串类型，如"iphone6"
   * $os： 操作系统，字符串类型，如"iOS"
   * $os_version： 操作系统版本，字符串类型，如"8.1.1"
   * $screen_height： 屏幕高度，数字类型，如1920
   * $screen_width： 屏幕宽度，数字类型，如1080
   * $wifi： 是否 WIFI，BOOL类型，如true
   * $is_login_id：distinct_id 对应的是否是一个注册 ID
   * $ip：用户使用设备的 IP
   * $user_agent：可选参数。如果传入该参数，则解析 User-Agent，
   * $browser: 浏览器名，例如Chrome
   * $browser_version: 浏览器版本，例如Chrome 45
   *
   */
  getEnv() {
    return {
      $app_version: constants.version,
      $os: env.getOS(),
      $os_version: getOsVersion(),
      $screen_width: window.screen.width,
      $screen_height: window.screen.height,
      $browser: bowser.name,
      $browser_version: `${bowser.name} ${bowser.version}`,
      OS_Name: bowser.osname, // 注意，非神策属性不要加$开头
    };
  },
  /**
   * 判断当前浏览器是否IE
   * @author xuwenkang
   * @returns {Boolean}
   */
  isIE() {
    return bowser.name === 'Internet Explorer';
  },
  /**
   * 判断当前浏览器是否Chrome
   * @author xuwenkang
   * @returns {Boolean}
   */
  isChrome() {
    return bowser.name === 'Chrome';
  },
  /**
   * 判断当前浏览器是否Safari
   * @author xuwenkang
   * @returns {Boolean}
   */
  isSafari() {
    return bowser.name === 'Safari';
  },
  /**
   * 判断当前浏览器是否Firefox
   * @author xuwenkang
   * @returns {Boolean}
   */
  isFirefox() {
    return bowser.name === 'Firefox';
  },
};

export default env;
