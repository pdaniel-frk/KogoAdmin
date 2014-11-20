
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var ApiAccountModel = require('../models/apiAccount');
var QueryBuilder    = require(LIBRARY_PATH + '/routes/queryBuilder');
var _               = require('underscore');
var KogoException   = require(LIBRARY_PATH + '/exception');

/**
 * ApiAccounts service class definition
 */
function ApiAccounts(apiAccountsMapper) {
  if (!apiAccountsMapper) {
    var ApiAccountsMapper = require('../mappers/apiAccounts');
    var apiAccountsMapper = new ApiAccountsMapper;
  }

  this.apiAccountsMapper = apiAccountsMapper;
}

/**
 * Method gets all apiAccounts matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
ApiAccounts.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.apiAccountsMapper.fetchAll(query);
};

/**
 * Method gets single apiAccount by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
ApiAccounts.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid apiAccount id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (apiAccounts) {
    if (!_.isArray(apiAccounts) || _.isEmpty(apiAccounts)) {
      return null;
    }
    return apiAccounts.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
ApiAccounts.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var apiAccount = new ApiAccountModel(data);
  return this.apiAccountsMapper.save(apiAccount)
    .then(function (apiAccountData) {
      return new ApiAccountModel(apiAccountData);
    });
};

module.exports = ApiAccounts;
