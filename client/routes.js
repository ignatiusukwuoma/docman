import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import LandingPage from './components/pages/LandingPage';
import NewDocumentPage from './components/pages/NewDocumentPage';
import ManageUsersPage from './components/pages/ManageUsersPage';
import ViewDocumentPage from './components/pages/ViewDocumentPage';
import EditDocumentPage from './components/pages/EditDocumentPage';
import UserDocumentsPage from './components/pages/UserDocumentsPage';
import EditProfilePage from './components/pages/EditProfilePage';
import ManageRolesPage from './components/pages/ManageRolesPage';
import IsLoggedIn from './components/protectors/IsLoggedIn';
import IsAdmin from './components/protectors/IsAdmin';
import IsSuperAdmin from './components/protectors/IsSuperAdmin';

export default
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />

    <Route component={IsAdmin}>
      <Route path="/manageusers" component={ManageUsersPage} />
    </Route>

    <Route component={IsSuperAdmin}>
      <Route path="/manageroles" component={ManageRolesPage} />
    </Route>

    <Route component={IsLoggedIn}>
      <Route path="/home" component={HomePage} />
      <Route path="/user/:id" component={ProfilePage} />
      <Route path="/document/new" component={NewDocumentPage} />
      <Route path="/document/:id" component={ViewDocumentPage} />
      <Route path="/user/:id/edit" component={EditProfilePage} />
      <Route path="/document/:id/edit" component={EditDocumentPage} />
      <Route path="/user/:id/documents" component={UserDocumentsPage} />
      <Route path="*" component={HomePage} />
    </Route>
  </Route>;
