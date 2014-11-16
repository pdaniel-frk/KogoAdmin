
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
    'ProjectsService',
    'UsersService'
  ]
);

boardController.controller(
  'BoardController',
  function ($scope, BoardsService, LanesService,
    ProjectsService, UsersService, $routeParams
) {

    // route params
    $scope.projectId = $routeParams.projectId;
    $scope.boardId   = $routeParams.boardId;

    // defaults
    $scope.lanes = {};

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
              boardId: boardId,
              status: ['pending','active','inactive','suspended']
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

    // method saves lane
    $scope.saveLane = function (lane) {
      return LanesService.save(lane);
    };

    // method soft-deletes lane by id
    $scope.deleteLane = function (laneId) {
      return LanesService.update(laneId, {status:"deleted"});
    };

    $scope.getProject($scope.projectId);
    $scope.getBoard($scope.boardId);
    $scope.getLanes($scope.boardId);

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  // method called to open new lane modal
  $scope.showCreateLaneModal = function (modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    // modal values
    $scope.lane = {
        sequenceNumber : _.size($scope.lanes)+1,
        boardId : $scope.boardId,
        status : 'active'
    };

    $scope.modalTitle = 'Add lane';
  };

  // method called to open edit lane modal
  $scope.showEditLaneModal = function (lane, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.lane = _.extend({}, lane);
    $scope.modalTitle = 'Edit lane';
  };

  // method called to save modal's data
  $scope.saveModalData = function (lane) {

    if (_.isEmpty(lane)) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> You need to fill the form before saving it'
      );
      return;
    }

    $scope.saveLane(lane)
      .then(function (lane) {

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

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Lane was saved sucessfully'
        );
      });
  }

  // method called to close modal
  $scope.closeModal = function (modalSelector) {
    $scope.hideModal(modalSelector);
  }

  // method called to open delete lane modal
  $scope.showDeleteLaneModal = function (lane, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.lane = _.extend({}, lane);
  };

  // method called when deletion is confirmed
  $scope.deleteModalLane = function (lane) {

    if (!lane || !lane.id) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> There was an issue with your request - please try again later.'
      );
    }

    $scope.deleteLane(lane.id)
      .then(function (updated) {

        delete $scope.lanesAssoc[lane.id];

        var index, tempLane;
        for (index = 0; index < $scope.lanes.length; index++) {
          if (lane.id == $scope.lanes[index].id) {
            $scope.lanes.splice(index, 1);
            break;
          }
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Lane was deleted sucessfully'
        );
      });
  };

  // method called to open edit board modal
  $scope.showEditBoardModal = function (board, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    ProjectsService.get()
      .then(function (projects) {
        $scope.projects = projects;
      });

    $scope.form_board = _.extend({}, board);
    $scope.modalTitle = 'Edit board';
  };
});
