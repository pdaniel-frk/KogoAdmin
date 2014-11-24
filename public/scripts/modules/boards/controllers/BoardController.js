
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var boardController = angular.module(
  'BoardController',
  [
    'BoardsService',
    'LanesService',
    'ProjectsService'
  ]
);

boardController.controller(
  'BoardController',
  ["$scope", "$routeParams", "$modal",
    "BoardsService", "LanesService", "ProjectsService",
  function ($scope, $routeParams, $modal,
    BoardsService, LanesService, ProjectsService
) {

    // route params
    $scope.projectId = parseInt($routeParams.projectId);
    $scope.boardId   = parseInt($routeParams.boardId);

    // method returns project by id
    $scope.getProject = function (projectId) {
      return ProjectsService.getById(projectId)
        .then(function (project) {
          $scope.project = project;
        });
    }

    // method returns board by id
    $scope.getBoard = function (boardId) {
      return BoardsService.getById(boardId)
        .then(function (board) {
          $scope.board = board;
        });
    }

    // method returns lanes by board id
    $scope.getLanes = function (boardId) {
      return LanesService.get(
          {
            conditions : {
              boardId: boardId
            },
            order: {
              sequenceNumber: 'asc'
            }
          }
        )
        .then(function (lanesMatrix) {
          $scope.lanes = lanesMatrix[0];
          $scope.lanesAssoc = lanesMatrix[1];
          $scope.sortableLanes = _.values($scope.lanes);
        });
    };

    $scope.getProject($scope.projectId);
    $scope.getBoard($scope.boardId);
    $scope.getLanes($scope.boardId);

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  $scope.showCreateLaneModal = function () {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/lanes/create.html',
      controller: 'LaneModalController',
      backdrop: 'static',
      resolve: {
        lane : function () {
          return {
            "sequenceNumber" : _.size($scope.lanes)+1,
            "boardId" : $scope.boardId,
            "status" : 'active'
          }
        }
      }
    });

    modalInstance.result.then(function (lane) {

      // add lane to local scope
      if (!$scope.lanesAssoc[lane.id]) {
        $scope.lanes.push(lane);
      } else {
        var index, tempLane;
        for (index = 0; index < $scope.lanes.length; index++) {
          if (lane.id == $scope.lanes[index].id) {
            $scope.lanes[index] = lane;
            break;
          }
        }
      }

      $scope.lanesAssoc[lane.id] = lane;

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Lane was created sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showEditLaneModal = function (lane) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/lanes/edit.html',
      controller: 'LaneModalController',
      backdrop: 'static',
      resolve: {
        lane : function () {
          return lane;
        }
      }
    });

    modalInstance.result.then(function (lane) {

      // add lane to local scope
      if (!$scope.lanesAssoc[lane.id]) {
        $scope.lanes.push(lane);
      } else {
        var index, tempLane;
        for (index = 0; index < $scope.lanes.length; index++) {
          if (lane.id == $scope.lanes[index].id) {
            $scope.lanes[index] = lane;
            break;
          }
        }
      }

      $scope.lanesAssoc[lane.id] = lane;

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Lane was updated sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showDeleteLaneModal = function (lane) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/lanes/delete.html',
      controller: 'LaneModalController',
      backdrop: 'static',
      resolve: {
        lane : function () {
          return lane;
        }
      }
    });

    modalInstance.result.then(function (lane) {

      // update status of deleted project
      $scope.lanesAssoc[lane.id] = lane;

      var index, tempLane;
      for (index = 0; index < $scope.lanes.length; index++) {
        if (lane.id == $scope.lanes[index].id) {
          $scope.lanes[index].status = 'deleted';
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Lane was sucessfully deleted(disabled)'
      );
    }, function () {
      // console.log('modal closed');
    });
  };
}]);
