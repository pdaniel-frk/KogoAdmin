
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var boardsListController = angular.module(
  'BoardsListController',
  [
    'BoardsService',
    'ProjectsService'
  ]
);

boardsListController.controller(
  'BoardsListController',
  ["$scope", "$routeParams", "$modal", "BoardsService", "ProjectsService",
  function ($scope, $routeParams, $modal, BoardsService, ProjectsService)
{

  // route params
  $scope.projectId = parseInt($routeParams.projectId);

  // get currently selected project
  ProjectsService.getById($scope.projectId)
    .then(function (project) {
      $scope.project = project;
    });

  // method gets all boards
  $scope.getBoards = function (projectId) {
    return BoardsService.get(
        {
          conditions : {
            projectId: projectId
          }
        }
      )
      .then(function (boards) {
        $scope.boards = boards;
    });
  };

  $scope.getBoards($scope.projectId);

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  $scope.showCreateBoardModal = function () {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/boards/create.html',
      controller: 'BoardModalController',
      backdrop: 'static',
      resolve: {
        board : function () {
          return {
            "projectId" : parseInt($scope.projectId),
            "status" : "active"
          }
        }
      }
    });

    modalInstance.result.then(function (board) {

      // add board to local scope
      if (board.projectId === $scope.projectId) {
        $scope.boards.push(board);
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Board was created sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showEditBoardModal = function (board) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/boards/edit.html',
      controller: 'BoardModalController',
      backdrop: 'static',
      resolve: {
        board : function () {
          return board;
        }
      }
    });

    modalInstance.result.then(function (board) {

      // find and update board data in local scope
      var index;
      for (index = 0; index < $scope.boards.length; index++) {
        if ($scope.boards[index].id === board.id) {

          // if board changed project just delete from list
          if (board.projectId !== $scope.projectId) {
            $scope.boards.splice(index, 1);
            break;
          }

          // else update project in list
          $scope.boards[index] = board;
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Board was updated sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showDeleteBoardModal = function (board) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/boards/delete.html',
      controller: 'BoardModalController',
      backdrop: 'static',
      resolve: {
        board : function () {
          return board;
        }
      }
    });

    modalInstance.result.then(function (board) {

      // update status of deleted board
      var index;
      for (index = 0; index < $scope.boards.length; index++) {
        if ($scope.boards[index].id === board.id) {
          $scope.boards[index].status = "deleted";
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Board was sucessfully deleted(disabled)'
      );
    }, function () {
      // console.log('modal closed');
    });
  };
}]);
