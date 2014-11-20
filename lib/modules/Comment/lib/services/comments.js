
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var CommentModel  = require('../models/comment');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Comments service class definition
 */
function Comments(commentsMapper) {
  if (!commentsMapper) {
    var CommentsMapper = require('../mappers/comments');
    var commentsMapper = new CommentsMapper;
  }

  this.commentsMapper = commentsMapper;
}

/**
 * Method gets all comments matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Comments.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.commentsMapper.fetchAll(query);
};

/**
 * Method gets single comment by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Comments.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid comment id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (comments) {
    if (!_.isArray(comments) || _.isEmpty(comments)) {
      return null;
    }
    return comments.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Comments.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var comment = new CommentModel(data);
  return this.commentsMapper.save(comment)
    .then(function (commentData) {
      return new CommentModel(commentData);
    });
};

module.exports = Comments;
