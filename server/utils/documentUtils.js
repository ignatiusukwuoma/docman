import models from '../models';
export default {
  /**
   * Creates a custom `where` and `include` for documents
   * @param {object} request
   * @returns {object} query
   */
  documentQuery(request) {
    const query = {};
    const include = {};
    const userId = request.decoded.data.id;
    const roleId = request.decoded.data.roleId;
    query.where = {
      $or: [
        { access: 'public' },
        { access: 'role' },
        { userId }
      ]
    };
    query.include = {
      model: models.User,
      attributes: ['username', 'roleId']
    };
    return query;
  },

  /**
   * Split a query and searches for each item
   * @param {any} req
   * @returns {array} queries
   */
  splitQuery(req) {
    const queries = [];
    const allQueries = req.query.q.split(' ');
    allQueries.forEach(eachQuery => {
      const query = `%${eachQuery}%`;
      queries.push({ $iLike: query });
    });
    return queries;
  }
};
