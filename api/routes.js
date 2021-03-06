var data = require('./tmp/example.json');
/*{
  "title": "Hub application from server",
  "user": {
    "name": "Pierr Besson",
    "photo": "https://pbs.twimg.com/profile_images/378800000475446686/503bef212d7997fa4b33cc99f72f7471_400x400.png"
  },
  "items": [{
    "idn": "IDN001",
    "name": "Application1",
    "icon": "fa-arrow",
    "link": "http://google.com"
  }, {
    "idn": "IDN002",
    "name": "Application2",
    "icon": "fa-circle",
    "link": "http://github.com"
  }]
};*/



function getUser(request, reply) {
  console.log('Get References');
  reply(data);
}

function getUnauthorized(request, reply) {
  console.log('Get References');
  reply({
    action: "yoooo",
    SAMLRequest: "21231321231321"
  }).code(401);
}

var routes = [{
  method: 'GET',
  path: '/user',
  config: {
    handler: getUser
  }
}, {
  method: 'GET',
  path: '/unauthorized',
  config: {
    handler: getUnauthorized
  }
}];
module.exports = routes;