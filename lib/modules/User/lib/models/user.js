
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var Model = require(LIBRARY_PATH + '/models');
var util  = require('util');

/**
 * User model class definition
 */
function User(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * User extends Model
 */
util.inherits(User, Model);

User.prototype.id = '';
User.prototype.username = '';
User.prototype.password = '';
User.prototype.email = '';
User.prototype.firstName = '';
User.prototype.middleName = '';
User.prototype.lastName = '';
User.prototype.avatar = '';
User.prototype.status = '';
User.prototype.roleId = '';
User.prototype.accountId = '';
User.prototype.createdAt = '';
User.prototype.updatedAt = '';

User.prototype.getFields = function () {
  return [
    'id',
    'username',
    'password',
    'email',
    'firstName',
    'middleName',
    'lastName',
    'avatar',
    'status',
    'roleId',
    'accountId',
    'createdAt',
    'updatedAt'
  ];
};

User.prototype.getId = function () {
  return this.id;
}

User.prototype.setId = function (id) {
  this.id = id;
}

module.exports = User;
