
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
 * Project model class definition
 */
function Project(data) {
  if (data) {
    this.inflate(data);
  }
}

/**
 * Project extends Model
 */
util.inherits(Project, Model);

/**
 * Definition of Project's properties
 * @type String
 */
Project.prototype.id = '';
Project.prototype.name = '';
Project.prototype.code = '';
Project.prototype.description = '';
Project.prototype.status = '';
Project.prototype.accountId = '';
Project.prototype.createdAt = '';
Project.prototype.updatedAt = '';


Project.prototype.getFields = function () {
  return [
    'id',
    'name',
    'code',
    'description',
    'status',
    'accountId',
    'createdAt',
    'updatedAt'
  ];
};

/**
 * Method returns Project's id
 * @return string Project's id
 */
Project.prototype.getId = function () {
  return this.id;
};

/**
 * Method sets Project's id
 * @param string id Project's id
 * @return Project this Fluent interface
 */
Project.prototype.setId = function (id) {
  this.id = id;
  return this;
};

/**
 * Export model class
 * @type Project
 */
module.exports = Project;
