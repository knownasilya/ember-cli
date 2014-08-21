var express = require('express');
var <%= camelizedModuleName %>Router = express.Router();

<%= camelizedModuleName %>Router.route('/')
  .get(function(req, res) {
    res.send({<%= dasherizedModuleName %>:[]});
  });

module.exports = function(app) {
  app.use('/api<%= path %>', <%= camelizedModuleName %>Router);
};
