import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { login } from './actions/userActions';
import { LOGIN_SUCCESS } from './actions/actionTypes';
import { getDocuments } from './actions/documentActions';
import configureStore from './store/configureStore';
import routes from './routes';
import './scss/style.scss';

const store = configureStore();
// localStorage.clear();
if (localStorage.getItem('docman-pro')) {
  const tokenStorage = JSON.parse(localStorage.getItem('docman-pro'));
  const token = tokenStorage.jwt;
  if (token) {
    store.dispatch(login(token, LOGIN_SUCCESS));
    if (window.location.pathname === '/') {
      browserHistory.push('/home');
    }
  }
}

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
