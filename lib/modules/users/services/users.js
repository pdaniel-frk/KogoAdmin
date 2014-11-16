
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var Q    = require('q');
var HTTP = require("q-io/http");

function UsersService() {}

UsersService.prototype.getById = function(id){
  var options = {
    host: 'localhost',
    port: 3001,
    path: '/users?conditions[id]=' + id
  };

  return HTTP.request(options)
  .then(function(response){
    return response.body.read();
  })
  .then(function(responseBuffer){
    var responseString = responseBuffer.toString('utf-8')
    var responseBody = JSON.parse(responseString);
    return responseBody.shift();
  });
};

UsersService.prototype.getByUsername = function(username){
  var options = {
    host: 'localhost',
    port: 3001,
    path: '/users?conditions[username]=' + username
  };

  return HTTP.request(options)
  .then(function(response){
    return response.body.read();
  })
  .then(function(responseBuffer){
    var responseString = responseBuffer.toString('utf-8')
    var responseBody = JSON.parse(responseString);
    return responseBody.shift();
  });
};

module.exports = UsersService;
