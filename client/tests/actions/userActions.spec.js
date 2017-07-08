import expect from 'expect';
import jwt from 'jsonwebtoken';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../actions/userActions';
import * as actionTypes from '../../actions/actionTypes';

describe('User Actions', () => {
  describe('Action Creators', () => {
    it('returns a LOGIN_SUCCESS action', () => {
      const userDetails = {
        id: 2,
        roleId: 2,
        username: 'goodness'
      };
      const token = jwt.sign(
        { data: userDetails }, 'secret', { expiresIn: '1h' }
      );
      const expectedAction = {
        type: actionTypes.LOGIN_SUCCESS,
        user: userDetails
      };
      const action = userActions.login(token, actionTypes.LOGIN_SUCCESS);
      expect(action).toEqual(expectedAction);
    });
  });

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get Users', () => {
    it('gets users and dispatches GET_USERS_SUCCESS', () => {
      moxios.stubRequest('/users/?offset=0', {
        status: 200,
        response: {
          users: [{ username: 'superman' }],
          pageData: {}
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_USERS_SUCCESS',
          users: [{ username: 'superman' }],
          pageData: {},
          offset: 0 }
      ];
      const store = mockStore();
      return store.dispatch(userActions.getUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Get User', () => {
    it("gets a user's profile and dispatches GET_USER_SUCCESS", () => {
      moxios.stubRequest('/users/7', {
        status: 200,
        response: { username: 'income' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_USER_SUCCESS', user: { username: 'income' } }
      ];
      const store = mockStore();
      return store.dispatch(userActions.getUser(7))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Update User', () => {
    it('updates a user and dispatches UPDATE_USER_SUCCESS', () => {
      moxios.stubRequest('/users/7', {
        status: 200,
        response: { id: 7, name: 'Legolas' }
      });

      const store = mockStore({ loggedIn: false, user: {} });
      return store.dispatch(
        userActions.updateUser(7)
        ).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(actionTypes.BEGIN_AJAX_CALL);
          expect(actions[1].type).toEqual(actionTypes.UPDATE_USER_SUCCESS);
          expect(actions[1].user).toEqual({ id: 7, name: 'Legolas' });
        });
    });
  });

  describe('DeleteUser', () => {
    it("deletes a user's account and dispatches DELETE_USER_SUCCESS", () => {
      moxios.stubRequest('/users/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'DELETE_USER_SUCCESS' }
      ];
      const store = mockStore();

      return store.dispatch(userActions.deleteUser(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Login', () => {
    it('sends signin details and returns LOGIN_SUCCESS', () => {
      const userDetails = {
        id: 1,
        roleId: 1,
        username: 'superman'
      };
      const token = jwt.sign(
        { data: userDetails }, 'secret', { expiresIn: '1h' }
      );
      moxios.stubRequest('/users/login', {
        status: 200,
        response: {
          token,
          message: 'Login successful'
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'LOGIN_SUCCESS',
          user: { id: 1, roleId: 1, username: 'superman' } }
      ];
      const store = mockStore({ loggedIn: false, user: {} });

      return store.dispatch(
        userActions.signin({ username: 'superman', password: 'password' })
        ).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Signup User', () => {
    it('registers, logs in a user and dispatches LOGIN_SUCCESS', () => {
      const userDetails = {
        id: 5,
        roleId: 5,
        username: 'antman'
      };
      const token = jwt.sign(
        { data: userDetails }, 'secret', { expiresIn: '1h' }
      );
      moxios.stubRequest('/users', {
        status: 200,
        response: {
          token,
          message: 'Login successful'
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'LOGIN_SUCCESS',
          user: { id: 5, roleId: 5, username: 'antman' } }
      ];
      const store = mockStore({ loggedIn: false, user: {} });
      return store.dispatch(userActions.signup({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Logout', () => {
    it('logs a user out and dispatches LOGOUT', () => {
      const expectedActions = [
        { type: 'LOGOUT' },
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'END_AJAX_CALL' }];
      const store = mockStore();
      store.dispatch(userActions.logout());
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.LOGOUT);
    });
  });
});
