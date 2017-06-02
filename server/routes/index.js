import controllers from '../controllers';
import authMiddlewares from '../middlewares/auth';

const userControllers = controllers.user;
const roleControllers = controllers.role;
const documentControllers = controllers.document;

const validateToken = authMiddlewares.validateToken;

const Routes = (app) => {
  app.get('/v1', (req, res) => res.status(200).send({
    message: 'Welcome to my API',
  }));

  app.route('/roles')
    .post(roleControllers.create);

  app.route('/roles/:roleId')
    .delete(roleControllers.destroy);

  app.route('/users')
    .get(validateToken, userControllers.list)
    .post(userControllers.create);

  app.route('/users/login')
    .post(userControllers.login);

  app.route('/users/logout')
    .get(userControllers.logout);

  app.use('/users/:userId', validateToken);
  app.route('/users/:userId')
    .get(userControllers.retrieve)
    .put(userControllers.update)
    .delete(userControllers.destroy);

  app.route('/users/:userId/documents')
    .get(documentControllers.listUserDocuments);

  app.use('/documents', validateToken);
  app.route('/documents')
    .get(documentControllers.list)
    .post(documentControllers.create);
};

export default Routes;
