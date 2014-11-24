
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var projectsListController = angular.module(
  'ProjectsListController',
  [
    'ProjectsService'
  ]
);

projectsListController.controller(
  'ProjectsListController',
  ["$scope", "$routeParams", "$modal", "ProjectsService",
  function($scope, $routeParams, $modal, ProjectsService)
{
  // default projects list
  $scope.projects = [];

  // method gets all projects
  $scope.getProjects = function() {
    ProjectsService.get()
      .then(function(projects) {
        $scope.projects = projects;
      })
  };

  $scope.getProjects();

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  $scope.showCreateProjectModal = function () {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/projects/create.html',
      controller: 'ProjectModalController',
      backdrop: 'static',
      resolve: {
        project : function () {
          return {
            "status" : "active"
          }
        }
      }
    });

    modalInstance.result.then(function (project) {

      // add project to local scope
      $scope.projects.push(project);

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Project was created sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showEditProjectModal = function (project) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/projects/edit.html',
      controller: 'ProjectModalController',
      backdrop: 'static',
      resolve: {
        project : function () {
          return project;
        }
      }
    });

    modalInstance.result.then(function (project) {

      // find and update project data in local scope
      var index;
      for (index = 0; index < $scope.projects.length; index++) {
        if ($scope.projects[index].id === project.id) {
          $scope.projects[index] = project;
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Project was updated sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showDeleteProjectModal = function (project) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/projects/delete.html',
      controller: 'ProjectModalController',
      backdrop: 'static',
      resolve: {
        project : function () {
          return project;
        }
      }
    });

    modalInstance.result.then(function (project) {

      // update status of deleted project
      var index;
      for (index = 0; index < $scope.projects.length; index++) {
        if ($scope.projects[index].id === project.id) {
          $scope.projects[index].status = "deleted";
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> Project was sucessfully deleted(disabled)'
      );
    }, function () {
      // console.log('modal closed');
    });
  };
}]);
