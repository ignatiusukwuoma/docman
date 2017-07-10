export default {
  /**
   * Creates a custom `where` for documents
   * @param {object} req
   * @returns {object} query
   */
  documentQuery(req) {
    const query = {};
    const userId = req.decoded.data.id;
    query.where = {
      $or: [
        { access: 'public' },
        { access: 'role' },
        { userId }
      ]
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
