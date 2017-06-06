import jwt from 'jsonwebtoken';
import generalUtils from '../utils/generalUtils';

require('dotenv').config();

const secret = process.env.JWT_SECRET;

export default {
  generateJwtToken(user) {
    const token = jwt.sign({
      data: user,
    }, secret, { expiresIn: '48h' });
    return token;
  },

  loginUser(user, req, res) {
    let response = {};
    if (!user) {
      response = res.status(400)
        .json({
          message: 'User not found'
        });
      return response;
    } else if (user) {
      if (!req.body.password) {
        response = res.status(401)
          .json({
            message: 'Invalid password'
          });
        return response;
      }
      if (!user.comparePassword(req.body.password)) {
        response = res.status(401)
          .json({
            message: 'Wrong password'
          });
        return response;
      }
      const userPayload = generalUtils.userPayload(user);
      const token = this.generateJwtToken(userPayload);
      response = res.status(200)
        .json({
          message: 'Login successful',
          token,
        });
      return response;
    }
  }

};
