
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
 * Role model class definition
 */
function Role(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Role extends Model
 */
util.inherits(Role, Model);

Role.prototype.id = '';
Role.prototype.identifier = '';
Role.prototype.name = '';
Role.prototype.level = '';
Role.prototype.inheritance = '';
Role.prototype.type = '';
Role.prototype.status = '';
Role.prototype.boardId = '';
Role.prototype.createdAt = '';
Role.prototype.updatedAt = '';

Role.prototype.getFields = function () {
  return [
    'id',
    'identifier',
    'name',
    'level',
    'inheritance',
    'type',
    'status',
    'createdAt',
    'updatedAt'
  ];
};

Role.prototype.getId = function () {
  return this.id;
}

Role.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Role;
