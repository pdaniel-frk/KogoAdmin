
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var util = require('util');

/**
 * Custom KogoAdmin Error Class
 *
 * @param String  message    Exception message
 * @param Integer statusCode Exception status code
 * @param Mixed   data       Additional exception data
 * @see http://dailyjs.com/2014/01/30/exception-error/
 */
function KogoAdminException(message, statusCode, data) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = message;
  this.statusCode = 500;
  if (statusCode) {
    this.statusCode = 500;
  }
  if (data) {
    this.data = data;
  }
}

/**
 * Exception name
 */
KogoAdminException.prototype.name = 'KogoAdminException';

/**
 * Placeholder for exception data
 */
KogoAdminException.prototype.data;

/**
 * Extends Error
 * @type Error
 */
util.inherits(KogoAdminException, Error);

module.exports = KogoAdminException;
