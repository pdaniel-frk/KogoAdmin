
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TagModel      = require('../models/tag');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Tags service class definition
 */
function Tags(tagsMapper) {
  if (!tagsMapper) {
    var TagsMapper = require('../mappers/tags');
    var tagsMapper = new TagsMapper;
  }

  this.tagsMapper = tagsMapper;
}

/**
 * Method gets all tags matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Tags.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.tagsMapper.fetchAll(query);
};

/**
 * Method gets single tag by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Tags.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid tag id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (tags) {
    if (!_.isArray(tags) || _.isEmpty(tags)) {
      return null;
    }
    return tags.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Tags.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var tag = new TagModel(data);
  return this.tagsMapper.save(tag)
    .then(function (tagData) {
      return new TagModel(tagData);
    });
};

module.exports = Tags;
