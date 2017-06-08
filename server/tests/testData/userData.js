import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  superadmin1: {
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
    id: 7,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: 'admin@gmail.com',
    password: faker.internet.password(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  advertizer1: {
    id: 25,
    name: 'advertizer',
    username: 'advertizer',
    email: 'advertizer@gmail.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  advertizer2: {
    id: 26,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  admin3: {
    id: 6,
    name: faker.name.findName(),
    username: 'admin',
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // author2: {
  //   id: 21,
  //   name: 'John Doe',
  //   username: 'johndoe',
  //   email: 'johndoe@gmail.com',
  //   password: 'j0hnd0e',
  //   roleId: 3,
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // },
  author3: {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editor1: {
    id: 22,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  superadmin: {
    username: 'superadmin',
    password: 'password'
  },
  admin: {
    username: 'admin',
    password: 'password'
  },
  author: {
    username: 'author',
    password: 'password'
  },
  editor: {
    username: 'editor',
    password: 'password'
  },
  noEmail: {
    id: 20,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidEmail: {
    id: 20,
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: 'odinaka@gmail',
    password: faker.internet.password(),
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  noUsername: {
    id: 20,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
};
