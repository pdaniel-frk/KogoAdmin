
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var SprintModel   = require('../models/sprint');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Sprints service class definition
 */
function Sprints(sprintsMapper) {
  if (!sprintsMapper) {
    var SprintsMapper = require('../mappers/sprints');
    var sprintsMapper = new SprintsMapper;
  }

  this.sprintsMapper = sprintsMapper;
}

/**
 * Method gets all sprints matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Sprints.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.sprintsMapper.fetchAll(query);
};

/**
 * Method gets single sprint by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Sprints.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid sprint id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (sprints) {
    if (!_.isArray(sprints) || _.isEmpty(sprints)) {
      return null;
    }
    return sprints.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Sprints.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var sprint = new SprintModel(data);
  return this.sprintsMapper.save(sprint)
    .then(function (sprintData) {
      return new SprintModel(sprintData);
    });
};

module.exports = Sprints;
