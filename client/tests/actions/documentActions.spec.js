import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as documentActions from '../../actions/documentActions';
import * as actionTypes from '../../actions/actionTypes';


describe('Document Actions', () => {
  describe('Action Creators', () => {
    it('returns a GET_DOCUMENTS_SUCCESS action', () => {
      const documents = [{}, {}];
      const pageData = {};
      const offset = 0;
      const expectedAction = {
        type: actionTypes.GET_DOCUMENTS_SUCCESS,
        documents,
        pageData,
        offset
      };
      const action = documentActions
        .getDocumentSuccess(documents, pageData, offset);
      expect(action).toEqual(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Get Documents', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('gets documents and dispatches GET_DOCUMENTS_SUCCESS', () => {
      moxios.stubRequest('/documents?offset=0', {
        status: 200,
        response: {
          documents: [{ title: 'Andela' }],
          pageData: {}
        }
      });
      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_DOCUMENTS_SUCCESS',
          documents: [{ title: 'Andela' }],
          pageData: {},
          offset: 0 }
      ];
      const store = mockStore();
      return store.dispatch(documentActions.getDocuments())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('gets user documents and dispatches GET_DOCUMENTS_SUCCESS', () => {
      moxios.stubRequest('/users/2/documents?offset=0', {
        status: 200,
        response: {
          documents: [{ title: 'Ignatius docs' }],
          pageData: {}
        }
      });
      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_DOCUMENTS_SUCCESS',
          documents: [{ title: 'Ignatius docs' }],
          pageData: {},
          offset: 0 }
      ];
      const store = mockStore();
      return store.dispatch(documentActions.getUserDocuments(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Create Document', () => {
    it('creates a new document and dispatches CREATE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents', {
        status: 201,
        response: {
          document: { title: 'Andela' },
          message: 'Success'
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'CREATE_DOCUMENT_SUCCESS',
          message: 'Success',
          document: { title: 'Andela' }
        }
      ];
      const store = mockStore({ loggedIn: false, user: {} });
      return store.dispatch(documentActions.createDocument({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Delete Document', () => {
    it('deletes a document and dispatches DELETE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'DELETE_DOCUMENT_SUCCESS' }
      ];
      const store = mockStore();
      return store.dispatch(documentActions.deleteDocument(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Get Document', () => {
    it('gets a document and dispatches GET_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents/3', {
        status: 200,
        response: { title: 'Andela' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_DOCUMENT_SUCCESS',
          document: { title: 'Andela' }
        }
      ];
      const store = mockStore();
      return store.dispatch(documentActions.getDocument(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Update Document', () => {
    it('updates a document and dispatches UPDATE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents/4', {
        status: 200,
        response: {
          message: 'Success',
          document: { title: 'Mandela' }
        }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'UPDATE_DOCUMENT_SUCCESS',
          message: 'Success',
          document: { title: 'Mandela' }
        }
      ];
      const store = mockStore({});
      return store.dispatch(documentActions.updateDocument({ id: 4 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
