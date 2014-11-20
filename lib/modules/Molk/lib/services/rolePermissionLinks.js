
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var RolePermissionLinkModel = require('../models/rolePermissionLink');
var QueryBuilder            = require(LIBRARY_PATH + '/routes/queryBuilder');
var _                       = require('underscore');
var KogoException           = require(LIBRARY_PATH + '/exception');

/**
 * RolePermissionLinks service class definition
 */
function RolePermissionLinks(rolePermissionLinksMapper) {
  if (!rolePermissionLinksMapper) {
    var RolePermissionLinksMapper = require('../mappers/rolePermissionLinks');
    var rolePermissionLinksMapper = new RolePermissionLinksMapper;
  }

  this.rolePermissionLinksMapper = rolePermissionLinksMapper;
}

/**
 * Method gets all rolePermissionLinks matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
RolePermissionLinks.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.rolePermissionLinksMapper.fetchAll(query);
};

/**
 * Method gets single rolePermissionLink by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
RolePermissionLinks.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid rolePermissionLink id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (rolePermissionLinks) {
    if (!_.isArray(rolePermissionLinks) || _.isEmpty(rolePermissionLinks)) {
      return null;
    }
    return rolePermissionLinks.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
RolePermissionLinks.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var rolePermissionLink = new RolePermissionLinkModel(data);
  return this.rolePermissionLinksMapper.save(rolePermissionLink);
};

module.exports = RolePermissionLinks;
