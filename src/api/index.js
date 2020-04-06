import apiCreator from '../utils/apiCreator';
import commonAPI from './common';

const api = apiCreator();

const exported = {
  // 暴露api上的几个底层方法: get / post
  ...api,

  // ========== 公用接口
  common: commonAPI(api),

};

export default exported;

export const {
  common,
} = exported;
