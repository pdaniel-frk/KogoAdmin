
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var Exception = require('./../exception');
var _         = require('underscore');
var logger    = require(LIBRARY_PATH + '/logger');

/**
 * Model base class
 *
 * @param object data Data to inflate object with
 */
function Model(data) {
  var data = data || {};
  this.inflate(data);
};

/**
 * Method inflates object properties with passed data
 *
 * @param  object data Data to be used to inflate model
 * @return Model  this Fluent interface
 * @throws Exception Thrown when model fields' defnition
 * is invalid
 */
Model.prototype.inflate = function (data) {

  if (!_.isObject(data)) {
    throw new Exception('Invalid data provided');
  }

  var modelFields = this.getFields();

  if (!Array.isArray(modelFields)) {
    throw new Exception(
      'Invalid fileds definition in ' + this.constructor.name + ' class'
    );
  }

  var field = null;
  for (var index in modelFields) {
    field = modelFields[index];
    if (!_.has(data, field)) {
      logger.info(data);
      logger.info(field + ' ignored');
      continue;
    }

    this[field] = data[field];
  }

  return this;
};

module.exports = Model;
