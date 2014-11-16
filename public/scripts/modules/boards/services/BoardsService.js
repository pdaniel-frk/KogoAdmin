
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var boardsService = angular.module('BoardsService', []);

boardsService.factory('BoardsService', ['$http', function ($http) {

  var boardsApiUrl = '/api/boards';

  return {
    // call to get all boards
    get : function (params) {
      var result = $http.get(
        boardsApiUrl + (params ? '?' + $.param(params) : '')
      );

      // formatting data
      return result.then(function (response) {
        return response.data;
      });
    },

    getById : function (id) {
      return this.get(
        {
          conditions: {
            'b.id': id
          }
        })
        .then(function (boards) {
          return boards.pop();
        });
    },

    save : function (board) {
      if (board.id) {
        return this.update(board.id, board);
      }

      return this.create(board);
    },

    // call to POST and create a new board
    create : function (board) {
      return $http.post(boardsApiUrl, board)
        .then(function (result) {
          return result.data;
        });
    },

    update: function (id, board) {
      return $http.put(boardsApiUrl + '/' + id, board)
        .then(function (result) {
          return result.data;
        });
    },
  }

}]);
