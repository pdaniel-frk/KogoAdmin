
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var usersService = angular.module('UsersService', [])

usersService.factory('UsersService', ['$http', function($http) {

  var usersApiUrl = '/api/users';

  return {
    // call to get all users
    get : function(params) {
      var result = $http.get(
        usersApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function(response){
        return response.data;
      });
    },

    getById : function(id) {
      return this.get(
          {
            conditions: {
              'u.id': id
            }
          }
        )
        .then(function(users){
          return users.pop();
        });
    },

    getInfo : function() {
      return $http.get('/user')
        .then(function(result){
           return result.data;
         });
     },


    save : function(user) {
      if (user.id) {
        return this.update(user.id, user);
      }

      return this.create(user);
    },

    // call to POST and create a new user
    create : function(user) {
      return $http.post(usersApiUrl, user)
        .then(function(result) {
          return result.data;
        });
    },

    update: function(id, user) {
      return $http.put(usersApiUrl + '/' + id, user)
        .then(function(result) {
          return result.data;
        });
    },

    // call to DELETE a user
    delete : function(id) {
      return $http.delete(usersApiUrl + '/' + id);
    }
  }

}]);
