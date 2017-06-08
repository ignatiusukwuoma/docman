export default {
  documentQuery(req) {
    const query = {};
    const userId = req.decoded.data.id;
    const roleId = req.decoded.data.roleId;
    if (roleId <= 2) query.where = {};
    else {
      query.where = {
        $or: [
          { access: 'public' },
          { userId },
        ],
      };
    }
    return query;
  }
};
