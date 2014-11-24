
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var boardModalController = angular.module(
  'BoardModalController',
  [
    'BoardsService'
  ]
);

boardModalController.controller(
  'BoardModalController',
  [
    "$scope", "$modalInstance", "BoardsService", "ProjectsService", "board",
    function ($scope, $modalInstance, BoardsService, ProjectsService, board
    ) {

      $scope.modalBoard = _.extend({}, board);

      // method called to create board
      $scope.createBoard = function (board) {

        if (!_.isObject(board)) {
          throw 'Invalid board passed';
        }

        return BoardsService.save(board);
      }

      // method called to update board
      $scope.updateBoard = function (board) {

        if (!_.isObject(board)) {
          throw 'Invalid board passed';
        }

        return BoardsService.save(board);
      }

      // method gets all projects
      ProjectsService.get()
        .then(function (projects) {
          $scope.modalProjects = projects;
      });

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'create board' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save board
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (board) {

        // saving board
        return $scope.createBoard(board)
          .then(function (board) {
            $modalInstance.close(board);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'update board' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save board
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.update = function (board) {

        // saving board
        return $scope.updateBoard(board)
          .then(function (board) {
            $modalInstance.close(board);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'delete' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save board
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.delete = function (board) {

        var data = {
          "id" : board.id,
          "status" : "deleted"
        };

        // saving board
        return $scope.updateBoard(data)
          .then(function (board) {
            $modalInstance.close(board);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Cancel method called when 'cancel' button
       * was clicked
       */
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);
