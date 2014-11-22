
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var logger = require(LIBRARY_PATH + '/logger');
var path   = require('path');
var _      = require('underscore');
var config = require(LIBRARY_PATH + '/configuration');

exports.getDetails = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  return res.status(200).json(req.user);
};

exports.uploadAvatar = function (req, res) {
  var data = _.pick(req.body, 'type');
  var uploadPath = path.normalize(config.get("uploads:dir"));
  var file = req.files.file;
  // console.log(file.name); //original name (ie: sunset.png)
  // console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

  return res.status(200).json(file);
};
