var express = require('express');
var router = express.Router();

/* POST search results page. */
router.post('/search', function(req, res) {
  res.render('search', { headmast: 'ftheadliner', payload: req.body.searchString });
});

module.exports = router;
