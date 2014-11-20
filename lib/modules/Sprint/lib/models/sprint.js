
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
 * Sprint model class definition
 */
function Sprint(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Sprint extends Model
 */
util.inherits(Sprint, Model);

Sprint.prototype.id = '';
Sprint.prototype.name = '';
Sprint.prototype.description = '';
Sprint.prototype.startDate = '';
Sprint.prototype.endDate = '';
Sprint.prototype.status = '';
Sprint.prototype.boardId = '';
Sprint.prototype.createdAt = '';
Sprint.prototype.updatedAt = '';

Sprint.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'status',
    'boardId',
    'createdAt',
    'updatedAt'
  ];
};

Sprint.prototype.getId = function () {
  return this.id;
}

Sprint.prototype.setId = function (id) {
  this.id = id;
  return this;
}

module.exports = Sprint;
