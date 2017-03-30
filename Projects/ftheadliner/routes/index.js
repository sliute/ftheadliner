var express = require('express');
var router = express.Router();
var getResults = require('../api');

/* GET home page with generic results */
router.get('/', function(req, res, next) {
  var renderResults = function(data) {
    res.render('index', { headmast: 'ftheadliner', results: data });
  };

  getResults('', renderResults);
});

/* POST home page with search (specific) results */
router.post('/', function(req, res) {
  var receivedString = req.body.searchString;

  var renderResults = function(data) {
    res.render('index', { headmast: 'ftheadliner', results: data });
  };

  getResults(receivedString, renderResults);
});

module.exports = router;
