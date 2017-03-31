var express = require('express');
var router = express.Router();
var getResults = require('../api');

/* GET home page with generic results */
router.get('/', function(req, res, next) {
  var receivedString = '';
  var receivedPage = '1';

  var renderResults = function(data) {
    var resultsObject = data.results;

    var resultsCount = data.indexCount;
    var prevPg = +receivedPage - 1;
    if (prevPg < 1) { prevPg = 1; }
    var lastPg = Math.ceil(resultsCount/20);
    var nextPg = +receivedPage + 1;
    if (nextPg > lastPg) { nextPg = lastPg; }

    res.render('index', { results: resultsObject, currentSearchString: receivedString, page: receivedPage, prevPage: prevPg, nextPage: nextPg, lastPage: lastPg });
  };

  getResults(receivedString, receivedPage, renderResults);
});

/* POST home page with search (specific) results */
router.post('/', function(req, res) {
  var receivedString = req.body.searchString;
  var receivedPage = req.body.page;

  var renderResults = function(data) {
    var resultsObject = data.results;

    var resultsCount = data.indexCount;
    var prevPg = +receivedPage - 1;
    if (prevPg < 1) { prevPg = 1; }
    var lastPg = Math.ceil(resultsCount/20);
    var nextPg = +receivedPage + 1;
    if (nextPg > lastPg) { nextPg = lastPg; }

    res.render('index', { results: resultsObject, currentSearchString: receivedString, page: receivedPage, prevPage: prevPg, nextPage: nextPg, lastPage: lastPg });
  };

  getResults(receivedString, receivedPage, renderResults);
});

module.exports = router;
