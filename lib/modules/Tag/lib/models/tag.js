
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
 * Tag model class definition
 */
function Tag(data) {
  if (data) {
    this.inflate(data);
  }
};

/**
 * Tag extends Model
 */
util.inherits(Tag, Model);

Tag.prototype.id = '';
Tag.prototype.name = '';
Tag.prototype.description = '';
Tag.prototype.status = '';
Tag.prototype.createdAt = '';
Tag.prototype.updatedAt = '';

Tag.prototype.getFields = function () {
  return [
    'id',
    'name',
    'description',
    'status',
    'createdAt',
    'updatedAt'
  ];
};

Tag.prototype.getId = function () {
  return this.id;
}

Tag.prototype.setId = function (id) {
  this.id = id;
}

module.exports = Tag;
