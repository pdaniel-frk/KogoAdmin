
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Board        = require('./../models/board');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Boards mapper class definition
 */
function BoardsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * BoardsMapper extends HttpMapper
 */
util.inherits(BoardsMapper, HttpMapper);

/**
 * Placeholder for URL to API's board resource
 */
BoardsMapper.prototype.apiUrl = '/boards';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
BoardsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

BoardsMapper.prototype.save = function (board) {

  if (!(board instanceof Board)) {
    throw new Exception('Invalid model passed. Instance of Board expected');
  }

  if (!board.getId()) {
    return this.insert(board);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: board.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (boards) {

      if (!_.isEmpty(boards)) {
        return me.update(board);
      }

      return me.insert(board);
    });
};

BoardsMapper.prototype.insert = function (board) {

  if (!(board instanceof Board)) {
    throw new Exception('Invalid model passed. Instance of Board expected');
  }

  return this.sendPostRequest(board);
};

BoardsMapper.prototype.update = function (board) {

  if (!(board instanceof Board)) {
    throw new Exception('Invalid model passed. Instance of Board expected');
  }

  if (!board.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(board);
};

module.exports = BoardsMapper;
