[![Coverage Status](https://coveralls.io/repos/github/andela-iukwuoma/docman/badge.svg?branch=develop)](https://coveralls.io/github/andela-iukwuoma/docman?branch=develop)
# Docman Pro - A Fullstack Document Management System

Docman Pro is an application that helps users manage their documents in an organized way. A User can create, read, update and delete a document. Public documents are visible to every user while private documents can be seen only by the owner and the admins. Role documents can be seen by everyone on the same role with the owner as well as the admins.
The application uses RESTful API for managing documents, users, roles and searches.

[Click here](http://docmanpro.herokuapp.com/) to view the app on Heroku.

## Features

The app has three major levels of authorization;
-  An author can
    - create an account
    - login/logout
    - edit and delete his profile
    - edit and delete documents created    
    - limit access to a document by specifying an access level of public, private or role.
    - view public documents created by other users.
    - view `role` documents created by users with the same role level.
    - search for documents
    

- An admin has all the privileges of an author and can also:
    - view private documents created by all users
    - edit and delete documents created by all users
    - view details of all users.
    - search for users.

- A superadmin has all the privileges of an admin and can also:
    - edit and delete all users.
    - update a user's role e.g upgrade another user to admin.
    - create roles.
    - edit and delete existing roles
    - Delete created roles apart from admins and author roles.

## Technologies
The application was developed with [NodeJs](http://nodejs.org/), [Express](http://expressjs.com/) was used for routing, sequelize as th ORM and [Postgres](http://postgresql.com/) for database management. ReactJS with the Redux architecture was used to build the front end that consumes the API.

## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0.

1. Clone the repository from a terminal `git clone https://github.com/andela-iukwuoma/docman.git`.
2. Navigate to the project directory `cd docman`
3. Create a `.env` and add the your database URL with the key `DATABASE URL` .
4. Install project dependencies with `npm install`
5. Start the express server with `npm start`.

## Testing
Ensure that project dependencies are installed before running tests.

### Server and Client tests
1. Open a terminal and navigate to the project directory
2. Add a test database url (DATABASE_TEST_URL) to the `.env` file.
3. Run `npm test`

## API Summary
View full API documentation [here](https://andela-iukwuoma.github.io/slate)

## API Summary
### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /users/login         |   Logs in a user
POST /users/logout        |   Logs out a user
POST /users/              |   Creates a new user
GET /users/               |   Gets all users (available only to Admins)
GET /users/:id           |   Retrieves a particular user by the id specified
PUT /users/:id           |   Updates a user's details by the id specified (available only to the user and SuperAdmin)
DELETE /users/:id        |   Deletes a user by the id specified (available only to the user and SuperAdmin)
GET /users/:id/documents   | Gets all documents for a particular user by the id specified
GET /users/?limit={integer}&offset={integer} | Get users by limit and/or offset for pagination
### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /documents/          |   Creates a new document.
GET /documents/           |   Gets all documents.
GET /documents/:id       |   Find document by id.
PUT /documents/:id       |   Updates a document's details. (available only to the author and Admins)
DELETE /documents/:id    |   Delete document. (available only to the author and Admins)
GET /documents/?limit={integer}&offset={integer} | Get documents by limit and/or offset for pagination
### Roles (available only to the SuperAdmin)
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.
PUT /roles/:id               |   Edit a Role by the id specified.
DELETE /roles/:id               |   Delete a Role by the id specified.
### Search
EndPoint                      |   Functionality
------------------------------|------------------------
GET /search/documents/?q=query | Get all documents with title containing the search query
GET /search/users/?q=query | Get all users whose name, username or email matches the search query (available only to Admins)

### Contributing

Contributions are most welcome. Simply fork the repository, work on the feature and raise a PR.

### Licence
MIT