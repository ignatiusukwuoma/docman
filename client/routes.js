import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import WelcomePage from './components/pages/WelcomePage.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={WelcomePage} />
  </Route>
);
