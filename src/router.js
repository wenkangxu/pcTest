import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  routerRedux,
} from 'dva/router';

import { getRouterData } from './common/router';
import App from './layouts/Main';

const { ConnectedRouter } = routerRedux;

export default function Routers({ history, app }) {
  const routerData = getRouterData(app);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          path="/"
          render={(props) => <App {...props} routerData={routerData} />}
        />
      </Switch>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};
