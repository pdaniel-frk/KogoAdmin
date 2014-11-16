
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
  function ($scope, BoardsService, ProjectsService, $routeParams)
{

  // route params
  $scope.projectId = $routeParams.projectId;

  // method gets all projects
  $scope.getProjects = function () {
    return ProjectsService.get(
        {
          conditions : {
            status: ['pending','active','inactive','suspended']
          }
        }
      )
      .then(function (projects) {
        $scope.projects = projects;

        angular.forEach(projects, function (project) {
          if (project.id == $scope.projectId) {
            $scope.project = project;
          }
        });
    });
  };

  // method gets all boards
  $scope.getBoards = function (projectId) {
    return BoardsService.get(
        {
          conditions : {
            status: ['pending','active','inactive','suspended'],
            projectId: projectId
          }
        }
      )
      .then(function (boards) {
        $scope.boards = boards;
    });
  };

  // method saves board
  $scope.saveBoard = function (board) {
    return BoardsService.save(board);
  };

  // method soft-deletes board by id
  $scope.deleteBoard = function (boardId) {
    return BoardsService.update(boardId, {status:"deleted"});
  };

  $scope.getProjects();
  $scope.getBoards($scope.projectId);

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  // method called to open new board modal
  $scope.showCreateBoardModal = function (modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    // modal values
    $scope.form_board = {
      projectId : $scope.projectId,
      status : 'active'
    };
    $scope.modalTitle = 'Add board';
  };

  // method called to open edit board modal
  $scope.showEditBoardModal = function (board, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.form_board = _.extend({}, board);
    $scope.modalTitle = 'Edit board';
  };

  // method called to save modal's data
  $scope.saveModalBoardData = function (boardData) {

    if (_.isEmpty(boardData)) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> You need to fill the form before saving it'
      );
      return;
    }

    $scope.saveBoard(boardData)
      .then(function (board) {

        // new record
        if (!boardData.id) {
          $scope.boards.push(board);

        // updated record
        } else {

          angular.forEach($scope.boards, function (tempBoard, index) {
            if (board.id == tempBoard.id) {
              $scope.boards[index] = board;
            }
          });
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Board was saved sucessfully'
        );
      });
  }

  // method called to close modal
  $scope.closeModal = function (modalSelector) {
    $scope.hideModal(modalSelector);
  }

  // method called to open delete board modal
  $scope.showDeleteBoardModal = function (board, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.board = _.extend({}, board);
  };

  // method called when deletion is confirmed
  $scope.deleteModalBoard = function (board) {

    if (!board || !board.id) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> There was an issue with your request - please try again later.'
      );
    }

    $scope.deleteBoard(board.id)
      .then(function (updated) {

        var tempBoard, index;
        for (index = 0; index < $scope.boards.length; index++) {
          tempBoard = $scope.boards[index];
          if (board.id == tempBoard.id) {
            $scope.boards.splice(index, 1);
          }
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Board was deleted sucessfully'
        );
      });
  };
});
