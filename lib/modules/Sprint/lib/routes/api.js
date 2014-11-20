
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var SprintsService = require('../services/sprints');
var logger         = require(LIBRARY_PATH + '/logger');

exports.get = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var sprintsService = new SprintsService();
  sprintsService.all(req.query)
  .then(function (sprints) {
    return res.status(200).json(sprints);
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

  var sprintsService = new SprintsService();
  sprintsService.get(req.params.id)
  .then(function (sprint) {
    if (!sprint) return res.status(404).json('Not Found');
    return res.status(200).json(sprint);
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

  var sprintsService = new SprintsService();
  sprintsService.save(req.body)
  .then(function (sprint) {
    if (sprint === null) return res.status(404).json('Not Found');
    res.setHeader('Location', '/api/sprints/' +  sprint.getId());
    return res.status(201).json(sprint);
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

  var sprintsService = new SprintsService();
  sprintsService.save(req.body)
  .then(function (sprint) {
    if (sprint === null) return res.status(409).json('Conflict');
    return res.status(200).json(sprint);
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

//   var sprintsService = new SprintsService();
//   sprintsService.del(req.params.id)
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
