
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TicketActivitiesService = require('../services/ticketActivities');
var logger                  = require(LIBRARY_PATH + '/logger');

exports.get = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var ticketActivitiesService = new TicketActivitiesService();
  ticketActivitiesService.getTicketActivities()
    .then(function (activities) {
      return res.status(200).json(activities);
    }, function (result) {
      logger.error('Fail - ' + result);
      return res.status(500).json('Internal Server Error');
    })
    .catch(function (error) {
      logger.error('Error - ' + error);
      return res.status(500).json('Internal Server Error');
    });
};
