import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import userData from '../testData/userData';

const { superadmin, admin, admin1, author, editor, author1, author2, author3,
  noEmail, invalidEmail, noUsername } = userData;
const expect = chai.expect;
chai.use(chaiHttp);

let superadminToken;
let adminToken;
let authorToken;
let thirdUser;

describe('Users', () => {
 // POST /users/login
  describe('POST /users/login', () => {
    it('can login a user and return a token', (done) => {
      chai.request(server)
        .post('/users/login')
        .send(superadmin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.keys(['token', 'message']);
          expect(res.body.message).to.equal('Login successful');
          superadminToken = res.body.token;
          done();
        });
    });

    it('should fail when password is incorrect', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ username: 'spiderman', password: 'passwor' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Wrong password');
          done();
        });
    });

    it('should fail if password is not provided', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ username: 'spiderman' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Invalid password');
          done();
        });
    });

    it('should fail when username is invalid', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ username: 'administrator', password: 'password' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });

  // POST /users
  describe('POST /users', () => {
    it('should not create a user without email field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noEmail)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('email cannot be null');
          done();
        });
    });

    it('should not create a user with empty username field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noUsername)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.a('object');
          expect(res.body.message).to.equal('username cannot be null');
          done();
        });
    });

    it('should create a user and return a token', (done) => {
      chai.request(server)
        .post('/users')
        .send(author3)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body.message)
            .to.equal('User is successfully created');
          done();
        });
    });

    it('should fail if username already exists', (done) => {
      chai.request(server)
      .post('/users')
      .send(author1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username already exist');
        done();
      });
    });

    it('should fail if user is trying to create an admin', (done) => {
      chai.request(server)
      .post('/users')
      .send(admin1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('You cannot create an Admin');
        done();
      });
    });

    it('should fail if email already exists', (done) => {
      chai.request(server)
      .post('/users')
      .send(author2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql('Email already exist');
        done();
      });
    });

    it('should fail for invalid email', (done) => {
      chai.request(server)
      .post('/users')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Use a valid email');
        done();
      });
    });
  });

  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(author)
      .end((err, res) => {
        authorToken = res.body.token;
        done();
      });
  });

  // GET /users
  describe('GET /users', () => {
    it('should send 401 if request is not authenticated', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.equal('You are not signed in. Please sign in.');
          done();
        });
    });

    it('should get all users', (done) => {
      chai.request(server)
        .get('/users')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.pageData).to.be.a('object');
          done();
        });
    });

    it('should deny access if user is not admin', (done) => {
      chai.request(server)
        .get('/users')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.equal('Access denied: Admin credentials required');
          done();
        });
    });

    it('should deny access if token was not provided', (done) => {
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

    it('can limit the number of users returned', (done) => {
      chai.request(server)
        .get('/users?limit=3')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          expect(res.body.users).to.have.a.lengthOf(3);
          expect(res.body.pageData.pageSize).to.equal('3');
          thirdUser = res.body.users[2].id;
          done();
        });
    });

    it('can offset the starting position of returned data', (done) => {
      chai.request(server)
        .get('/users?offset=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0].id).to.equal(thirdUser);
          done();
        });
    });
  });

    // GET /users/:id
  describe('GET /users/:id', () => {
    it('should return a particular user when passed an id', (done) => {
      chai.request(server)
        .get('/users/4')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(4);
          expect(res.body).to.eql({
            id: 4,
            username: 'spiderman',
            name: 'Spiderman',
            email: 'editor@gmail.com',
            roleId: 4
          });
          done();
        });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(server)
        .get('/users/3')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.equal('You are not signed in. Please sign in.');
          done();
        });
    });

    it('should return 404 for invalid userId', (done) => {
      chai.request(server)
        .get('/users/100')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai.request(server)
        .get('/users/5000000000')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message)
            .to.equal('value "5000000000" is out of range for type integer');
          done();
        });
    });
  });

    // PUT /users/:id
  describe('PUT /users/:id', () => {
    it('should allow users update their profile details', (done) => {
      chai.request(server)
        .put('/users/3')
        .set({ 'x-access-token': authorToken })
        .send({ name: 'Superwoman' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({
            id: 3,
            username: 'wonderwoman',
            name: 'Superwoman',
            email: 'author@gmail.com',
            roleId: 3
          });
          done();
        });
    });

    it('should allow users change their password', (done) => {
      chai.request(server)
        .put('/users/3')
        .set({ 'x-access-token': authorToken })
        .send({ password: 'password$' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({
            id: 3,
            username: 'wonderwoman',
            name: 'Superwoman',
            email: 'author@gmail.com',
            roleId: 3
          });
          done();
        });
    });

    it('should allow Superadmin to upgrade a user', (done) => {
      chai.request(server)
        .put('/users/4')
        .set({ 'x-access-token': superadminToken })
        .send({ roleId: 2 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({
            id: 4,
            username: 'spiderman',
            name: 'Spiderman',
            email: 'editor@gmail.com',
            roleId: 2
          });
          done();
        });
    });

    it('should fail if user is not found', (done) => {
      chai.request(server)
        .put('/users/250')
        .set({ 'x-access-token': superadminToken })
        .send({ roleId: 2 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should not allow a user to use an existing username', (done) => {
      chai.request(server)
        .put('/users/3')
        .set({ 'x-access-token': authorToken })
        .send({ username: editor.username })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Username already exist');
          done();
        });
    });

    it('should not allow admin to upgrade user role to admin', (done) => {
      chai.request(server)
        .put('/users/3')
        .set({ 'x-access-token': adminToken })
        .send({ roleId: '2' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.equal('Access denied: SuperAdmin credentials required');
          done();
        });
    });

    it('should not allow user to update another user role', (done) => {
      chai.request(server)
        .put('/users/4')
        .set({ 'x-access-token': authorToken })
        .send({ name: 'Personal Editor' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.equal('You do not have the permission to do that');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai.request(server)
        .put('/users/5000000000')
        .send({ roleId: 2 })
        .set({ 'x-access-token': superadminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message)
            .to.equal('value "5000000000" is out of range for type integer');
          done();
        });
    });
  });

  // DELETE /users/:id
  describe('DELETE /users/:id', () => {
    it('should not allow a user to delete another user profile', (done) => {
      chai.request(server)
      .delete('/users/4')
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.equal('You do not have the permission to do that');
        done();
      });
    });

    it("should not allow admin to delete a user's profile", (done) => {
      chai.request(server)
      .delete('/users/4')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.equal('You do not have the permission to do that');
        done();
      });
    });

    it('should allow a user/admin to delete their own account', (done) => {
      chai.request(server)
      .delete('/users/3')
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
    });
  });

      // POST /users/logout
  describe('/POST/logout', () => {
    it('can logout a user', (done) => {
      chai.request(server)
      .post('/users/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.equal('You have signed out');
        done();
      });
    });
  });
});
