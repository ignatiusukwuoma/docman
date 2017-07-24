import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as searchActions from '../../actions/searchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Search Users', () => {
    it('searches for users and dispatches SEARCH_USERS_SUCCESS', () => {
      moxios.stubRequest('/search/users/?q=spiderman&offset=0', {
        status: 200,
        response: {
          users: [{ username: 'spiderman' }],
          pageData: {}
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'SEARCH_USERS_SUCCESS',
          users: [{ username: 'spiderman' }],
          pageData: {},
          offset: 0,
          query: 'spiderman' }
      ];
      const store = mockStore();
      return store.dispatch(searchActions.searchUsers('spiderman'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('SearchDocument', () => {
    it('searches for documents and dispatches SEARCH_DOCUMENTS_SUCCESS', () => {
      moxios.stubRequest('/search/documents/?q=andela&offset=0', {
        status: 200,
        response: {
          documents: [{ title: 'andela' }],
          pageData: {}
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'SEARCH_DOCUMENTS_SUCCESS',
          documents: [{ title: 'andela' }],
          pageData: {},
          offset: 0,
          query: 'andela' }
      ];
      const store = mockStore();
      return store.dispatch(searchActions.searchDocuments('andela'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

});
