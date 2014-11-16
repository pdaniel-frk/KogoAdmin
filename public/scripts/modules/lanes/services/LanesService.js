
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var lanesService = angular.module('LanesService', []);

lanesService.factory('LanesService', ['$http', function($http) {

  var lanesApiUrl = '/api/lanes';

  return {
    // call to get all boards
    get : function(params) {
      var result = $http.get(
        lanesApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function(response){
        var rawLanes = response.data;

        var lanes = {};
        angular.forEach(rawLanes, function(lane) {
          lanes[lane.id] = lane;
        });

        return [rawLanes, lanes];
      });
    },

    getById : function(id) {
      return this.get({'conditions': {'l.id': id}})
        .then(function(lanes){
          return lanes[id];
        });
    },

    save : function(lane) {
      if (lane.id) {
        return this.update(lane.id, lane);
      }

      return this.create(lane);
    },

    // call to POST and create a new lane
    create : function(lane) {
      return $http.post(lanesApiUrl, lane)
        .then(function(result) {
          return result.data;
        });
    },

    update: function(id, lane) {
      return $http.put(lanesApiUrl + '/' + id, lane)
        .then(function(result) {
          return result.data;
        });
    },
  }

}]);
