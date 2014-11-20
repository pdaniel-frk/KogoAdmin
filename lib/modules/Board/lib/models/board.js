
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
 * Board model class definition
 */
function Board(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Board extends Model
 */
util.inherits(Board, Model);

Board.prototype.id = '';
Board.prototype.name = '';
Board.prototype.description = '';
Board.prototype.status = '';
Board.prototype.projectId = '';
Board.prototype.createdAt = '';
Board.prototype.updatedAt = '';

Board.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'status',
    'projectId',
    'createdAt',
    'updatedAt'
  ];
};

Board.prototype.getId = function () {
  return this.id;
}

Board.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Board;
