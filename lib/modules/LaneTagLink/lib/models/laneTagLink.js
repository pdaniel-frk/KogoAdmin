
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
 * LaneTagLink model class definition
 */
function LaneTagLink(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * LaneTagLink extends Model
 */
util.inherits(LaneTagLink, Model);

LaneTagLink.prototype.id = '';
LaneTagLink.prototype.laneId = '';
LaneTagLink.prototype.laneTagId = '';
LaneTagLink.prototype.createdAt = '';

LaneTagLink.prototype.getFields = function () {
  return [
    'id',
    'laneId',
    'laneTagId',
    'createdAt'
  ];
};

LaneTagLink.prototype.getId = function () {
  return this.id;
}

LaneTagLink.prototype.setId = function (id) {
  this.id = id;
}

module.exports = LaneTagLink;
