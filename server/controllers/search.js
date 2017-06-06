import models from '../models';
import generalUtils from '../utils/generalUtils';

export default {
  searchUsers(req, res) {
    const query = `%${req.query.q}%`;
    const limit = 12;
    const offset = 0;
    return models.User
      .findAndCount({
        limit,
        offset,
        where: {
          $or: [
          { username: { $iLike: query } },
          { name: { $iLike: query } },
          { email: { $iLike: query } }
          ] },
        attributes: ['id', 'username', 'name', 'email', 'roleId'],
        order: [['id']],
      })
      .then(userDatabase => res.status(200).json({
        users: userDatabase.rows,
        pageData: generalUtils.formatPage(userDatabase.count, limit, offset)
      }))
      .catch(error => res.status(400).send(error));
  },

  searchDocuments(req, res) {
    const query = `%${req.query.q}%`;
    const limit = 12;
    const offset = 0;
    return models.Document
      .findAndCountAll({
        limit,
        offset,
        where: { title: {
          $iLike: query
        } },
        include: [{
          model: models.User,
          attributes: ['username', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      })
      .then(documentDatabase => res.status(200).json({
        documents: documentDatabase.rows,
        pageData: generalUtils.formatPage(documentDatabase.count, limit, offset)
      }))
      .catch(error => res.status(400).send(error));
  }

};
