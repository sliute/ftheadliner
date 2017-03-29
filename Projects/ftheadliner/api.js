var http = require('http');

function getResults(searchString) {
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

  var searchResults = {};

  var req = http.request(options, function(res) {
    var body = "";

    res.on('data', function(data) {
      body += data.toString();
    });

    res.on('end', function() {
      searchResults = JSON.parse(body).results[0].results;
    });
  });

  req.on('error', function(err) {
    console.error(err);
  });

  req.write(postData);
  req.end();

  return searchResults;
}

module.exports = getResults;
