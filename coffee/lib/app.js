// Generated by CoffeeScript 1.3.1
(function() {
  var app, express, routes;

  express = require('express');

  routes = require('./routes');

  app = modules.exports = express.createServer();

  require('./config/enviroment.js')(app, express);

  require('./config/routes.js')(app, routes);

  app.listen(3000);

}).call(this);
