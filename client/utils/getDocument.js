/**
 * Gets a document to edit from an array of documents
 * @param {array} allDocuments
 * @param {number} id
 * @returns {object} document to edit
 */
function getDocument(allDocuments, id) {
  const documentToUpdate = allDocuments
    .filter(eachDocument => eachDocument.id === Number(id));
  if (documentToUpdate.length > 0) {
    return documentToUpdate[0];
  }
  return null;
}

export default getDocument;
