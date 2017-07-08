import expect from 'expect';
import sinon from 'sinon';
import getDocument from '../../utils/getDocument';
import { throwError } from '../../utils/errorHandler';

const documents = [
  { id: 1, title: 'A' },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' }
];

const errors = { message: 'Big time error' };

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
