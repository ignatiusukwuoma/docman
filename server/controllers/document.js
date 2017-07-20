import models from '../models';
import generalUtils from '../utils/generalUtils';
import documentUtils from '../utils/documentUtils';

const Document = models.Document;

export default {
  /**
   * Creates a new document
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} response object
   */
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.decoded.data.id,
        ownerRoleId: req.decoded.data.roleId
      })
      .then(document => res.status(201).json({
        message: 'New document was successfully created',
        document
      }))
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Gets all documents available to the requester
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  list(req, res) {
    const documentQuery = documentUtils.documentQuery(req);
    const limit = req.query.limit > 0 ? req.query.limit : 9;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
    const roleId = req.decoded.data.roleId;
    return Document
      .findAndCountAll({
        include: [documentQuery.include],
        where: documentQuery.where,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      })
      .then((documentDatabase) => {
        const response = {
          documents: documentDatabase.rows,
          pageData: generalUtils
            .formatPage(documentDatabase.count, limit, offset)
        };
        res.status(200).send(response);
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Get all documents belonging to a user
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  listUserDocuments(req, res) {
    const limit = req.query.limit > 0 ? req.query.limit : 9;
    const offset = req.query.offset > 0 ? req.query.offset : 0;
    return models.User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        return Document
          .findAndCountAll({
            where: {
              userId: req.params.userId
            },
            limit,
            offset,
            include: [{
              model: models.User,
              attributes: ['username']
            }],
            order: [['createdAt', 'DESC']]
          })
          .then((documents) => {
            if (!documents) {
              return res.status(404).json({
                message: 'No document found'
              });
            }
            return res.status(200).json({
              message: documents.length > 1
                ? `${documents.rows.length} documents found`
                : `${documents.rows.length} document found`,
              documents: documents.rows,
              pageData: generalUtils
                .formatPage(documents.count, limit, offset)
            });
          })
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Get full details of one document
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  retrieve(req, res) {
    return Document
      .findById(req.params.documentId, {
        include: [{
          model: models.User,
          attributes: ['username']
        }]
      })
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        const userId = req.decoded.data.id;
        const roleId = req.decoded.data.roleId;
        if (document.access !== 'public'
          && document.userId !== userId
          && !(document.access === 'role' && document.ownerRoleId === roleId)
          && !(document.access === 'role' && roleId <= 2)) {
          return res.status(401).json({
            message: 'You are not permitted to access this document'
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Update a document
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  update(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((documentToUpdate) => {
        if (!documentToUpdate) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        const userId = req.decoded.data.id;
        if (documentToUpdate.userId !== userId) {
          return res.status(401).json({
            message: 'You are not permitted to edit this document'
          });
        }
        return documentToUpdate
          .update(req.body, { fields: Object.keys(req.body) })
          .then(document => res.status(200).json({
            message: 'Document is successfully updated',
            document
          }))
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  },

  /**
   * Delete a document
   * @param {object} req
   * @param {object} res
   * @returns nothing
   */
  destroy(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        const userId = req.decoded.data.id;
        if (document.userId !== userId) {
          return res.status(401).json({
            message: 'You are not permitted to delete this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({
            message: 'Deleted successfully'
          }))
          .catch(error => generalUtils.handleError(error, res));
      })
      .catch(error => generalUtils.handleError(error, res));
  }
};
