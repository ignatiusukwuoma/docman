import jwt from 'jsonwebtoken';
import models from '../models';

const User = models.User;

const secret = process.env.JWT_SECRET;

export default {
  validateToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        message: 'You are not signed in. Please sign in.'
      });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Token Authentication failed'
        });
      }
      User.findById(decoded.data.id)
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'User not found'
            });
          }
          req.decoded = decoded;
          next();
        })
        .catch(error => res.status(403)
          .json({
            message: 'There was an error processing your request',
            error,
          }));
    });
  }
};
