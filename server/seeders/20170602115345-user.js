const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'superman',
    name: 'Superman',
    email: 'superadmin@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'batman',
    name: 'Batman',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'wonderwoman',
    name: 'Wonderwoman',
    email: 'author@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '3',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'spiderman',
    name: 'Spiderman',
    email: 'editor@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    roleId: '4',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
