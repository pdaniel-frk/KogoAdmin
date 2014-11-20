
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
 * TicketStatus model class definition
 */
function TicketStatus(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * TicketStatus extends Model
 */
util.inherits(TicketStatus, Model);

TicketStatus.prototype.id = '';
TicketStatus.prototype.name = '';
TicketStatus.prototype.description = '';
TicketStatus.prototype.status = '';
TicketStatus.prototype.createdAt = '';
TicketStatus.prototype.updatedAt = '';

TicketStatus.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'status',
    'createdAt',
    'updatedAt'
  ];
};

TicketStatus.prototype.getId = function () {
  return this.id;
}

TicketStatus.prototype.setId = function (id) {
  this.id = id;
}

module.exports = TicketStatus;
