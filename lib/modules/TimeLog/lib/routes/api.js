
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TimeLogsService = require('../services/timeLogs');
var logger          = require(LIBRARY_PATH + '/logger');

exports.get = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var timeLogsService = new TimeLogsService();
  timeLogsService.all(req.query)
  .then(function (timeLogs) {
    return res.status(200).json(timeLogs);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

exports.getById = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var timeLogsService = new TimeLogsService();
  timeLogsService.get(req.params.id)
  .then(function (timeLog) {
    if (!timeLog) return res.status(404).json('Not Found');
    return res.status(200).json(timeLog);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

exports.create = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var timeLogsService = new TimeLogsService();
  timeLogsService.save(req.body)
  .then(function (timeLog) {
    if (timeLog === null) return res.status(404).json('Not Found');
    res.setHeader('Location', '/api/time-logs/' +  timeLog.getId());
    return res.status(201).json(timeLog);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

exports.update = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  req.body.id = parseInt(req.params.id);

  var timeLogsService = new TimeLogsService();
  timeLogsService.save(req.body)
  .then(function (timeLog) {
    if (timeLog === null) return res.status(409).json('Conflict');
    return res.status(200).json(timeLog);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

// ------------------------------------------------------- //
// ------------ DELETE REQUESTS ARE DISABLED ------------- //
// ------------------------------------------------------- //

// exports.delete = function (req, res) {
//   logger.info(req.method + ' request: ' + req.url);

//   var timeLogsService = new TimeLogsService();
//   timeLogsService.del(req.params.id)
//   .then(function (numberOfDeleted) {
//     if (numberOfDeleted === 0) return res.status(404).json('Not Found');
//     return res.status(204).json('No Content');
//   }, function (result) {
//     logger.error('Fail - ' + result);
//     return res.status(500).json('Internal Server Error');
//   })
//   .catch(function (error) {
//     logger.error('Error - ' + error);
//     return res.status(500).json('Internal Server Error');
//   });
// };
