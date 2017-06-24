export default {
  formatPage(count, limit, offset) {
    const pageSize = (count - offset) >= limit ? limit : count - offset;
    const pageNumber = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(count / limit);

    return {
      count,
      pageSize,
      pageNumber,
      totalPages
    };
  },

  userPayload(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      roleId: user.roleId
    };
  }
};
