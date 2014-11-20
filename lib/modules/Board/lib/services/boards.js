
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var BoardModel    = require('../models/board');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Boards service class definition
 */
function Boards(boardsMapper) {
  if (!boardsMapper) {
    var BoardsMapper = require('../mappers/boards');
    var boardsMapper = new BoardsMapper;
  }

  this.boardsMapper = boardsMapper;
}

/**
 * Method gets all boards matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Boards.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.boardsMapper.fetchAll(query);
};

/**
 * Method gets single board by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Boards.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid board id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (boards) {
    if (!_.isArray(boards) || _.isEmpty(boards)) {
      return null;
    }
    return boards.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Boards.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var board = new BoardModel(data);
  return this.boardsMapper.save(board)
    .then(function (boardData) {
      return new BoardModel(boardData);
    });
};

module.exports = Boards;
