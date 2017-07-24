/**
 * Adds a className of active to a menu
 * @param {string} path
 * @returns {string} 'active' or empty string
 */
function makeActive(path) {
  return location.pathname === path ? ' active' : '';
}
export default makeActive;
