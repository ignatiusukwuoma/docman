# Docman Pro  [![Build Status](https://travis-ci.org/andela-iukwuoma/docman.svg?branch=develop)](https://travis-ci.org/andela-iukwuoma/docman) [![Coverage Status](https://coveralls.io/repos/github/andela-iukwuoma/docman/badge.svg?branch=develop)](https://coveralls.io/github/andela-iukwuoma/docman?branch=develop) [![Code Climate](https://codeclimate.com/github/andela-iukwuoma/docman/badges/gpa.svg)](https://codeclimate.com/github/andela-iukwuoma/docman)
## A Full-Stack Document Management System

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
    - view details of all users and their documents.
    - search for users.

- A superadmin has all the privileges of an admin and can also:
    - update a user's role e.g upgrade another user to admin.
    - create roles.
    - edit existing roles
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

## API Documentation
View API documentation [here](https://andela-iukwuoma.github.io/slate)

## Contributing

If you are interested in contributing to DocmanPro, that's really great! Explore the GitHub issuee, if you find something you want to work on, let us know right there in the comments. If you are interested in a specific aspect of the project but aren’t sure where to begin, feel free to ask. Start small and open up a dialogue with us. This will help to get your contributions accepted easily.

If you find a bug and would just like to let us know about it, please create an issue.

## Limitations

Some limitations of this project include:
- Users cannot upload a profile picture
- Users cannot share documents with specific people

## FAQ

- **What if I want to use another port?**

That's easy. In the root of the project. create a file named `.env` and add the following line to it:

```bash
PORT=<your_desired_port>
```

where <your\_desired\_port> is the port you want to use. So, if you want to use port `9000`, you will write:

```bash
PORT=9000
```

- **How can I support this project?**

Thank you for your interest in supporting DocmanPro. One way to support us is by Contributing to the project. View details for contributing above.

## Licence
MIT