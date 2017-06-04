import faker from 'faker';

export default {
  superadmin: {
    id: 1,
    name: 'Ignatius Ukwuoma',
    username: 'income',
    email: 'ignatius@gmail.com',
    password: 'yun1vers1ty',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  admin1: {
    id: 2,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  admin2: {
    id: 3,
    name: 'Mark Edomwande',
    username: 'moe',
    email: 'moe@gmail.com',
    password: faker.internet.password(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  author1: {
    id: 20,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  author2: {
    id: 21,
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'j0hnd0e',
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editor: {
    id: 22,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  admin: {
    username: 'admin',
    password: 'password'
  },
  author: {
    username: 'author',
    password: 'password'
  },
};
