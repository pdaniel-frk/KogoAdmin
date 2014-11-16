
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var redis  = require('redis');
var client = redis.createClient();
var Q      = require('q');

function RedisClient(redisClient) {
  this.client = redisClient || client;
  this.get = Q.nbind(this.client.get, this.client);
  this.set = Q.nbind(this.client.set, this.client);
}

RedisClient.prototype.client = null;

RedisClient.prototype.get = null;

RedisClient.prototype.set = null;

module.exports = RedisClient;
