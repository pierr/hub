var hapi = require('hapi');
var routes = require('./routes');
var config = {
  cors: true
}; //, docs: true };
var server = new hapi.Server('localhost', 7777, config);
server.route(routes);
server.start(function() {
  console.log('Server started at: ' + server.info.uri);
});