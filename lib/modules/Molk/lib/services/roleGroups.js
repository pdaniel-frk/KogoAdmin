
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var RoleGroupModel = require('../models/roleGroup');
var QueryBuilder   = require(LIBRARY_PATH + '/routes/queryBuilder');
var _              = require('underscore');
var KogoException  = require(LIBRARY_PATH + '/exception');

/**
 * RoleGroups service class definition
 */
function RoleGroups(roleGroupsMapper) {
  if (!roleGroupsMapper) {
    var RoleGroupsMapper = require('../mappers/roleGroups');
    var roleGroupsMapper = new RoleGroupsMapper;
  }

  this.roleGroupsMapper = roleGroupsMapper;
}

/**
 * Method gets all roleGroups matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
RoleGroups.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.roleGroupsMapper.fetchAll(query);
};

/**
 * Method gets single roleGroup by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
RoleGroups.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid roleGroup id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (roleGroups) {
    if (!_.isArray(roleGroups) || _.isEmpty(roleGroups)) {
      return null;
    }
    return roleGroups.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
RoleGroups.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var roleGroup = new RoleGroupModel(data);
  return this.roleGroupsMapper.save(roleGroup);
};

module.exports = RoleGroups;
