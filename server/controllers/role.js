import models from '../models';

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
      .catch(error => res.status(400).send(error));
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
      .catch(error => res.status(400).send(error));
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
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        return role
          .update(req.body)
            .then((updatedRole) => {
              res.status(200).send({ updatedRole });
            })
            .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
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
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
