module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Documents', [{
      title: 'Welcome Message',
      content: 'You are welcome to this first document',
      access: 'public',
      ownerRoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1'
    }, {
      title: 'My Life in Andela',
      content: 'In one word? awesome',
      access: 'public',
      ownerRoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '2'
    }, {
      title: 'What I have learnt so far',
      content: 'To keep pushing myself and that there are no real limits',
      access: 'role',
      ownerRoleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '3'
    }, {
      title: 'Why Andela?',
      content: 'It is the place to begin the journey to becoming a tech leader',
      access: 'private',
      ownerRoleId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '4'
    }], {}),
  down: queryInterface =>
  queryInterface.bulkDelete('Documents', null, {})
};
