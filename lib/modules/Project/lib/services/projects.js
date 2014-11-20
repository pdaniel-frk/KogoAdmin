
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var ProjectModel  = require('../models/project');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Projects service class definition
 */
function Projects(projectsMapper) {
  if (!projectsMapper) {
    var ProjectsMapper = require('../mappers/projects');
    var projectsMapper = new ProjectsMapper;
  }

  this.projectsMapper = projectsMapper;
}

/**
 * Method gets all projects matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Projects.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.projectsMapper.fetchAll(query);
};

/**
 * Method gets single project by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Projects.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid project id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (projects) {
    if (!_.isArray(projects) || _.isEmpty(projects)) {
      return null;
    }
    return projects.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Projects.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var project = new ProjectModel(data);
  return this.projectsMapper.save(project)
    .then(function (projectData) {
      return new ProjectModel(projectData);
    });
};

module.exports = Projects;
