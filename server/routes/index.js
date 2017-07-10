import controllers from '../controllers';
import authMiddlewares from '../middlewares/auth';

const validateToken = authMiddlewares.validateToken;
const isSuperAdmin = authMiddlewares.isSuperAdmin;
const isAdmin = authMiddlewares.isAdmin;

const Routes = (app) => {
  app.use('/roles', validateToken, isSuperAdmin);
  app.route('/roles')
    .get(controllers.role.list)
    .post(controllers.role.create);

  app.route('/roles/:roleId')
    .put(controllers.role.update)
    .delete(controllers.role.destroy);

  app.route('/users')
    .get(validateToken, isAdmin, controllers.user.list)
    .post(controllers.user.create);

  app.route('/users/login')
    .post(controllers.user.login);

  app.route('/users/logout')
    .post(controllers.user.logout);

  app.use('/users/:userId', validateToken);
  app.route('/users/:userId')
    .get(controllers.user.retrieve)
    .put(controllers.user.update)
    .delete(controllers.user.destroy);

  app.route('/users/:userId/documents')
    .get(controllers.document.listUserDocuments);

  app.use('/documents', validateToken);
  app.route('/documents')
    .get(controllers.document.list)
    .post(controllers.document.create);

  app.route('/documents/:documentId')
    .get(controllers.document.retrieve)
    .put(controllers.document.update)
    .delete(controllers.document.destroy);

  app.use('/search', validateToken);
  app.route('/search/users/')
    .get(isAdmin, controllers.search.searchUsers);

  app.route('/search/documents')
    .get(controllers.search.searchDocuments);

};

export default Routes;
