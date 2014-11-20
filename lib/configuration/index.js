
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var nconf     = require('nconf');
var fs        = require('fs');
var Exception = require(LIBRARY_PATH + '/exception');

function Config() {
  var environment = this.getEnvironment();

  if (!fs.existsSync(ROOT_PATH + '/config/' + environment + '.json')) {
    throw new Exception(
      'Unable to find configuration file for specified environment( ' + environment + ' )'
    );
  }

  nconf.add('env-file', {type: 'file', file: ROOT_PATH + '/config/' + environment + '.env.json'});
  nconf.add('default-file', {type: 'file', file: ROOT_PATH + '/config/' + environment + '.json'});
}

Config.prototype.getEnvironment = function () {
  nconf.argv().env('_');
  return nconf.get('NODE:ENV') || 'app';
};

Config.prototype.get = function (key) {
  return nconf.get(key);
};

module.exports = new Config();
