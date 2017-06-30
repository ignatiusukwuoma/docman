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
  }
};
