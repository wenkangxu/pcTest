import { message } from 'antd';

/**
 * 延迟指定时间后resolve,主要用在yield语句中
 *
 * 如：
 *  yield ajax.get('/api/xxx');
 *  yield delay(1000); // 模拟网络延迟
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

// 弹出提示信息
export const toastM = (msg, duration = 1) => (
  new Promise(
    (resolve) => {
      message.success(
        msg,
        duration,
        () => resolve(true),
      );
    },
  )
);
