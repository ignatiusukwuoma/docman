import expect from 'expect';
import { documents, document } from '../../reducers/documentReducers';
import * as actions from '../../actions/documentActions';
import * as actionTypes from '../../actions/actionTypes';

describe('Documents Reducers', () => {
  it('should add a new document when passed CREATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];
    const newDocument = { title: 'C' };
    const action = {
      type: actionTypes.CREATE_DOCUMENT_SUCCESS,
      document: newDocument
    };
    // act
    const newState = documents(initialState, action);
    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('C');
    expect(newState[1].title).toEqual('A');
    expect(newState[2].title).toEqual('B');
  });

  it('should get documents when passed GET_DOCUMENTS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const allDocuments = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = {
      type: actionTypes.GET_DOCUMENTS_SUCCESS,
      documents: allDocuments
    };
    // act
    const newState = documents(initialState, action);
    // assert
    expect(newState).toEqual(allDocuments);
  });

  it('should update a document when passed UPDATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const newDocument = { id: '2', title: 'New B Title' };
    const action = {
      type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
      document: newDocument
    };
    // act
    const newState = documents(initialState, action);
    const updatedDocument = newState.find(doc => doc.id === newDocument.id);
    const untouchedDocument = newState.find(doc => doc.id === '1');
    // assert
    expect(updatedDocument.title).toEqual('New B Title');
    expect(untouchedDocument.title).toEqual('A');
    expect(newState.length).toBe(3);
  });

  it('should get search results when passed SEARCH_DOCUMENTS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const searchResult = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = {
      type: actionTypes.SEARCH_DOCUMENTS_SUCCESS,
      documents: searchResult
    };
    // act
    const newState = documents(initialState, action);
    //assert
    expect(newState).toEqual(searchResult);
  });

  it('should return the state when no actionType matches', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' }
    ];
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = documents(initialState, action);
    // assert
    expect(newState).toEqual(initialState);
  });
});

describe('Document Reducer', () => {
  it('should get document when passed GET_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = {};
    const myDocument = { title: 'A' };
    const action = {
      type: actionTypes.GET_DOCUMENT_SUCCESS,
      document: myDocument
    };
    // act
    const newState = document(initialState, action);
    // assert
    expect(newState).toEqual(myDocument);
  });

  it('should return the state when no actionType matches', () => {
    // arrange
    const initialState = { id: '1', title: 'A' };
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = document(initialState, action);
    // assert
    expect(newState).toEqual(initialState);
  });
});
