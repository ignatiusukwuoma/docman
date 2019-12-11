module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [{
      title: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'author',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'editor',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Roles', null, {})
};
