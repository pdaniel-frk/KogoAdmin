
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
 * Ticket model class definition
 */
function Ticket(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Ticket extends Model
 */
util.inherits(Ticket, Model);

Ticket.prototype.id = '';
Ticket.prototype.name = '';
Ticket.prototype.description = '';
Ticket.prototype.storyPoints = '';
Ticket.prototype.creatorId = '';
Ticket.prototype.assigneeId = '';
Ticket.prototype.statusId = '';
Ticket.prototype.createdAt = '';
Ticket.prototype.updatedAt = '';

Ticket.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'storyPoints',
    'creatorId',
    'assigneeId',
    'statusId',
    'createdAt',
    'updatedAt'
  ];
};

Ticket.prototype.getId = function () {
  return this.id;
}

Ticket.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Ticket;
