
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
 * TicketActivity model class definition
 */
function TicketActivity(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * TicketActivity extends Model
 */
util.inherits(TicketActivity, Model);

TicketActivity.prototype.id = '';
TicketActivity.prototype.ticketId = '';
TicketActivity.prototype.type = '';
TicketActivity.prototype.field = '';
TicketActivity.prototype.originalValue = '';
TicketActivity.prototype.newValue = '';
TicketActivity.prototype.userId = '';
TicketActivity.prototype.createdAt = '';

TicketActivity.prototype.getFields = function () {
  return [
    'id',
    'ticketId',
    'type',
    'field',
    'originalValue',
    'newValue',
    'userId',
    'createdAt'
  ];
};

TicketActivity.prototype.getId = function () {
  return this.id;
}

TicketActivity.prototype.setId = function (id) {
  this.id = id;
}

module.exports = TicketActivity;
