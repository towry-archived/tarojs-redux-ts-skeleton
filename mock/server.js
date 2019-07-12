
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var pkg = require('../package.json');
var serverConfig = require('../config/dev').defineConstants.GLOBAL_VARS.apiServer;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.sendJson = function (data, status, message) {
    if (typeof status === 'number' && status !== 0) {
      res.status(400);
    }

    res.json({
      errCode: status || 0,
      errMsg: message || "success",
      data: data,
    });
  }
  res.sendError = function (data, message) {
    var msg = message;
    if (typeof data === 'string') {
      msg = data;
      data = null;
    }

    res.json({
      errCode: 1,
      errMsg: msg,
      data: data || null,
    })
  }

  next();
});

app.get('/', function (req, res) {
  res.send('Hello 小程序!');
});

app.use('/', require('./routes/user'));

var server = http.createServer(app);

server.listen(serverConfig.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('%s app listening at http://%s:%s\n', pkg.name, host, port);
});
