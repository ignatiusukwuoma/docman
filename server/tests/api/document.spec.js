import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import models from '../../models';
import roleData from '../testData/roleData';
import userData from '../testData/userData';
import documentData from '../testData/documentData';

const { admin, author, editor, advertizer1, advertizer2 } = userData;
const { role5 } = roleData;
const { publicDocument, publicDocument2, privateDocument } = documentData;
let authorToken, adminToken, advertizer1Token;

const expect = chai.expect;
chai.use(chaiHttp);

describe('Documents', () => {
  before((done) => {
    models.Role.create(role5)
    .then((role) => {
      advertizer1.roleId = role.id;
      advertizer2.roleId = role.id;
      models.User.bulkCreate([
        advertizer1, advertizer2
      ])
      .then(() => {
        chai.request(server)
          .post('/users/login')
          .send({ username: advertizer1.username, password: 'password' })
          .end((err, res) => {
            advertizer1Token = res.body.token;
            done();
          });
      });
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

  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  // GET /users/:id/documents
  describe('GET /users/:id/documents', () => {
    it("should return a user's document(s) given the user's id", (done) => {
      chai.request(server)
        .get('/users/3/documents')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object')
            .that.have.keys('message', 'documents');
          expect(res.body.message).to.be.a('string').that.includes('found');
          done();
        });
    });

    it('should send 404 for invalid id', (done) => {
      chai.request(server)
        .get('/users/100/documents')
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
      .get('/users/4000000000/documents')
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql(
          'value "4000000000" is out of range for type integer'
        );
        done();
      });
    });
  });

  // POST /documents
  describe('/POST document', () => {
    it('can create a new document', (done) => {
      chai.request(server)
      .post('/documents')
      .send(publicDocument)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.document).to.have.keys(
          ['id', 'title', 'content', 'access',
            'createdAt', 'updatedAt', 'userId']
        );
        expect(res.body.message).to
          .equal('New document was successfully created');
        expect(res.body.document.userId).to.equal(2);
        expect(res.body.document.title).to.equal(publicDocument.title);
        publicDocument.id = res.body.document.id;
        done();
      });
    });

    it('should fail if document title already exists', (done) => {
      chai.request(server)
        .post('/documents')
        .send(publicDocument2)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Title already exist');
          done();
        });
    });

    it('can create a new document with correct user details', (done) => {
      chai.request(server)
        .post('/documents')
        .send(privateDocument)
        .set({ 'x-access-token': advertizer1Token })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.document.userId).to.equal(advertizer1.id);
          privateDocument.id = res.body.document.id;
          done();
        });
    });
  });

  // GET /documents
  describe('/GET documents', () => {
    it('should return all documents if the user is an admin', (done) => {
      chai.request(server)
        .get('/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array').that.have.lengthOf(6);
          expect(res.body.pageData).to.be.an('object')
            .that.have.keys('count', 'pageSize', 'pageNumber', 'totalPages');
          done();
        });
    });

    it("should not return other user's private documents if user is not admin",
    (done) => {
      chai.request(server)
        .get('/documents')
        .set({ 'x-access-token': authorToken })
        .end((err, res) => {
          let privateDocs = false;
          res.body.documents.forEach((document) => {
            if (document.access === 'private') privateDocs = true;
          });
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array').that.have.lengthOf(4);
          expect(privateDocs).to.be.false;
          done();
        });
    });

    it('should not return role documents with hgher User roleId', (done) => {
      chai.request(server)
        .get('/documents')
        .set({ 'x-access-token': advertizer1Token })
        .end((err, res) => {
          let roleDocs = false;
          res.body.documents.forEach((document) => {
            if (document.access === 'role') roleDocs = true;
          });
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array').that.have.lengthOf(4);
          expect(roleDocs).to.be.false;
          done();
        });
    });

    it('can limit the number of documents returned', (done) => {
      chai.request(server)
        .get('/documents?limit=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array').that.have.lengthOf(2);
          done();
        });
    });

    it('can offset the starting position of returned documents', (done) => {
      chai.request(server)
        .get('/documents?offset=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.documents).to.be.an('array').that.have.lengthOf(4);
          expect(res.body.documents[0].id).to.equal(1);
          done();
        });
    });
  });

  // GET /documents/:id
  describe('GET/ /users/:id document', () => {
    let editorToken;
    before((done) => {
      chai.request(server)
        .post('/users/login')
        .send(editor)
        .end((err, res) => {
          editorToken = res.body.token;
          done();
        });
    });

    it('should return a particular document given an id', (done) => {
      chai.request(server)
        .get('/documents/1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(['id', 'title', 'content', 'access',
            'userId', 'createdAt', 'updatedAt', 'User']);
          expect(res.body.title).to.equal('Welcome Message');
          done();
        });
    });

    it('should allow all users to view a public document', (done) => {
      chai.request(server)
      .get('/documents/2')
      .set({ 'x-access-token': advertizer1Token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.equal('My Life in Andela');
        done();
      });
    });

    it("should not allow a user to access another user's private document",
    (done) => {
      chai.request(server)
      .get(`/documents/${privateDocument.id}`)
      .set({ 'x-access-token': editorToken })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('You are not permitted to access this document');
        done();
      });
    });

    it('should allow a user to access a document of the same role',
    (done) => {
      chai.request(server)
      .get('/documents/3')
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys(['id', 'title', 'content', 'access',
          'userId', 'createdAt', 'updatedAt', 'User']);
        done();
      });
    });

    it('should send 404 for an invalid document id', (done) => {
      chai.request(server)
      .get('/documents/100')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/documents/3000000000')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql(
          'value "3000000000" is out of range for type integer'
        );
        done();
      });
    });
  });

  // PUT /documents/:id
  describe('/PUT/:id document', () => {
    it('should allow a user to update his/her document', (done) => {
      chai.request(server)
        .put('/documents/7')
        .set({ 'x-access-token': advertizer1Token })
        .send({ title: 'Private document title' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.updatedDocument.title)
            .to.equal('Private document title');
          done();
        });
    });

    it("should deny access if a user tries to update another user's document",
    (done) => {
      chai.request(server)
      .put('/documents/5')
      .set({ 'x-access-token': authorToken })
      .send({ title: 'Public document title' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('You are not permitted to access this document');
        done();
      });
    });

    it('should not allow a user to use an existing document title',
    (done) => {
      chai.request(server)
        .put(`/documents/${publicDocument.id}`)
        .set({ 'x-access-token': adminToken })
        .send({ title: 'Private document title' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eql('Title already exist');
          done();
        });
    });
  });

  // DELETE /documents/:id
  describe('/DELETE/:id document', () => {
    it("should deny access if a user tries to delete another user's document",
    (done) => {
      chai.request(server)
      .delete(`/documents/${publicDocument.id}`)
      .set({ 'x-access-token': authorToken })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('You are not permitted to delete this document');
        done();
      });
    });

    it('should allow a user to delete his/her document', (done) => {
      chai.request(server)
      .delete(`/documents/${privateDocument.id}`)
      .set({ 'x-access-token': advertizer1Token })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should send 404 given an invalid document id', (done) => {
      chai.request(server)
      .delete('/documents/100')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .delete('/documents/3000000000')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql(
          'value "3000000000" is out of range for type integer'
        );
        done();
      });
    });
  });
});
