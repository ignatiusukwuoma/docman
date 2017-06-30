export default {
  /**
   * Generate data for pagination
   * @param {number} count
   * @param {number} limit
   * @param {number} offset
   * @returns {object} pagination data
   */
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

  /**
   * Extract relevant data from user object
   * @param {object} user
   * @returns {object} relevant user data
   */
  userPayload(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      roleId: user.roleId
    };
  },

/**
 * Handle sequelize errors
 * @param {object} error error object
 * @param {function} res server response function
 * @returns {object} retrieved error message
 */
  handleError(error, res) {
    return error.errors
      ? res.status(400).send({ message: error.errors[0].message })
      : res.status(400).send({ message: error.message });
  }

};
