import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/pages/HomePage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import NewDocumentPage from './components/pages/NewDocumentPage.jsx';
import ManageUsersPage from './components/pages/ManageUsersPage.jsx';
import ViewDocumentPage from './components/pages/ViewDocumentPage.jsx';
import EditDocumentPage from './components/pages/EditDocumentPage.jsx';
import UserDocumentsPage from './components/pages/UserDocumentsPage.jsx';
import EditProfilePage from './components/pages/EditProfilePage.jsx';
import ManageRolesPage from './components/pages/ManageRolesPage.jsx';
import UserIsLoggedIn from './components/protectors/UserIsLoggedIn.jsx';
import UserIsAdmin from './components/protectors/UserIsAdmin.jsx';
import UserIsSuperAdmin from './components/protectors/UserIsSuperAdmin.jsx';

export default
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />

    <Route component={UserIsLoggedIn}>
      <Route path="/home" component={HomePage} />
      <Route path="/user/:id" components={ProfilePage} />
      <Route path="/document/new" component={NewDocumentPage} />
      <Route path="/document/:id" component={ViewDocumentPage} />
      <Route path="/user/:id/edit" components={EditProfilePage} />
      <Route path="/document/:id/edit" component={EditDocumentPage} />
      <Route path="/user/:id/documents" component={UserDocumentsPage} />
    </Route>

    <Route component={UserIsAdmin}>
      <Route path="/manageusers" component={ManageUsersPage} />
    </Route>

    <Route component={UserIsSuperAdmin}>
      <Route path="/manageroles" component={ManageRolesPage} />
    </Route>

    <Route path="*" component={LandingPage} />
  </Route>;
