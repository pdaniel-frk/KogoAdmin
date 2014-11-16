
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
  function($scope, ProjectsService, $routeParams)
{
  // default projects list
  $scope.projects = [];

  // method gets all projects
  $scope.getProjects = function() {
    ProjectsService.get(
        {
          conditions : {
            status: ['pending','active','inactive','suspended']
          }
        }
      )
      .then(function(projects) {
        $scope.projects = projects;
      })
  };

  // method saves project
  $scope.saveProject = function(project) {
    return ProjectsService.save(project);
  };

  // method soft-deletes project by id
  $scope.deleteProject = function(projectId) {
    return ProjectsService.update(projectId, {status:"deleted"});
  };

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  // method called to open new project modal
  $scope.showCreateProjectModal = function(modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    // modal values
    $scope.project = {
      status : 'active'
    };
    $scope.modalTitle = 'Add project';
  };

  // method called to open edit project modal
  $scope.showEditProjectModal = function(project, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.project = _.extend({}, project);
    $scope.modalTitle = 'Edit project';
  };

  // method called to save modal's data
  $scope.saveModalData = function(projectData) {

    if (_.isEmpty(projectData)) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> You need to fill the form before saving it'
      );
      return;
    }

    $scope.saveProject(projectData)
      .then(function(project) {

        // new record
        if (!projectData.id) {
          $scope.projects.push(project);

        // updated record
        } else {

          angular.forEach($scope.projects, function(tempProject, index){
            if (project.id == tempProject.id) {
              $scope.projects[index] = project;
            }
          });
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Project was saved sucessfully'
        );
      });
  }

  // method called to close modal
  $scope.closeModal = function(modalSelector) {
    $scope.hideModal(modalSelector);
  }

  // method called to open delete project modal
  $scope.showDeleteProjectModal = function(project, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.project = _.extend({}, project);
  };

  // method called when deletion is confirmed
  $scope.deleteModalProject = function(project) {

    if (!project || !project.id) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> There was an issue with your request - please try again later.'
      );
    }

    $scope.deleteProject(project.id)
      .then(function(updated) {

        angular.forEach($scope.projects, function(tempProject, index){
          if (project.id == tempProject.id) {
            $scope.projects.splice(index, 1);
          }
        });

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> Project was deleted sucessfully'
        );
      });
  };

  // Always called method to get all projects
  $scope.getProjects();
});
