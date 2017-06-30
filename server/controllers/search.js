import models from '../models';
import generalUtils from '../utils/generalUtils';

export default {
  /**
   * Search users
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  searchUsers(req, res) {
    const query = `%${req.query.q}%`;
    const limit = req.query.limit > 0 ? req.query.limit : 9;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
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
        order: [['id']]
      })
      .then(userDatabase => res.status(200).json({
        users: userDatabase.rows,
        pageData: generalUtils.formatPage(userDatabase.count, limit, offset)
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Search Documents
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  searchDocuments(req, res) {
    const queries = req.query.q.split(' ');
    const query = `%${queries[0]}%`;
    const query1 = queries[1] ? `%${queries[1]}%` : '';
    const query2 = queries[2] ? `%${queries[2]}%` : '';
    const limit = req.query.limit > 0 ? req.query.limit : 9;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
    return models.Document
      .findAndCountAll({
        limit,
        offset,
        where: { title: {
          $or: [
          { $iLike: query },
          { $iLike: query1 },
          { $iLike: query2 }
          ]
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
