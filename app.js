
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

LIBRARY_PATH = __dirname + '/lib';
ROOT_PATH    = __dirname;

module.exports = (process.env['NODE_ENV'] === "COVERAGE")
  ? require('./lib-cov/express')
  : require('./lib/express');
