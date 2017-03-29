require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// extract API data (newest 20 articles and blogs)

var http = require('http');

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

var options = {
  hostname: 'api.ft.com',
  path: '/content/search/v1',
  method: 'POST',
  headers: {
    'X-Api-Key': process.env.FT_API_KEY,
    'Content-Type': 'application/json',
  }
};

var req = http.request(options, function(res) {
  var body = "";

  res.on('data', function(data) {
    body += data.toString();
  });

  res.on('end', function() {
    app.locals.results = JSON.parse(body).results[0].results;
    app.locals.results.forEach(function(result) {
      console.log(result.title.title);
      console.log(result.summary.excerpt);
      console.log('http://www.ft.com/content/' + result.id + '?FTCamp=engage/CAPI/webapp/Channel_sliute//B2B');
      console.log();
    });
  });
});

req.on('error', function(err) {
  console.error(err);
});

req.write(postData);
req.end();

module.exports = app;
