import models from '../models';
import generalUtils from '../utils/generalUtils';

const Role = models.Role;

export default {
  /**
   * Create a new role
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  create(req, res) {
    return Role
      .create(req.body)
      .then(role => res.status(201).json({
        message: 'New role successfully created',
        role
      }))
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Get all roles
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  list(req, res) {
    return Role
      .findAll({
        order: [['id']]
      })
      .then(roles => res.status(200).send(roles))
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Update a role
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  update(req, res) {
    return Role
      .findById(req.params.roleId)
      .then((roleToUpdate) => {
        if (!roleToUpdate) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        return roleToUpdate
          .update(req.body)
            .then((role) => {
              res.status(200).send({
                message: 'Role is successfully updated',
                role
              });
            })
            .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Delete a role
   * @param {object} req
   * @param {object} res
   * @returns nothing
   */
  destroy(req, res) {
    return Role
      .findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        if (role.id <= 3) {
          return res.status(400).send({
            message: 'You cannot delete this role'
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Deleted successfully'
          }))
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  }
};
