import models from '../models';

const Role = models.Role;

export default {
  create(req, res) {
    return Role
      .create(req.body)
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Role
      .findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          return res.status(400).send({
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
