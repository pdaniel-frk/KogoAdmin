
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Lane Tag Link service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
}

// export all services
module.exports.Services = {
  LaneTagLinks: require('./lib/services/laneTagLinks')
}

// export all mappers
module.exports.Mappers = {
  LaneTagLinks: require('./lib/mappers/laneTagLinks')
}

// export all models
module.exports.Models = {
  LaneTagLink: require('./lib/models/laneTagLink')
}
