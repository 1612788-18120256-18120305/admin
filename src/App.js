import React, { lazy } from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router-dom';

const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
