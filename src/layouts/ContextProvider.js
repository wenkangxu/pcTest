/*
 * @Author: xuwenkang
 * @Description: 提供context
 * @Date: 2020-05-20 21:27:34
 * @Last Modified by: xuwenkang
 * @Last Modified time: 2020-05-20 21:27:34
*/


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';

const mapDispatchToProps = {
  push: routerRedux.push,
  replace: routerRedux.replace,
  goBack: routerRedux.goBack,
};

@connect(null, mapDispatchToProps)
export default class ContextProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    push: PropTypes.func,
    replace: PropTypes.func,
    goBack: PropTypes.func,
  };

  getChildContext() {
    const {
      goBack,
    } = this.props;
    return {
      push: this.hackPush,
      replace: this.hackReplace,
      goBack,
    };
  }

  hackReplace = (...args) => {
    const { replace } = this.props;
    if (typeof args[0] === 'string') {
      return replace(...args);
    }
    const params = {
      search: `?${stringify(args[0].query)}`,
      ...args[0],
    };
    window.isInnerPageChange = true;
    return replace(params);
  }

  hackPush = (...args) => {
    const { push } = this.props;
    // TODO 针对相同的地址，不切换
    if (typeof args[0] === 'string') {
      return push(...args);
    }
    const params = {
      search: `?${stringify(args[0].query)}`,
      ...args[0],
    };
    window.isInnerPageChange = true;
    return push(params);
  }

  render() {
    const { children } = this.props;
    return (
      <>{children}</>
    );
  }
}
