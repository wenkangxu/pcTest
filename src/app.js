import dva from 'dva';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import { message, Modal } from 'antd';
// import * as magic from 'magic';
// import _ from 'lodash';
import routerComponent from './router';

// window.magic = magic;
// console.log('magic', magic);
// 错误处理
const onError = (e) => {
  const { message: msg, duration = 3 } = e;
  message.error(msg, duration);
};


// 离开某个页面，弹出确认框，配合页面中的Prompt使用
const getConfirmation = (msg, callback) => {
  Modal.confirm({
    title: '请确认',
    content: msg,
    onOk() {
      callback(true);
    },
    onCancel() {
      callback();
    },
  });
};


const history = createHashHistory({
  getUserConfirmation: getConfirmation,
});

// 1. Initialize
export const app = dva({
  history,
  onAction: [
    createLogger(),
  ],
  onError,
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(routerComponent);

// 5. Start
app.start('#exApp');
