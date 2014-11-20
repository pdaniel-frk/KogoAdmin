
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var RoleModel     = require('../models/role');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Roles service class definition
 */
function Roles(rolesMapper) {
  if (!rolesMapper) {
    var RolesMapper = require('../mappers/roles');
    var rolesMapper = new RolesMapper;
  }

  this.rolesMapper = rolesMapper;
}

/**
 * Method gets all roles matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Roles.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.rolesMapper.fetchAll(query);
};

/**
 * Method gets single role by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Roles.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid role id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (roles) {
    if (!_.isArray(roles) || _.isEmpty(roles)) {
      return null;
    }
    return roles.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Roles.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var role = new RoleModel(data);
  return this.rolesMapper.save(role);
};

module.exports = Roles;
