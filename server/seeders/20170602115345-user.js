const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'superadmin',
    name: 'Super Administrator',
    email: 'superadmin@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'admin',
    name: 'Administrator',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'author',
    name: 'Author',
    email: 'author@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '3',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'editor',
    name: 'Editor',
    email: 'editor@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '4',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
