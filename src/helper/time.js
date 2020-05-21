import moment from 'moment';
import _ from 'lodash';

const time = {
  /**
   * 将时间格式字符串修改为YYYY-MM-DD格式
   * @author xuwenkang
   * @param {String} str 后端接口返回的时间格式字符串
   * @param {String} formatter='YYYY-MM-DD' 需要装换成的时间格式
   * @returns {String} 格式化后的时间字符串
   */
  format(str, formatter = 'YYYY-MM-DD') {
    let date = '';
    if (str) {
      date = moment(str).format(formatter);
    }
    return date;
  },

  /**
   * 获取今天是周几
   * @author xuwenkang
   * @param {Number| Date} d Date对象或者是数字(0,1,2,3,4,5,6)
   */
  weekDay(d) {
    const weekLocals = ['日', '一', '二', '三', '四', '五', '六'];
    if (typeof d === 'number') return `周${weekLocals[d]}`;
    return `周${weekLocals[d.getDay()]}`;
  },

  /**
   * 根据周期字符串返回周期开始时间、结束时间、周期时间段的对象
   * @author xuwenkang
   * @param {String} cycleType 周期字符串
   */
  getDurationString(cycleType, maxDataDt, outputFomater = 'YYYYMMDD', isFullPeriod = false) {
    const fomater = 'YYYY/MM/DD';
    let durationEnd = '';
    let durationStart = '';
    const quarter = moment().quarter();
    let lastQuarter = quarter - 1;
    let year = moment().year();
    const lastYear = year - 1;
    let temp;
    if (_.isEmpty(maxDataDt)) {
      temp = moment().subtract(1, 'days');
    } else {
      temp = moment(maxDataDt, fomater);
    }
    const dateText = temp.format('YYYY/MM/DD');
    switch (cycleType) {
      case 'beforeLastMonth':
        durationStart = moment(dateText, fomater).subtract(2, 'month').startOf('month');
        durationEnd = moment(dateText, fomater).subtract(2, 'month').endOf('month');
        break;
      case 'lastMonth':
        durationStart = moment(dateText, fomater).subtract(1, 'month').startOf('month');
        durationEnd = moment(dateText, fomater).subtract(1, 'month').endOf('month');
        break;
      case 'lastQuarter':
        if (quarter <= 1) {
          year--;
          lastQuarter = 4;
        }
        durationStart = moment(moment().year(year).startOf('quarter').quarter(lastQuarter));
        durationEnd = moment(moment().year(year).endOf('quarter').quarter(lastQuarter));
        break;
      case 'lastYear':
        durationStart = moment(moment().year(lastYear).startOf('year'));
        durationEnd = moment(moment().year(lastYear).endOf('year'));
        break;
      default:
        durationStart = moment(dateText, fomater).startOf(cycleType);
        durationEnd = isFullPeriod
          ? moment(dateText, fomater).endOf(cycleType)
          : moment(dateText, fomater);
        break;
    }
    const duration = {
      cycleType,
      durationStr: `${durationStart.format(fomater)}-${durationEnd.format(fomater)}`,
      begin: durationStart.format(outputFomater),
      end: durationEnd.format(outputFomater),
    };
    return duration;
  },
  /**
   *计算出时间段的起始时间以及结束时间
   */
  transformTime(key, format = 'YYYYMMDD') {
    const today = moment().format(format);
    switch (key) {
      case 'month':
        return {
          startDate: moment().subtract(1, 'months').format(format),
          endDate: today,
        };
      case 'season':
        return {
          startDate: moment().subtract(3, 'months').format(format),
          endDate: today,
        };
      case 'halfYear':
        return {
          startDate: moment().subtract(6, 'months').format(format),
          endDate: today,
        };
      case 'currentYear':
        return {
          startDate: moment().startOf('year').format(format),
          endDate: today,
        };
      default:
        return {
          startDate: moment().subtract(1, 'months').format(format),
          endDate: today,
        };
    }
  },
  /**
   * 根据格式将时间转成时间戳
   * @author xiexiaowei
   * @param {Date/String} dateString 时间或时间字符串 例：2019-10-15
   * @param {String} format 时间格式字符串 默认 YYYY-MM-DD
   */
  convertToTimeStamp(dateString, format = 'YYYY-MM-DD') {
    return _.isNull(dateString) ? null : moment(dateString, format).valueOf();
  },
};

export default time;

export const {
  format,
  weekDay,
  getDurationString,
  convertToTimeStamp,
} = time;
