
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
 * Lane model class definition
 */
function Lane(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Lane extends Model
 */
util.inherits(Lane, Model);

Lane.prototype.id = '';
Lane.prototype.name = '';
Lane.prototype.description = '';
Lane.prototype.sequenceNumber = '';
Lane.prototype.status = '';
Lane.prototype.boardId = '';
Lane.prototype.createdAt = '';
Lane.prototype.updatedAt = '';

Lane.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'sequenceNumber',
    'boardId',
    'status',
    'createdAt',
    'updatedAt'
  ];
};

Lane.prototype.getId = function () {
  return this.id;
}

Lane.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Lane;
