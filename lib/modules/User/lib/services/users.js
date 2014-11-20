
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var UserModel     = require('../models/user');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Users service class definition
 */
function Users(usersMapper) {
  if (!usersMapper) {
    var UsersMapper = require('../mappers/users');
    var usersMapper = new UsersMapper;
  }

  this.usersMapper = usersMapper;
}

/**
 * Method gets all users matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Users.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.usersMapper.fetchAll(query);
};

/**
 * Method gets single user by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Users.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid user id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (users) {
    if (!_.isArray(users) || _.isEmpty(users)) {
      return null;
    }
    return users.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Users.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var user = new UserModel(data);
  return this.usersMapper.save(user)
    .then(function (userData) {
      return new UserModel(userData);
    });
};

module.exports = Users;
