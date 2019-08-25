/**
 *  `ui/src/index.js`
 *  Application entry point
 */

/*************
 * * IMPORTS *
 *************/

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// Styles
// import 'assets/css/styles.css';

// Components
import Home from './layouts/Home.js';
import * as serviceWorker from './serviceWorker';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" component={Home} />
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// EOF //
