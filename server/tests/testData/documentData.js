import faker from 'faker';

export default {
  privateDocument: {
    title: 'Private doc title',
    content: 'Private document content',
    access: 'private',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  publicDocument: {
    title: 'Public doc title',
    content: 'Public document content',
    access: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  publicDocument2: {
    title: 'Public doc title',
    content: 'Different Public document content',
    access: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleDocument: {
    title: 'Role doc title',
    content: 'Role document content',
    access: 'role',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  normalDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },

};
