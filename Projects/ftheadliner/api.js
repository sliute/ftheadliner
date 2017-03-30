var http = require('http');

function getResults(searchString, cb) {
  var searchResults = {};
  var postData = JSON.stringify({
    "queryString": searchString,
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

  var options = {
    hostname: 'api.ft.com',
    path: '/content/search/v1',
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.FT_API_KEY,
      'Content-Type': 'application/json',
    }
  };

  callback = function(res) {
    var body = '';
    var searchResults = {};
    res.on('data', function (data) {
      body += data.toString();
    });

    res.on('end', function () {
      searchResults = JSON.parse(body).results[0].results;
      cb(searchResults);
    });
  };

  var req = http.request(options, callback);
  req.write(postData);
  req.end();
}

module.exports = getResults;
