
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TicketLinkModel = require('../models/ticketLink');
var QueryBuilder    = require(LIBRARY_PATH + '/routes/queryBuilder');
var _               = require('underscore');
var KogoException   = require(LIBRARY_PATH + '/exception');

/**
 * TicketLinks service class definition
 */
function TicketLinks(ticketLinksMapper) {
  if (!ticketLinksMapper) {
    var TicketLinksMapper = require('../mappers/ticketLinks');
    var ticketLinksMapper = new TicketLinksMapper;
  }

  this.ticketLinksMapper = ticketLinksMapper;
}

/**
 * Method gets all ticketLinks matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
TicketLinks.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.ticketLinksMapper.fetchAll(query);
};

/**
 * Method gets single ticketLink by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
TicketLinks.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid ticketLink id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (ticketLinks) {
    if (!_.isArray(ticketLinks) || _.isEmpty(ticketLinks)) {
      return null;
    }
    return ticketLinks.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
TicketLinks.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var ticketLink = new TicketLinkModel(data);
  return this.ticketLinksMapper.save(ticketLink)
    .then(function (ticketLinkData) {
      return new TicketLinkModel(ticketLinkData);
    });
};

module.exports = TicketLinks;
