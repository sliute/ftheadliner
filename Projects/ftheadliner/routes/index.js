var express = require('express');
var router = express.Router();
var getResults = require('../api');

router.all('/', function(req, res, next) {
  if (req.body.searchString) {
    var receivedString = req.body.searchString;
  } else {
    var receivedString = '';
  }

  if (req.body.page) {
    var receivedPage = req.body.page;
  } else {
    var receivedPage = '1';
  }

  var renderResults = function(data) {
    var resultsObject = data.results;

    var resCount = data.indexCount;
    var prevPg = +receivedPage - 1;
    if (prevPg < 1) { prevPg = 1; }
    var lastPg = Math.ceil(resCount/20);
    var nextPg = +receivedPage + 1;
    if (nextPg > lastPg) { nextPg = lastPg; }

    res.render('index', { results: resultsObject, resultsCount: resCount, currentSearchString: receivedString, page: receivedPage, prevPage: prevPg, nextPage: nextPg, lastPage: lastPg });
  };

  getResults(receivedString, receivedPage, renderResults);
});

module.exports = router;
