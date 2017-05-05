const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp)

describe('Everything', () => {

  before((done) => {
     database.migrate.latest()
     .then(() => {
       database.seed.run()
     })
     done();
   })

   afterEach((done) => {
     database.seed.run()
     done();
   })

  describe('Client Routes', () => {
    it('should return the homepage with test', (done) => {
      chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.html
        done()
      });
    });

    it('should return 404 for a non existent route', (done) => {
      chai.request(server)
      .get('/folders/urls')
      .end((error, response) => {
        response.should.have.status(404)
        done()
      });
    })

  });

  describe('API Routes', () => {

    describe('GET /api/v1/folders', () => {
      it('should return all of the folders', (done) => {
        chai.request(server)
        .get('/api/v1/folders')
        .end((error, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(1)
          response.body[0].should.have.property('title')
          response.body[0].title.should.equal('Crafts')
          done()
        });
      });
    });

    describe('POST /api/v1/folders', () => {
      it('should create new folder', (done) => {
        chai.request(server)
        .post('/api/v1/folders')
        .send(
          {
            title: 'Knuth'
          }
        )
        .end((error, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('title')
          response.body.title.should.equal('Knuth')
          chai.request(server)
          .get('/api/v1/folders')
          .end((err, response) => {
         response.should.have.status(200)
         response.should.be.json
         response.body.should.be.a('array')
         response.body.length.should.equal(2)
         response.body[1].should.have.property('title')
         response.body[1].title.should.equal('Knuth')
         done()
        })
      })
    })

    it.skip('should not create a record with missing data', (done) => {
      chai.request(server)
      .post('/api/v1/students')
      .send({
        lastname: 'Knuth',
        program: 'FE' // Missing the enrolled property and value
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.body.error.should.equal('You are missing data!')
        done()
      })
    })

  });
  });

})
