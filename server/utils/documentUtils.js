export default {
  /**
   * Creates a custom `where` for documents
   * @param {object} req
   * @returns {object} query
   */
  documentQuery(req) {
    const query = {};
    const userId = req.decoded.data.id;
    const roleId = req.decoded.data.roleId;
    if (roleId <= 2) {
      query.where = {};
    } else {
      query.where = {
        $or: [
          { access: 'public' },
          { access: 'role' },
          { userId }
        ]
      };
    }
    return query;
  }
};
