const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp)

// Before the first test:
//
// Run the migrations
// Clean out the database (delete records in all tables (not drop))
// Seed your database with records
// After every test, delete records in all tables and seed the database.

// DONT WANT TESTS TO DEPEND ON EACH OTHER. MAKE SURE TO SET UP TEST MIGRATION AND SEEDING!!!!
// DIFF FROM DEV MIRGRATIONS AND SEEDING

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
  it.skip('should return the homepage with test', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200)
      response.should.be.html
      response.res.text.should.equal('We\'re going to test all the routes!')
      done()
    });
  });

  it.skip('should return 404 for a non existent route', (done) => {
    chai.request(server)
    .get('/sad')
    .end((error, response) => {
      response.should.have.status(404)
      done()
    });
  });

});

describe('API Routes', () => {

  describe('GET /api/v1/students', () => {
    it.skip('should return all of the students', (done) => {
      chai.request(server)
      .get('/api/v1/students')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('lastname')
        response.body[0].lastname.should.equal('Turing')
        response.body[0].should.have.property('program')
        response.body[0].program.should.equal('FE')
        response.body[0].should.have.property('enrolled')
        response.body[0].enrolled.should.equal(true)
        done()
      });
    });
  });

  describe('POST /api/v1/students', () => {
    it.skip('should create new student', (done) => {
      chai.request(server)
      .post('/api/v1/students')
      .send(
        {
          lastname: 'Knuth',
          program: 'FE',
          enrolled: true
        }
      )
      .end((error, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('lastname')
        response.body.lastname.should.equal('Knuth')
        response.body.should.have.property('program')
        response.body.program.should.equal('FE')
        response.body.should.have.property('enrolled')
        response.body.enrolled.should.equal(true)
        chai.request(server)
        .get('/api/v1/students')
        .end((err, response) => {
       response.should.have.status(200)
       response.should.be.json
       response.body.should.be.a('array')
       response.body.length.should.equal(4)
       response.body[3].should.have.property('lastname')
       response.body[3].lastname.should.equal('Knuth')
       response.body[3].should.have.property('program')
       response.body[3].program.should.equal('FE')
       response.body[3].should.have.property('enrolled')
       response.body[3].enrolled.should.equal(true)
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
