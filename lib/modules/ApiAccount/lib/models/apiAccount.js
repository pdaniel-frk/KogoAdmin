
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
 * ApiAccount model class definition
 */
function ApiAccount(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * ApiAccount extends Model
 */
util.inherits(ApiAccount, Model);

ApiAccount.prototype.id = '';
ApiAccount.prototype.authKey = '';
ApiAccount.prototype.secret = '';
ApiAccount.prototype.username = '';
ApiAccount.prototype.status = '';
ApiAccount.prototype.roleId = '';
ApiAccount.prototype.createdAt = '';
ApiAccount.prototype.updatedAt = '';

ApiAccount.prototype.getFields = function () {
  return [
    'id',
    'authKey',
    'secret',
    'username',
    'status',
    'roleId',
    'createdAt',
    'updatedAt'
  ];
};

ApiAccount.prototype.getId = function () {
  return this.id;
}

ApiAccount.prototype.setId = function (id) {
  this.id = id;
}

module.exports = ApiAccount;
