import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/pages/HomePage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import ManageUsersPage from './components/pages/ManageUsersPage.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import NewDocumentPage from './components/pages/NewDocumentPage.jsx';
import ViewDocumentPage from './components/pages/ViewDocumentPage.jsx';
import EditDocumentPage from './components/pages/EditDocumentPage.jsx';
import UserDocumentsPage from './components/pages/UserDocumentsPage.jsx';
import EditProfilePage from './components/pages/EditProfilePage.jsx';



export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/home" component={HomePage} />
    <Route path="/document/new" component={NewDocumentPage} />
    <Route path="/document/:id" component={ViewDocumentPage} />
    <Route path="/document/:id/edit" component={EditDocumentPage} />
    <Route path="/users/manage" component={ManageUsersPage} />
    <Route path="/users/:id/documents" component={UserDocumentsPage} />
    <Route path="/users/:id" components={ProfilePage} />
    <Route path="/users/:id/edit" components={EditProfilePage} />
  </Route>
);
