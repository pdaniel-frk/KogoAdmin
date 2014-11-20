
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Comment service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
};

// export all services
module.exports.Services = {
  Comments: require('./lib/services/comments')
};

// export all mappers
module.exports.Mappers = {
  Comments: require('./lib/mappers/comments')
};

// export all models
module.exports.Models = {
  Comment: require('./lib/models/comment')
};
