
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper         = require(LIBRARY_PATH + '/mappers/http');
var RolePermissionLink = require('./../models/rolePermissionLink');
var util               = require('util');
var Exception          = require(LIBRARY_PATH + '/exception');
var _                  = require('underscore');
var QueryBuilder       = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * RolePermissionLinks mapper class definition
 */
function RolePermissionLinksMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * RolePermissionLinksMapper extends HttpMapper
 */
util.inherits(RolePermissionLinksMapper, HttpMapper);

/**
 * Placeholder for URL to API's rolePermissionLink resource
 */
RolePermissionLinksMapper.prototype.apiUrl = '/role-permission-links';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
RolePermissionLinksMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

RolePermissionLinksMapper.prototype.save = function (rolePermissionLink) {

  if (!(rolePermissionLink instanceof RolePermissionLink)) {
    throw new Exception('Invalid model passed. Instance of RolePermissionLink expected');
  }

  if (!rolePermissionLink.getId()) {
    return this.insert(rolePermissionLink);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: rolePermissionLink.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (rolePermissionLinks) {

      if (!_.isEmpty(rolePermissionLinks)) {
        return me.update(rolePermissionLink);
      }

      return me.insert(rolePermissionLink);
    });
};

RolePermissionLinksMapper.prototype.insert = function (rolePermissionLink) {

  if (!(rolePermissionLink instanceof RolePermissionLink)) {
    throw new Exception('Invalid model passed. Instance of RolePermissionLink expected');
  }

  return this.sendPostRequest(rolePermissionLink);
};

RolePermissionLinksMapper.prototype.update = function (rolePermissionLink) {

  if (!(rolePermissionLink instanceof RolePermissionLink)) {
    throw new Exception('Invalid model passed. Instance of RolePermissionLink expected');
  }

  if (!rolePermissionLink.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(rolePermissionLink);
};

module.exports = RolePermissionLinksMapper;
