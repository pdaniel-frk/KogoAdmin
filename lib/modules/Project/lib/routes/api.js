
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var ProjectsService = require('../services/projects');
var logger          = require(LIBRARY_PATH + '/logger');

exports.get = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var projectsService = new ProjectsService();
  projectsService.all(req.query)
  .then(function (projects) {
    return res.status(200).json(projects);
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

  var projectsService = new ProjectsService();
  projectsService.get(req.params.id)
  .then(function (project) {
    if (!project) return res.status(404).json('Not Found');
    return res.status(200).json(project);
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

  var project = req.body;

  // temp hack
  project.accountId = 1;

  var projectsService = new ProjectsService();
  projectsService.save(req.body)
  .then(function (project) {
    if (project === null) return res.status(404).json('Not Found');
    res.setHeader('Location', '/api/projects/' +  project.getId());
    return res.status(201).json(project);
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

  var projectsService = new ProjectsService();
  projectsService.save(req.body)
  .then(function (project) {
    if (project === null) return res.status(409).json('Conflict');
    return res.status(200).json(project);
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

//   var projectsService = new ProjectsService();
//   projectsService.del(req.params.id)
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
