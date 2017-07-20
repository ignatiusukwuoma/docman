import expect from 'expect';
import sinon from 'sinon';
import insertRole from '../../utils/insertRole';
import getDocument from '../../utils/getDocument';
import { nextPage, prevPage } from '../../utils/paginate';
import { getDocuments } from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';

const nextPageSpy = sinon.spy(nextPage);
const prevPageSpy = sinon.spy(prevPage);
const searchSpy = sinon.spy(searchDocuments);
const documentSpy = sinon.spy(getDocuments);
const documents = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' },
  { id: 5, title: 'E' },
  { id: 6, title: 'F' },
  { id: 7, title: 'G' },
  { id: 8, title: 'H' },
  { id: 9, title: 'I' },
  { id: 10, title: 'J' },
  { id: 11, title: 'K' }
];
const id = 2;
const offset = 0;
const query = 'andela';

describe('getDocument', () => {
  it('should return the document with specified id from an array', () => {
    const id2 = getDocument(documents, 2);
    expect(id2).toBe(documents[1]);
  });

  it('should return null when the document with specified id is absent', () => {
    const absentId = getDocument(documents, 4);
    expect(absentId).toBe(null);
  });
});

describe('nextPage function', () => {
  it('should call searchDocuments if query is passed', () => {
    const next = nextPage(
      documents, getDocuments, id, offset, query, searchSpy);
    expect(searchSpy.calledOnce).toBe(true);
  });

  it('should call getDocuments if id is greater than 0', () => {
    const next = nextPage(documents, documentSpy, id, offset);
    expect(documentSpy.calledWith(id, offset + 9)).toBe(true);
  });

  it('should call getDocuments if all other conditions fail', () => {
    const next = nextPage(documents, getDocuments, 0, 2);
    expect(documentSpy.calledWith()).toBe(true);
  });
});

describe('prevPage function', () => {
  it('should run prevPage when the function runs', () => {
    const prev = prevPageSpy(getDocuments, id, offset, query, searchSpy);
    expect(prevPageSpy.calledOnce).toBe(true);
  });

  it('should call searchDocuments if query is passed', () => {
    const prev = prevPage(getDocuments, id, 2, query, searchDocuments);
    expect(searchSpy.calledOnce).toBe(true);
  });

  it('should call getDocuments if id is greater than 0', () => {
    const prev = prevPage(documentSpy, id, offset);
    expect(documentSpy.calledWith(id)).toBe(true);
  });

  it('should call getDocuments if all other conditions fail', () => {
    const prev = prevPage(getDocuments, 0, 2);
    expect(documentSpy.calledWith()).toBe(true);
  });
});

describe('insertRole function', () => {
  it('should run Admin when role is 2', () => {
    const role = insertRole(2);
    expect(role).toBe('Admin');
  });

  it('should run Admin when role is 3', () => {
    const role = insertRole(3);
    expect(role).toBe('Author');
  });

  it('should run Admin when role is 4', () => {
    const role = insertRole(4);
    expect(role).toBe('Editor');
  });
});
