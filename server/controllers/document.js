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
        userId: req.decoded.data.id
      })
      .then(document => res.status(201).json({
        message: 'New document was successfully created',
        document
      }))
      .catch(error => res.status(400).send(error));
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
        where: documentQuery.where,
        limit,
        offset,
        include: [{
          model: models.User,
          attributes: ['username', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      })
      .then((documentDatabase) => {
        let omitted = 0;
        const visibleDocuments = roleId <= 2 ? documentDatabase.rows
        : documentDatabase.rows.filter((document) => {
          if (document.access === 'role'
            && document.User.roleId !== roleId) {
            omitted += 1;
            return false;
          }
          return true;
        });
        const response = {
          documents: visibleDocuments,
          pageData: generalUtils
            .formatPage(documentDatabase.count - omitted, limit, offset)
        };
        res.status(200).send(response);
      })
      .catch(error => res.status(400).send(error));
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
              attributes: ['username', 'roleId']
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
          .catch(error => res.status(400).json({
            message: 'There was an error retrieving the documents',
            error
          }));
      })
      .catch(error => res.status(400).send(error));
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
          attributes: ['username', 'roleId']
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
        if (document.access !== 'public' && roleId > 2
          && document.userId !== userId
          && !(document.access === 'role'
            && document.User.roleId === roleId)) {
          return res.status(401).json({
            message: 'You are not permitted to access this document'
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
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
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
          });
        }
        const userId = req.decoded.data.id;
        const roleId = req.decoded.data.roleId;
        if (roleId > 2 && document.userId !== userId) {
          return res.status(401).json({
            message: 'You are not permitted to access this document'
          });
        }
        return document
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedDocument => res.status(200).json({
            message: 'Document has been updated',
            updatedDocument
          }))
          .catch(error => res.status(403).send(error));
      })
      .catch(error => res.status(400).send(error));
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
        const roleId = req.decoded.data.roleId;
        if (roleId > 2 && document.userId !== userId) {
          return res.status(401).json({
            message: 'You are not permitted to delete this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(403).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
