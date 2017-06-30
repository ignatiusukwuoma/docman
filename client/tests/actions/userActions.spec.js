import expect from 'expect';
import jwt from 'jsonwebtoken';
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
});
