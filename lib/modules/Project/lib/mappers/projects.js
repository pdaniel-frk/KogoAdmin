
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Project      = require('./../models/project');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Projects mapper class definition
 */
function ProjectsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * ProjectsMapper extends HttpMapper
 */
util.inherits(ProjectsMapper, HttpMapper);

/**
 * Placeholder for URL to API's project resource
 */
ProjectsMapper.prototype.apiUrl = '/projects';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
ProjectsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

ProjectsMapper.prototype.save = function (project) {

  if (!(project instanceof Project)) {
    throw new Exception('Invalid model passed. Instance of Project expected');
  }

  if (!project.getId()) {
    return this.insert(project);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: project.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (projects) {

      if (!_.isEmpty(projects)) {
        return me.update(project);
      }

      return me.insert(project);
    });
};

ProjectsMapper.prototype.insert = function (project) {

  if (!(project instanceof Project)) {
    throw new Exception('Invalid model passed. Instance of Project expected');
  }

  return this.sendPostRequest(project);
};

ProjectsMapper.prototype.update = function (project) {

  if (!(project instanceof Project)) {
    throw new Exception('Invalid model passed. Instance of Project expected');
  }

  if (!project.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(project);
};

module.exports = ProjectsMapper;
