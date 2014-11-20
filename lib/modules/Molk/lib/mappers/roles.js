
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Role         = require('./../models/role');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Roles mapper class definition
 */
function RolesMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * RolesMapper extends HttpMapper
 */
util.inherits(RolesMapper, HttpMapper);

/**
 * Placeholder for URL to API's role resource
 */
RolesMapper.prototype.apiUrl = '/roles';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
RolesMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

RolesMapper.prototype.save = function (role) {

  if (!(role instanceof Role)) {
    throw new Exception('Invalid model passed. Instance of Role expected');
  }

  if (!role.getId()) {
    return this.insert(role);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: role.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (roles) {

      if (!_.isEmpty(roles)) {
        return me.update(role);
      }

      return me.insert(role);
    });
};

RolesMapper.prototype.insert = function (role) {

  if (!(role instanceof Role)) {
    throw new Exception('Invalid model passed. Instance of Role expected');
  }

  return this.sendPostRequest(role);
};

RolesMapper.prototype.update = function (role) {

  if (!(role instanceof Role)) {
    throw new Exception('Invalid model passed. Instance of Role expected');
  }

  if (!role.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(role);
};

module.exports = RolesMapper;
