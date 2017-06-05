import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import models from '../../models';
import userData from '../testData/userData';

const User = models.User;
const { superadmin, admin, admin2, author, author1, author2, editor } = userData;
const expect = chai.expect;
chai.use(chaiHttp);

let adminToken;
let authorToken;

describe('Users', () => {
  before(() => {
    chai.request(server)
      .post('/users/login')
      .send(admin)
      .then((res) => {
        adminToken = res.body.token;
      });
  });

  before(() => {
    chai.request(server)
      .post('/users/login')
      .send(author)
      .then((res) => {
        authorToken = res.body.token;
      });
  });

  after((done) => {
    User.destroy({ where: { id: { $and: [1, 2] } } });
    done();
  });

 // POST /users/login
  describe('POST /users/login', () => {
    it('can login a user and return a token', () => {
      chai.request(server)
        .post('/users/login')
        .send(admin)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(['token', 'message']);
          expect(res.body.message).to.eql('Login successful');
        });
    });

    it('should fail for invalid user credentials', () => {
      chai.request(server)
      .post('/users/login')
      .send({ username: admin.username, password: 'passwor' })
      .then((res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Wrong password');
      });
    });
  });

  // GET /users
  describe('GET /users', () => {
    it('should send 401 if request is not authenticated', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message)
            .to.equal('You are not signed in. Please sign in.');
          done();
        });
    });

    it('should get all users', () => {
      chai.request(server)
        .get('/users')
        .set('x-access-token', adminToken)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.pageData).to.be.a('object');
        });
    });
  });

   // POST /users
  describe('/POST users', () => {
    it('should not POST a user without email field', (done) => {
      chai.request(server)
        .post('/users')
        .send(author1)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });

    it.skip('should POST a user', (done) => {
      chai.request(server)
        .post('/users')
        .send(author2)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body.message)
            .to.eql('User is successfully created');
          done();
        });
    });

    it('should fail if username already exists', (done) => {
      chai.request(server)
      .post('/users')
      .send(userOne)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.eql('Username already exist');
        done();
      });
    });

  //   it('should fail if email alreay exists', (done) => {
  //     userTwo.email = userOne.email;
  //     chai.request(server)
  //     .post('/users')
  //     .send(userTwo)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body.message).to.eql('Email already exist');
  //       done();
  //     });
  //   });

  //   it('should not allow the creation of a user with admin role', (done) => {
  //     userTwo.roleId = '1';
  //     chai.request(server)
  //     .post('/users')
  //     .send(userTwo)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(401);
  //       expect(res.body.message).to.eql('Invalid roleId');
  //       done();
  //     });
  //   });

  //   it('should return a token after creating a user', (done) => {
  //     chai.request(server)
  //     .post('/users')
  //     .send(userThree)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(201);
  //       expect(res.body.token).to.not.be.undefined;
  //       expect(res.body.message).to.eql('User created');
  //       userThree.userId = res.body.id;
  //       done();
  //     });
  //   });

  //   it('should fail for invalid user details', (done) => {
  //     chai.request(server)
  //     .post('/users')
  //     .send(invalidUserDetails)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body.message).to.eql('Use a valid email');
  //       done();
  //     });
  //   });
  });

  // // GET /users
  // describe('/GET users', () => {
  //   it('should return all users', (done) => {
  //     chai.request(server)
  //       .get('/users')
  //       .set({ 'x-access-token': adminToken })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.rows).to.be.a('array');
  //         expect(res.body.rows.length).to.be.greaterThan(2);
  //         done();
  //       });
  //   });

  //   it('should deny access if user is not admin', (done) => {
  //     chai.request(server)
  //     .get('/users')
  //     .set({ 'x-access-token': regularToken })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(403);
  //       expect(res.body).to.be.a('object');
  //       expect(res.body.message).to.eql('Access denied');
  //       done();
  //     });
  //   });

  //   it('should deny access if no token was provided', (done) => {
  //     chai.request(server)
  //     .get('/users')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(403);
  //       expect(res.body).to.be.a('object');
  //       expect(res.body.message).to.eql('No token provided');
  //       done();
  //     });
  //   });

  //   it('should return correct user(s) for a query', (done) => {
  //     chai.request(server)
  //       .get('/users?q=admin')
  //       .set({ 'x-access-token': adminToken })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.rows).to.be.a('array');
  //         expect(res.body.rows[0].username).to.eql('admin');
  //         done();
  //       });
  //   });

  //   it('can limit the number of users returned', (done) => {
  //     chai.request(server)
  //       .get('/users?limit=2')
  //       .set({ 'x-access-token': adminToken })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.rows).to.be.a('array');
  //         expect(res.body.rows.length).to.equal(2);
  //         secondId = res.body.rows[1].id;
  //         done();
  //       });
  //   });

  //   it('can offset the starting position of returned data', (done) => {
  //     chai.request(server)
  //       .get('/users?offset=1')
  //       .set({ 'x-access-token': adminToken })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.rows).to.be.a('array');
  //         expect(res.body.rows[0].id).to.eql(secondId);
  //         done();
  //       });
  //   });
  // });
});
