import models from '../models';
import generalUtils from '../utils/generalUtils';

const Document = models.Document;

export default {
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.decoded.data.id,
      })
      .then(document => res.status(201).json({
        message: 'New document was successfully created',
        document
      }))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const limit = req.query.limit || 12;
    const offset = req.query.offset || 0;
    return Document
      .findAndCountAll({
        limit,
        offset,
        include: [{
          model: models.User,
          attributes: ['username', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      })
      .then(documentDatabase => res.status(200).json({
        documents: documentDatabase.rows,
        pageData: generalUtils.formatPage(documentDatabase.count, limit, offset)
      }))
      .catch(error => res.status(400).send(error));
  },

  listUserDocuments(req, res) {
    return Document
      .findAll({
        where: {
          userId: req.params.userId
        },
        include: [{
          model: models.User,
          attributes: ['username', 'roleId']
        }]
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).json({
            message: 'No documents found for this user',
          });
        }
        return res.status(200).json({
          message: `${documents.length} documents found for this user`,
          documents,
        });
      })
      .catch(error => res.send(400).json({
        message: 'There was an error retrieving the documents',
        error,
      }));
  },

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
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
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

  destroy(req, res) {
    return Document
      .findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found'
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
