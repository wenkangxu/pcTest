const regexp = {
  /**
   * 是否是数字,包含零的正整数
   */
  integer: /^0$|^[1-9]\d*?$/,
  /**
   * 中文字符的正则表达式
   */
  chinese: /[\u4e00-\u9fa5]/g,
  /**
   * 手机号码的正则表达式
   */
  cellPhone: /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-8]{1})|(18[0-9]{1}))+\d{8}$/,
  /**
   * 座机号码的正则表达式
   */
  tellPhone: /^(00?[0-9]{2,3}-?)?([2-9][0-9]{6,7})(-[0-9]{1,8})?$/,
  /**
   * 电子邮箱的正则表达式
   */
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  /**
   * 邮政编码的正则表达式
   */
  zipCode: /^[0-9]{6}$/,
  /**
   * 整数部分千分位格式化的正则表达式
   * 例子：12345604 => 12,345,604
   */
  thousandInteger: /(\d{1,3})(?=(\d{3})+(?:$|\D))/g,
  /**
   * 小数部分千分位格式化的正则表达式
   * 例子： 12345604 => 123,456,04
   */
  thousandDecimal: /(\d{3})(?=(\d{1,3})+)/g,
  /**
   * 正整数
   */
  positiveInteger: /^\+?[1-9][0-9]*$/,
  // 非负数
  positiveNum: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
  /**
   * 非零正数，包含小数
   */
  positiveNumber: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
  /**
   * desc: 将pathname分割成集合
   * pathname: '/a/b/c'
   * ['/a', '/b', '/c']
   */
  matchPathList: /\/([^/]*)(?=(\/|$))/g,
  /**
   * @desc: 全量匹配内容中的换行符
   * window换行: \r\n
   * Unix和OS X : \n
   * Classic Mac: \r
   * */
  returnLine: /[\n\r]/g,
  /**
   * @desc：全量匹配文本中的URL
   * 至汉字、空格 结束
   */
  url: /(((https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)(:\d+)?((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[-+=&;%@.\w/?_]*))?)/g,
  /**
   * @desc 统一社会信用码正则
   */
  uscc: /[0123456789ABCDEFGHJKLMNPQRTUWXY]{2}\d{6}[0123456789ABCDEFGHJKLMNPQRTUWXY]{10}$/,
  /**
   * @desc 18位身份证号码正则
   */
  idNo18Digit: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  /**
   * @desc 15位身份证号码正则
   */
  idNo15Digit: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
  /**
   * @desc 判断是否只含有字母与数字
   */
  onlyAlphabetAndNumber: /^[A-Za-z0-9]+$/,
  /**
   * @desc: 只含有字母、数字和汉字
   */
  onlyWordNumAlphabet: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
  /**
   * @desc: 匹配所有的html标签
   */
  htmlTags: /<[^>]*>/g,
  /**
   * @desc: 第一位数字不能为0
   */
  noFirstZero: /^[1-9]/,
  /**
   * @desc: 正数，小数位不能超过两位
   */
  twoDecimals: /^\d+(\.\d{1,2})?$/,
  /**
   * @desc 判断是否只含有字母
   */
  onlyAlphabet: /^[A-Za-z]+$/,
  /**
   * @desc 判断是否只含有字母数字和空格
   */
  alphabetAndSpaceAndNumber: /^[A-Za-z0-9\s]+$/,
  /**
   * @desc 判断是否只含有字母数字和空格和一些英文符号#.,-/
   */
  alphabetAndSpaceAndNumberAndSymbol: /^['!"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~0-9a-zA-Z\s]+$/,
  /**
   * @desc 判断是否含有字母/
   */
  hasAlphabet: /[a-zA-Z]+/,
};

export default regexp;

export const {
  chinese,
  cellPhone,
  tellPhone,
  email,
  thousandInteger,
  thousandDecimal,
  positiveInteger,
  positiveNumber,
  matchPathList,
  returnLine,
  url,
  uscc,
  idNo18Digit,
  idNo15Digit,
  onlyAlphabetAndNumber,
  onlyWordNumAlphabet,
  htmlTags,
  noFirstZero,
  twoDecimals,
  onlyAlphabet,
  alphabetAndSpaceAndNumber,
} = regexp;
