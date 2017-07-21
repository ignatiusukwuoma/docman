/**
 * Next page function for pagination component
 * @returns {function} action
 */
export function nextPage(elements, action, id, offset, query, search) {
  if (elements.length < 9) {
    return;
  }
  if (query) {
    return search(query, offset + 9);
  }
  if (id > 0) {
    return action(id, offset + 9);
  }
  return action(offset + 9);
}


/**
 * Previous page function for pagination component
 * @returns {function} action
 */
export function prevPage(action, id, offset, query, search) {
  if (offset < 1) {
    return;
  }
  if (query) {
    return search(query, offset - 9);
  }
  if (id > 0) {
    return action(id, offset - 9);
  }
  return action(offset - 9);
}
