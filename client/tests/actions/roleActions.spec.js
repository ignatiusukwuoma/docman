import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as roleActions from '../../actions/roleActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Role Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get Roles', () => {
    it('gets roles and dispatches GET_ROLES_SUCCESS', () => {
      moxios.stubRequest('/roles', {
        status: 200,
        response: [{ name: 'editor' }]
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_ROLES_SUCCESS',
          roles: [{ name: 'editor' }] }
      ];
      const store = mockStore();
      return store.dispatch(roleActions.getRoles())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Create Role', () => {
    it('creates a new role and dispatches CREATE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles', {
        status: 200,
        response: {
          role: { title: 'advertizer' },
          message: 'Success' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'CREATE_ROLE_SUCCESS',
          role: { title: 'advertizer' },
          message: 'Success' }
      ];
      const store = mockStore();
      return store.dispatch(roleActions.createRole({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Update Role', () => {
    it('updates a role and dispatches UPDATE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles/3', {
        status: 200,
        response: { role: { title: 'tester' } }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'UPDATE_ROLE_SUCCESS',
          role: { title: 'tester' } }
      ];

      const store = mockStore({});
      return store.dispatch(roleActions.updateRole(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('DeleteRole', () => {
    it('deletes a role and dispatches DELETE_ROLE_SUCCESS', () => {
      moxios.stubRequest('/roles/3', {
        status: 200
      });
      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'DELETE_ROLE_SUCCESS',
          roleId: 3 }
      ];
      const store = mockStore();
      return store.dispatch(roleActions.deleteRole(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
