
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var LanesService = require('../services/lanes');
var logger       = require(LIBRARY_PATH + '/logger');

exports.getExtended = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var lanesService = new LanesService();
  lanesService.allExtended(req.query)
    .then(function (lanes) {
      return res.status(200).json(lanes);
    }, function (result) {
      logger.error('Fail - ' + result);
      return res.status(500).json('Internal Server Error');
    })
    .catch(function (error) {
      logger.error('Error - ' + error);
      return res.status(500).json('Internal Server Error');
    });
};
