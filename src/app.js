import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import { message, Modal } from 'antd';
// import _ from 'lodash';
import routerComponent from './router';

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


const history = createHistory({
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
message.error('222');
Modal.confirm({
  title: '请确认',
  content: 'bababab',
});
