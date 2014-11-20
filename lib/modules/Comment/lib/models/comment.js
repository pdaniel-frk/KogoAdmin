
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
 * Comment model class definition
 */
function Comment(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Comment extends Model
 */
util.inherits(Comment, Model);

Comment.prototype.id = '';
Comment.prototype.text = '';
Comment.prototype.userId = '';
Comment.prototype.ticketId = '';
Comment.prototype.status = '';
Comment.prototype.createdAt = '';
Comment.prototype.updatedAt = '';

Comment.prototype.getFields = function () {
  return [
    'id',
    'text',
    'userId',
    'ticketId',
    'status',
    'createdAt',
    'updatedAt'
  ];
};

Comment.prototype.getId = function () {
  return this.id;
}

Comment.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Comment;
