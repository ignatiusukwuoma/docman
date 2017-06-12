import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { login } from './actions/userActions';
import { LOGIN_SUCCESS } from './actions/actionTypes';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
// const token = localStorage.getItem('jwToken');
// if (token) {
//   store.dispatch(login(token, LOGIN_SUCCESS));
// }
render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
