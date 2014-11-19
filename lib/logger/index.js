
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var winston = require('winston');
var config  = require('../configuration');
var _       = require('underscore');
var util    = require('util');

function Logger() {

  var transports = [];

  if (config.get('logger:transports:console:enabled')) {
    transports.push(
      new (winston.transports.Console)(
        config.get('logger:transports:console')
      )
    );
  }

  if (config.get('logger:transports:file:enabled')) {
    var fileConfig = config.get('logger:transports:file');
    fileConfig.filename = ROOT_PATH + '/' + fileConfig.filename;
    transports.push(
      new (winston.transports.File)(
        fileConfig
      )
    );
  }

  if (config.get('logger:transports:logentries:enabled')) {
    var Logentries = require('winston-logentries');
    transports.push(
      new (winston.transports.Logentries)(
        config.get('logger:transports:logentries')
      )
    );
  }

  this.log = new winston.Logger({
    transports : transports
  })
}

/**
 * Placeholder for a Winston logger
 */
Logger.prototype.log;

Logger.prototype._log = function (level, message, data) {

  // if error object
  if (_.isObject(message)) {
    message = "Message: " + message.message + "\n"
            + 'Stack trace: ' + message.stack;
  }

  if (data) {
    message += "\n" + 'Additional data: ' + util.inspect(data, {showHidden: true, depth: 5});
  }

  this.log.log(level, message);
}

Logger.prototype.log = function (level, message, data) {
  this._log(level, message, data);
}

Logger.prototype.info = function (message, data) {
  this._log('info', message, data);
}

Logger.prototype.warn = function (message, data) {
  this._log('warn', message, data);
}

Logger.prototype.error = function (message, data) {
  this._log('error', message, data);
}

module.exports = new Logger();

