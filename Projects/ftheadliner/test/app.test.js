var chai = require('chai')
  , expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app');
// var should = chai.should();

chai.use(chaiHttp);

describe('Application', function() {
  it ('has a working / route', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it ('can use the FT.com API', function(done) {
    chai.request('http://api.ft.com')
    .get('/content/acf309b0-13b3-11e7-80f4-13e067d5072c')
    .set('X-API-Key', process.env.FT_API_KEY)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  // it ('has a title', function(done) {
  //   chai.request(server)
  //   .get('/')
  //   .end(function(err, res) {
  //     expect(res).to.have.text("Welcome to ftheadliner");
  //     done();
  //   });
  // });
});
