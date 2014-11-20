
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
 * TimeLog model class definition
 */
function TimeLog(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * TimeLog extends Model
 */
util.inherits(TimeLog, Model);

TimeLog.prototype.id = '';
TimeLog.prototype.name = '';
TimeLog.prototype.description = '';
TimeLog.prototype.time = '';
TimeLog.prototype.ticketId = '';
TimeLog.prototype.userId = '';
TimeLog.prototype.createdAt = '';
TimeLog.prototype.updatedAt = '';

TimeLog.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'time',
    'ticketId',
    'userId',
    'createdAt',
    'updatedAt'
  ];
};

TimeLog.prototype.getId = function () {
  return this.id;
}

TimeLog.prototype.setId = function (id) {
  this.id = id;
}

module.exports = TimeLog;
