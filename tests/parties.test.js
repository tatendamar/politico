let chaiHttp = require('chai-http');
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;

var serverParty = require('../api/routes/parties');

chai.use(chaiHttp);

describe('Parties API Integration Tests', () => {
  describe('#GET /parties', () => {
    it('should get all parties', done => {
      chai
        .request(serverParty)
        .get('/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('party');
          res.body.party.should.be.a('object');
          res.body.party.should.have.property('data');

          res.body.data.should.have.property('name');
          res.body.data.should.have.property('address');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('logo');
          res.body.data.should.have.property('city');

          done();
        });
    });

    it('should get a single party record', done => {
      const id = 1;
      chai
        .request(serverParty)
        .get(`/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('address');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('logo');
          res.body.data.should.have.property('city');

          done();
        });
    });
  });

  describe('/DELETE/:id party', () => {
    it('it should DELETE a party given the id', done => {
      const id = 1;
      chai
        .request(serverParty)
        .delete(`/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/PUT party', () => {
    it('should EDIT a party with name field', done => {
      const id = 1;
      chai
        .request(serverParty)
        .put(`/parties/${id}`)

        .send({
          id: id,
          name: 'Rexford'
        })
        .end((err, res) => {
          if (err) done(err);
          res.body.should.be.a('object');
        });
      done();
    });
  });
});
