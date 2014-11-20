
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var RolePermissionModel = require('../models/rolePermission');
var QueryBuilder        = require(LIBRARY_PATH + '/routes/queryBuilder');
var _                   = require('underscore');
var KogoException       = require(LIBRARY_PATH + '/exception');

/**
 * RolePermissions service class definition
 */
function RolePermissions(rolePermissionsMapper) {
  if (!rolePermissionsMapper) {
    var RolePermissionsMapper = require('../mappers/rolePermissions');
    var rolePermissionsMapper = new RolePermissionsMapper;
  }

  this.rolePermissionsMapper = rolePermissionsMapper;
}

/**
 * Method gets all rolePermissions matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
RolePermissions.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.rolePermissionsMapper.fetchAll(query);
};

/**
 * Method gets single rolePermission by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
RolePermissions.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid rolePermission id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (rolePermissions) {
    if (!_.isArray(rolePermissions) || _.isEmpty(rolePermissions)) {
      return null;
    }
    return rolePermissions.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
RolePermissions.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var rolePermission = new RolePermissionModel(data);
  return this.rolePermissionsMapper.save(rolePermission);
};

module.exports = RolePermissions;
