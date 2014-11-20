
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
 * Account model class definition
 */
function Account(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Account extends Model
 */
util.inherits(Account, Model);

Account.prototype.id = '';
Account.prototype.name = '';
Account.prototype.status = '';
Account.prototype.apiAccountId = '';
Account.prototype.createdAt = '';
Account.prototype.updatedAt = '';

Account.prototype.getFields = function () {
  return [
    'id',
    'name',
    'status',
    'apiAccountId',
    'createdAt',
    'updatedAt'
  ];
};

Account.prototype.getId = function () {
  return this.id;
}

Account.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Account;
