
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper     = require(LIBRARY_PATH + '/mappers/http');
var RolePermission = require('./../models/rolePermission');
var util           = require('util');
var Exception      = require(LIBRARY_PATH + '/exception');
var _              = require('underscore');
var QueryBuilder   = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * RolePermissions mapper class definition
 */
function RolePermissionsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * RolePermissionsMapper extends HttpMapper
 */
util.inherits(RolePermissionsMapper, HttpMapper);

/**
 * Placeholder for URL to API's rolePermission resource
 */
RolePermissionsMapper.prototype.apiUrl = '/role-permissions';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
RolePermissionsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

RolePermissionsMapper.prototype.save = function (rolePermission) {

  if (!(rolePermission instanceof RolePermission)) {
    throw new Exception('Invalid model passed. Instance of RolePermission expected');
  }

  if (!rolePermission.getId()) {
    return this.insert(rolePermission);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: rolePermission.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (rolePermissions) {

      if (!_.isEmpty(rolePermissions)) {
        return me.update(rolePermission);
      }

      return me.insert(rolePermission);
    });
};

RolePermissionsMapper.prototype.insert = function (rolePermission) {

  if (!(rolePermission instanceof RolePermission)) {
    throw new Exception('Invalid model passed. Instance of RolePermission expected');
  }

  return this.sendPostRequest(rolePermission);
};

RolePermissionsMapper.prototype.update = function (rolePermission) {

  if (!(rolePermission instanceof RolePermission)) {
    throw new Exception('Invalid model passed. Instance of RolePermission expected');
  }

  if (!rolePermission.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(rolePermission);
};

module.exports = RolePermissionsMapper;
