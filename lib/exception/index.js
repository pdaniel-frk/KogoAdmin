
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * Error constructor
 *
 * @param String message Exception message
 * @see http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
 */
function Exception(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = message;
  this.name = 'KogoException';
};

/**
 * Extends Error
 * @type Error
 */
Exception.prototype.__proto__ = Error.prototype;

module.exports = Exception;
