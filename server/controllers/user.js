import models from '../models';
import userUtils from '../utils/userUtils';
import generalUtils from '../utils/generalUtils';

const User = models.User;

export default {
  create(req, res) {
    return User
      .create(req.body)
      .then((user) => {
        const userPayload = generalUtils.userPayload(user);
        const token = userUtils.generateJwtToken(userPayload);
        return res.status(201).json({
          message: 'User is successfully created',
          user,
          token,
        });
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const limit = req.query.limit || 12;
    const offset = req.query.offset || 0;
    return User
      .findAndCountAll({
        limit,
        offset,
        attributes: ['id', 'username', 'name', 'email', 'roleId'],
        order: [['id']]
      })
      .then(userDatabase => res.status(200).json({
        users: userDatabase.rows,
        pageData: generalUtils.formatPage(userDatabase.count, limit, offset)
      }))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found',
          });
        }
        return res.status(200).send(generalUtils.userPayload(user));
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const userId = parseInt(req.params.userId, 10);
    if (req.body.roleId <= 2 && req.decoded.data.roleId !== 1) {
      return res.status(401).json({
        message: 'Access denied: SuperAdmin credentials required'
      });
    }
    if (req.decoded.data.roleId !== 1 && req.decoded.data.id !== userId) {
      return res.status(401).json({
        message: 'You do not have the permission to do that'
      });
    }
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        return user
          .update(req.body, { field: Object.keys(req.body) })
          .then(() => res.status(200).send(generalUtils.userPayload(user)))
          .catch(error => res.status(403).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    const userId = parseInt(req.params.userId, 10);
    if (req.decoded.data.roleId !== 1 && req.decoded.data.id !== userId) {
      return res.status(401).json({
        message: 'You do not have the permission to do that'
      });
    }
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return User
      .findOne({
        where: {
          $or: [{ username: req.body.username }, { email: req.body.email }]
        }
      })
      .then((user) => {
        const loginUser = userUtils.loginUser(user, req, res);
        return loginUser;
      })
      .catch(error => res.status(400)
        .json({
          message: 'There was an error logging into the account',
          error,
        }));
  },

  logout(req, res) {
    res.setHeader['x-access-token'] = '';
    res.status(200)
      .json({
        message: 'You have signed out'
      });
  }
};
