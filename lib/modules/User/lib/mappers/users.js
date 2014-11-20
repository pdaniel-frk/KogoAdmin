
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var User         = require('./../models/user');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Users mapper class definition
 */
function UsersMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * UsersMapper extends HttpMapper
 */
util.inherits(UsersMapper, HttpMapper);

/**
 * Placeholder for URL to API's user resource
 */
UsersMapper.prototype.apiUrl = '/users';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
UsersMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

UsersMapper.prototype.save = function (user) {

  if (!(user instanceof User)) {
    throw new Exception('Invalid model passed. Instance of User expected');
  }

  if (!user.getId()) {
    return this.insert(user);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: user.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (users) {

      if (!_.isEmpty(users)) {
        return me.update(user);
      }

      return me.insert(user);
    });
};

UsersMapper.prototype.insert = function (user) {

  if (!(user instanceof User)) {
    throw new Exception('Invalid model passed. Instance of User expected');
  }

  return this.sendPostRequest(user);
};

UsersMapper.prototype.update = function (user) {

  if (!(user instanceof User)) {
    throw new Exception('Invalid model passed. Instance of User expected');
  }

  if (!user.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(user);
};

module.exports = UsersMapper;
