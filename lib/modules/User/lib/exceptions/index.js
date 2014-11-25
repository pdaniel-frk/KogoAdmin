
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var util                     = require('util');
var KogoAdminModuleException = require(LIBRARY_PATH + '/exception/module');

/**
 * Custom KogoAdmin User Form Error Class
 *
 * @see http://dailyjs.com/2014/01/30/exception-error/
 */
function KogoAdminUserModuleException() {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
}

/**
 * Extends Error
 * @type Error
 */
util.inherits(KogoAdminUserModuleException, KogoAdminModuleException);

/**
 * Error codes
 *
 * @type String
 */
KogoAdminUserModuleException.prototype.ERROR_AVATAR_REQUIRED = 'ERROR_AVATAR_REQUIRED';
KogoAdminUserModuleException.prototype.ERROR_USERNAME_ALREADY_IN_USE = 'ERROR_USERNAME_ALREADY_IN_USE';

/**
 * Exception name
 */
KogoAdminUserModuleException.prototype.name = 'KogoAdminUserModuleException';

module.exports = KogoAdminUserModuleException;
