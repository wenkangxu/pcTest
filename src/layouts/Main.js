/*
 * @Author: xuwenkang
 * @Description: 最外层的框架主组件
 * @Date: 2020-05-20 21:33:26
 * @Last Modified by: xuwenkang
 * @Last Modified time: 2020-05-21 17:19:44
*/

import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  Route,
  Switch,
  routerRedux,
} from 'dva/router';
import { LocaleProvider, Input, DatePicker } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { generateEffect } from '@/helper/dva';

import ContextProvider from '@/layouts/ContextProvider';
import { getRoutes } from '@/utils/router';
import Empty from '../routes/Empty';

import styles from './main.less';

const effects = {
  // 获取当前用户的待处理任务数
  queryData: 'global/queryData',
};

const mapStateToProps = (state) => ({
  ...state.global,
});

const mapDispatchToProps = {
  push: routerRedux.push,
  replace: routerRedux.replace,
  queryData: generateEffect(effects.queryData, { loading: false }),
};


@connect(mapStateToProps, mapDispatchToProps)
// @withRouter
export default class Main extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    queryData: PropTypes.func.isRequired,
    routerData: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  renderRoutes = () => {
    const { routerData, match } = this.props;
    return (
      <Switch>
        {
          getRoutes(match.path, routerData).map((item) => (
            <Route
              key={item.key}
              path={item.path}
              exact={item.exact}
              render={(props) => <item.component {...props} />}
            />
          ))
        }
        <Route path="*" render={(props) => <Empty {...props} />} />
      </Switch>
    );
  }

  render() {
    const {
      location,
    } = this.props;
    return (
      <LocaleProvider locale={zhCN}>
        <ContextProvider {...this.props}>
          <div id="react-layout" className={styles.layout}>
            <div className={styles.main}>
              <div id="react-content" className={styles.content}>
                {
                  this.renderRoutes()
                }
                <Input />
                <DatePicker />
              </div>
            </div>
          </div>
        </ContextProvider>
      </LocaleProvider>
    );
  }
}
