
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var winston = require('winston');
var config  = require('../configuration');

function Logger(){

  if (!config.get('logger:console')) {
    winston.remove(winston.transports.Console);
  }

  return winston.add(winston.transports.File, {
    filename: config.get('logger:filename'),
    maxsize: 1048576,
    maxFiles: 3,
    level: config.get('logger:level')
  });
}

module.exports = new Logger();
