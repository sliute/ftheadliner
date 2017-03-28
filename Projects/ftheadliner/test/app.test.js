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

  it ('can use the FT.com Headlines API for search', function(done) {
    var postData = JSON.stringify({
      "queryString": "branding"
    });

    chai.request('http://api.ft.com')
    .post('/content/search/v1')
    .set('X-API-Key', process.env.FT_API_KEY)
    .set('Content-Type', 'application/json')
    .send(postData)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
