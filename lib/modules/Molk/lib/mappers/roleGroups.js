
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var RoleGroup    = require('./../models/roleGroup');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * RoleGroups mapper class definition
 */
function RoleGroupsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * RoleGroupsMapper extends HttpMapper
 */
util.inherits(RoleGroupsMapper, HttpMapper);

/**
 * Placeholder for URL to API's roleGroup resource
 */
RoleGroupsMapper.prototype.apiUrl = '/role-groups';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
RoleGroupsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

RoleGroupsMapper.prototype.save = function (roleGroup) {

  if (!(roleGroup instanceof RoleGroup)) {
    throw new Exception('Invalid model passed. Instance of RoleGroup expected');
  }

  if (!roleGroup.getId()) {
    return this.insert(roleGroup);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: roleGroup.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (roleGroups) {

      if (!_.isEmpty(roleGroups)) {
        return me.update(roleGroup);
      }

      return me.insert(roleGroup);
    });
};

RoleGroupsMapper.prototype.insert = function (roleGroup) {

  if (!(roleGroup instanceof RoleGroup)) {
    throw new Exception('Invalid model passed. Instance of RoleGroup expected');
  }

  return this.sendPostRequest(roleGroup);
};

RoleGroupsMapper.prototype.update = function (roleGroup) {

  if (!(roleGroup instanceof RoleGroup)) {
    throw new Exception('Invalid model passed. Instance of RoleGroup expected');
  }

  if (!roleGroup.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(roleGroup);
};

module.exports = RoleGroupsMapper;
