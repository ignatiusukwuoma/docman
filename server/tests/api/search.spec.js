import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import userData from '../testData/userData';

const expect = chai.expect;
chai.use(chaiHttp);

const { admin, author } = userData;

let adminToken;
let authorToken;

// SEARCH
describe('Search', () => {
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

  describe('GET /search/users', () => {
    it('should return the correct user(s) for a search query', (done) => {
      chai.request(server)
        .get('/search/users/?q=author')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0].username).to.equal('author');
          expect(res.body.pageData).to.be.an('object')
            .that.have.keys('count', 'pageSize', 'pageNumber', 'totalPages');
          done();
        });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(server)
        .get('/search/users/?q=editor')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to
            .equal('Access denied: Admin credentials required');
          done();
        });
    });
  });

  describe('GET /search/documents', () => {
    it('should return correct documents(s) for a query', (done) => {
      chai.request(server)
        .get('/search/documents/?q=andela')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array');
          expect(res.body.documents[0].title).to.equal('My Life in Andela');
          expect(res.body.pageData).to.be.an('object')
            .that.have.keys('count', 'pageSize', 'pageNumber', 'totalPages');
          done();
        });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(server)
        .get('/search/documents/?q=andela')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to
            .equal('Access denied: Admin credentials required');
          done();
        });
    });
  });
});
