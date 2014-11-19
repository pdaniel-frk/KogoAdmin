
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var logger       = require('../logger');
var QueryBuilder = require('../routes/queryBuilder');

exports.validate = function (req, res, next) {
  var queryBuilder = new QueryBuilder();
  queryBuilder.reset();

  var util = require('util');
  logger.info(
    'Request.query = ' + util.inspect(req.query, {showHidden: false, depth: null})
  );

  try {
    queryBuilder.inflate(req.query);
  } catch (err) {
    console.log(err);
    return res.status(400).json('Bad Request');
  }
  req.query = queryBuilder;
  next();
};
