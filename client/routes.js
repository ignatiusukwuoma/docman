import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import HomePage from './components/pages/HomePage.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/home" component={HomePage} />
  </Route>
);
