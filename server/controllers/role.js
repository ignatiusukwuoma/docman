import models from '../models';

const Role = models.Role;

export default {
  create(req, res) {
    return Role
      .create(req.body)
      .then(role => res.status(201).json({
        message: 'New role successfully created',
        role,
      }))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Role
      .findAll({
        order: [['id']]
      })
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  },

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

  destroy(req, res) {
    return Role
      .findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
