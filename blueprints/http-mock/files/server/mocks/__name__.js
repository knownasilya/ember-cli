var express = require('express');
var <%= camelizedModuleName %>Router = express.Router();

// Plural <%= camelizedModuleName %> endpoints
<%= camelizedModuleName %>Router.route('/')
  .get(function(req, res) {
    res.json({ <%= camelizedModuleName %>: [] });
  });
  
// Singular <%= camelizedModuleName %> endpoints
<%= camelizedModuleName %>Router.route('/:id')
  .get(function (req, res) {
    var id = req.params.id;
    
    res.json({ <%= camelizedModuleName %>: { id: id } });
  });
  

module.exports = function(app) {
  app.use('/api<%= path %>', <%= camelizedModuleName %>Router);
};
