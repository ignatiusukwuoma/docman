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
        message: 'A new document has been created',
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
        }]
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
        }
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).json({
            success: false,
            message: 'No documents found for this user',
          });
        }
        return res.status(200).json({
          success: true,
          message: `${documents.length} documents found for this user`,
          documents,
        });
      })
      .catch(error => res.send(400).json({
        success: false,
        message: 'There was an error while retrieving the documents',
        error,
      }));
  }
};
