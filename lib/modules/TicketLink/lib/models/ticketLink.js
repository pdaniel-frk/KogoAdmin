
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
 * TicketLink model class definition
 */
function TicketLink(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * TicketLink extends Model
 */
util.inherits(TicketLink, Model);

TicketLink.prototype.id = '';
TicketLink.prototype.ticketId = '';
TicketLink.prototype.projectId = '';
TicketLink.prototype.boardId = '';
TicketLink.prototype.sprintId = '';
TicketLink.prototype.laneId = '';

TicketLink.prototype.getFields = function () {
  return [
    'id',
    'ticketId',
    'projectId',
    'boardId',
    'sprintId',
    'laneId'
  ];
};

TicketLink.prototype.getId = function () {
  return this.id;
}

TicketLink.prototype.setId = function (id) {
  this.id = id;
}

module.exports = TicketLink;
