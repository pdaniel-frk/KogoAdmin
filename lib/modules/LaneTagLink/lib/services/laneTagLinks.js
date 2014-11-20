
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var LaneTagLinkModel = require('../models/laneTagLink');
var QueryBuilder     = require(LIBRARY_PATH + '/routes/queryBuilder');
var _                = require('underscore');
var KogoException    = require(LIBRARY_PATH + '/exception');

/**
 * LaneTagLinks service class definition
 */
function LaneTagLinks(laneTagLinksMapper) {
  if (!laneTagLinksMapper) {
    var LaneTagLinksMapper = require('../mappers/laneTagLinks');
    var laneTagLinksMapper = new LaneTagLinksMapper;
  }

  this.laneTagLinksMapper = laneTagLinksMapper;
}

/**
 * Method gets all laneTagLinks matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
LaneTagLinks.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.laneTagLinksMapper.fetchAll(query);
};

/**
 * Method gets single laneTagLink by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
LaneTagLinks.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid laneTagLink id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (laneTagLinks) {
    if (!_.isArray(laneTagLinks) || _.isEmpty(laneTagLinks)) {
      return null;
    }
    return laneTagLinks.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
LaneTagLinks.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var laneTagLink = new LaneTagLinkModel(data);
  return this.laneTagLinksMapper.save(laneTagLink)
    .then(function (laneTagLinkData) {
      return new LaneTagLinkModel(laneTagLinkData);
    });
};

module.exports = LaneTagLinks;
