
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var util = require('util');

/**
 * Custom KogoAdmin Module Error Class
 *
 * @see http://dailyjs.com/2014/01/30/exception-error/
 */
function KogoAdminModuleException() {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
}

/**
 * Extends Error
 * @type Error
 */
util.inherits(KogoAdminModuleException, Error);

/**
 * Exception name
 */
KogoAdminModuleException.prototype.name = 'KogoAdminModuleException';

/**
 * Placeholder for exception errors
 */
KogoAdminModuleException.prototype.errors = {};

/**
 * Method appends error messages to be returned
 *
 * @param  string field     Field that error occurred
 * @param  string errorCode Error code (useful for message overriding on frontend)
 * @param  string message   Error message to be assigned to field
 */
KogoAdminModuleException.prototype.appendError = function (field, errorCode, message) {

  if (!this.errors[field]) {
    this.errors[field] = {};
  }

  this.errors[field][errorCode] = message;
}

/**
 * Method exports errors' details
 *
 * @return object List of error details in following format:
 * {
 *   fieldA : {
 *     'TOO_LONG' : 'Passed value of FieldA is too long - value between 8 and 12 characters long expected'
 *   }
 * }
 */
KogoAdminModuleException.prototype.export = function () {
  return this.errors;
}

module.exports = KogoAdminModuleException;
