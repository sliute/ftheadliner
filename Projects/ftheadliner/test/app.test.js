var chai = require('chai'), expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('Application', function() {
  var first_generic_id;
  var last_generic_id;
  var first_specific_id;
  var last_specific_id;
  var first_2nd_page_id;
  var last_2nd_page_id;

  it ('can make a generic (empty) FT.com Headlines API query to extract 20 headlines, newest first', function(done) {
    var postData = JSON.stringify({
      "queryString": "",
      "queryContext" : {
    		 "curations" : ["ARTICLES","BLOGS"]
    	},
      "resultContext" : {
    		 "aspects" : ["title","summary"],
         "maxResults" : "20",
         "sortOrder" : "DESC",
    		 "sortField" : "initialPublishDateTime"
    	}
    });

    chai.request('http://api.ft.com')
    .post('/content/search/v1')
    .set('X-API-Key', process.env.FT_API_KEY)
    .set('Content-Type', 'application/json')
    .send(postData)
    .end(function(err, res) {
      first_generic_id = res.body.results[0].results[0].id;
      last_generic_id = res.body.results[0].results[19].id;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.query.resultContext.maxResults).to.equal(20);
      expect(res.body.query.resultContext.sortField).to.equal('initialPublishDateTime');
      expect(res.body.query.resultContext.sortOrder).to.equal('DESC');
      done();
    });
  });

  it ('can display the extracted generic headlines', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      expect(res.res.text).to.include(first_generic_id);
      expect(res.res.text).to.include(last_generic_id);
      done();
    });
  });

  it ('can make a specific (non-empty) API query', function(done) {
    var postData = JSON.stringify({
      "queryString": "technology",
      "queryContext" : {
    		 "curations" : ["ARTICLES","BLOGS"]
    	},
      "resultContext" : {
    		 "aspects" : ["title","summary"],
         "maxResults" : "60",
         "sortOrder" : "DESC",
    		 "sortField" : "initialPublishDateTime"
    	}
    });

    chai.request('http://api.ft.com')
    .post('/content/search/v1')
    .set('X-API-Key', process.env.FT_API_KEY)
    .set('Content-Type', 'application/json')
    .send(postData)
    .end(function(err, res) {
      first_specific_id = res.body.results[0].results[0].id;
      last_specific_id = res.body.results[0].results[19].id;
      first_2nd_page_id = res.body.results[0].results[20].id;
      last_2nd_page_id = res.body.results[0].results[39].id;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });

  it ('can display search results, i.e. the extracted specific headlines', function(done) {
    chai.request(server)
    .post('/')
    .send({'searchString': 'technology', 'page': '1'})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      expect(res.res.text).to.include(first_specific_id);
      expect(res.res.text).to.include(last_specific_id);
      done();
    });
  });

  it ('can paginate search results, i.e. list results 21-40 on page 2', function(done) {
    chai.request(server)
    .post('/')
    .send({'searchString': 'technology', 'page': '2'})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      expect(res.res.text).to.include(first_2nd_page_id);
      expect(res.res.text).to.include(last_2nd_page_id);
      done();
    });
  });
});
