
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var LaneModel     = require('../models/lane');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

var TicketLinkModule   = require(LIBRARY_PATH + '/modules/TicketLink');
var ticketLinksService = new TicketLinkModule.Services.TicketLinks();

/**
 * Lanes service class definition
 */
function Lanes(lanesMapper) {
  if (!lanesMapper) {
    var LanesMapper = require('../mappers/lanes');
    var lanesMapper = new LanesMapper;
  }

  this.lanesMapper = lanesMapper;
}

/**
 * Method gets all lanes matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Lanes.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.lanesMapper.fetchAll(query);
};

/**
 * Method gets single lane by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Lanes.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid lane id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (lanes) {
    if (!_.isArray(lanes) || _.isEmpty(lanes)) {
      return null;
    }
    return lanes.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Lanes.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var lane = new LaneModel(data);
  return this.lanesMapper.save(lane)
    .then(function (laneData) {
      return new LaneModel(laneData);
    });
};

module.exports = Lanes;
