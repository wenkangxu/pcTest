import {
  chinese,
  cellPhone,
  tellPhone,
  email,
  uscc,
  idNo18Digit,
  idNo15Digit,
  onlyAlphabetAndNumber,
} from './regexp';

const check = {
  /**
   * 判断单个字符是否中文
   * @author sunweiibin
   * @param {String} char 需要进行判断的单个字符
   * @returns {Boolean}
   */
  isChinese(char) {
    return chinese.test(char);
  },

  /**
   * 判断一个字符串是否手机号码
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   */
  isCellPhone(v) {
    return cellPhone.test(v);
  },
  /**
   * 判断一个字符串是否座机
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   */
  isTelPhone(v) {
    return tellPhone.test(v);
  },
  /**
   * 判断一个字符串是否电子邮箱
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   */
  isEmail(v) {
    return email.test(v);
  },

  /**
   * 判断一个字符串是否符合统一社会信用码的格式
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   * @return {Boolean}
   */
  isUnifiedSocialCreditCode(v) {
    return uscc.test(v);
  },

  /**
   * 判断一个字符串是否符合18位身份证号码的格式
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   * @return {Boolean}
   */
  is18gitiIDCardCode(v) {
    return idNo18Digit.test(v);
  },

  /**
   * 判断一个字符串是否符合15位身份证号码的格式
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   * @return {Boolean}
   */
  is15gitiIDCardCode(v) {
    return idNo15Digit.test(v);
  },
  /**
   * 判断一个字符串是否只含有字母和数字
   * @author xuwenkang
   * @param {String} v 要验证的字符串
   * @return {Boolean}
   */
  isOnlyAlphabetAndNumber(v) {
    return onlyAlphabetAndNumber.test(v);
  },
};

export default check;

export const {
  isChinese,
  isSightingTelescope,
  isNull,
  isCellPhone,
  isTelPhone,
  isEmail,
  isUnifiedSocialCreditCode,
  is18gitiIDCardCode,
  is15gitiIDCardCode,
  isOnlyAlphabetAndNumber,
  isNumberEmpty,
} = check;
