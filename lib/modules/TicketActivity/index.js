
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Ticket Activity service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api'),
  Frontend: require('./lib/routes/frontend')
};

// export all services
module.exports.Services = {
  TicketActivities: require('./lib/services/ticketActivities')
};

// export all mappers
module.exports.Mappers = {
  TicketActivities: require('./lib/mappers/ticketActivities')
};

// export all models
module.exports.Models = {
  TicketActivity: require('./lib/models/ticketActivity')
};
