import React from 'react';
import history from './history';
import Layout from './containers/Layout';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
