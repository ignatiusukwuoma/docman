import models from '../models';
import userUtils from '../utils/userUtils';
import generalUtils from '../utils/generalUtils';

const User = models.User;

export default {
  /**
   * Create a new user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  create(req, res) {
    if (req.body.roleId <= 2) {
      return res.status(400).json({
        message: 'You cannot create an Admin'
      });
    }
    return User
      .create(req.body)
      .then((user) => {
        const userPayload = generalUtils.userPayload(user);
        const token = userUtils.generateJwtToken(userPayload);
        return res.status(201).json({
          message: 'User is successfully created',
          token
        });
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Get all users
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  list(req, res) {
    const limit = req.query.limit > 0 ? req.query.limit : 9;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
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
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Gets a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        return res.status(200).send(generalUtils.userPayload(user));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Updates a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
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
          .update({
            name: req.body.name || user.name,
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            roleId: req.body.roleId || user.roleId
          })
          .then(() => res.status(200).send(generalUtils.userPayload(user)))
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Deletes a user
   * @param {object} req
   * @param {object} res
   * @returns nothing
   */
  destroy(req, res) {
    const userId = parseInt(req.params.userId, 10);
    if (req.decoded.data.id !== userId) {
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
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Signs in a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
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
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Logs a user out
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  logout(req, res) {
    res.status(200)
      .json({
        message: 'You have signed out'
      });
  }
};
